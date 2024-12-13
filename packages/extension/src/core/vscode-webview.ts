import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as Handlebars from "handlebars";

export class WebviewManager {
  private webviewPanel?: vscode.WebviewPanel;
  private readonly scriptUri: vscode.Uri;
  private readonly template: HandlebarsTemplateDelegate;

  /**
   * 需要先初始化一个 template webview 页面，然后再动态加载新的内容（前端打包后的结果）
   */
  private readonly templatePath: string;

  /**
   * 前端打包后的脚本文件路径
   */
  private readonly scriptPath: string;

  // /defaultSettings.json:2058
  private originalTabSetting?: "multiple" | "single" | "none" = undefined;
  // /defaultSettings.json:1954
  private originalEditorActionsLocation?: "default" | "titleBar" | "hidden" =
    undefined;

  constructor(
    context: vscode.ExtensionContext,
    private readonly viewType: string,
    private readonly title: string,
    private readonly outputChannel: vscode.OutputChannel,
    templatePath: string = "./assets/webview.template.html",
    scriptPath: string = "./dist/webview-ui/main.js"
  ) {
    this.outputChannel.appendLine("[WebviewManager] Initializing...");

    // load template
    this.templatePath = templatePath;
    this.templatePath = path.join(context.extensionPath, this.templatePath);
    const templateContent = fs.readFileSync(this.templatePath, "utf8");
    this.template = Handlebars.compile(templateContent);

    // load script
    this.scriptPath = scriptPath;
    this.scriptUri = vscode.Uri.joinPath(context.extensionUri, this.scriptPath);

    // watch for file changes
    const mainJsPath = path.join(
      context.extensionPath,
      "dist",
      "webview-ui",
      "main.js"
    );
    this.outputChannel.appendLine(`Watching file: ${mainJsPath}`);

    const watcher = vscode.workspace.createFileSystemWatcher(
      new vscode.RelativePattern(
        vscode.Uri.file(path.dirname(mainJsPath)),
        path.basename(mainJsPath)
      )
    );
    type WatcherEvent = "onDidChange" | "onDidCreate" | "onDidDelete";
    const events: WatcherEvent[] = [
      "onDidChange",
      "onDidCreate",
      "onDidDelete",
    ];
    events.forEach((event) => {
      const watcherEvent = watcher[event] as vscode.Event<vscode.Uri>;
      watcherEvent((uri) => {
        this.outputChannel.appendLine(`File ${event}: ${uri.fsPath}`);
        if (this.webviewPanel?.webview) {
          this.updateWebview();
        } else {
          this.outputChannel.appendLine("Webview panel not available");
        }
      });
    });

    // register webview
    context.subscriptions.push(watcher, this);
  }

  public async show(
    options: vscode.WebviewPanelOptions & vscode.WebviewOptions
  ) {
    if (this.webviewPanel) {
      this.webviewPanel.reveal();
      return this.webviewPanel;
    }

    // Only move to new window in window mode
    if (this.uiMode === "window") {
      await vscode.commands.executeCommand(
        "workbench.action.newEmptyEditorWindow"
      );
      await this.saveWindowState();
    }

    this.webviewPanel = vscode.window.createWebviewPanel(
      this.viewType,
      this.title,
      {
        viewColumn: vscode.ViewColumn.Active,
        preserveFocus: true,
      },
      {
        ...options,
        enableScripts: true,
        enableFindWidget: false,
        retainContextWhenHidden: this.uiMode !== "window",
      }
    );

    await this.handleWindowModeStateChange(this.webviewPanel);
    await this.updateWebview();
    return this.webviewPanel;
  }

  public async createWebviewPanel(): Promise<vscode.WebviewPanel> {
    const panel = await this.show({});

    // Add message handling
    panel.webview.onDidReceiveMessage(
      async (message: any) => {
        switch (message.command) {
          case "openExternal":
            if (message.url) {
              await vscode.env.openExternal(vscode.Uri.parse(message.url));
            }
            break;
        }
      },
      undefined,
      []
    );

    return panel;
  }

  private async saveWindowState() {
    if (this.uiMode === "window") {
      // Store original setting and hide tab bar in the new window
      this.originalTabSetting = vscode.workspace
        .getConfiguration()
        .get("workbench.editor.showTabs");

      await vscode.workspace
        .getConfiguration()
        .update(
          "workbench.editor.showTabs",
          "none",
          vscode.ConfigurationTarget.Workspace
        );

      this.originalEditorActionsLocation = vscode.workspace
        .getConfiguration()
        .get("workbench.editor.editorActionsLocation");
      this.outputChannel.appendLine(
        `[EditorActions Save] this.originalEditorActionsLocation: ${this.originalEditorActionsLocation}`
      );
      await vscode.workspace
        .getConfiguration()
        .update(
          "workbench.editor.editorActionsLocation",
          "hidden",
          vscode.ConfigurationTarget.Workspace
        );

      this.outputChannel.appendLine(
        "[saveWindowState] Window state saved and tabs hidden"
      );
    }
  }

  private async restoreWindowState() {
    if (
      this.uiMode === "window" &&
      this.originalTabSetting !== undefined &&
      this.originalEditorActionsLocation !== undefined
    ) {
      await vscode.workspace
        .getConfiguration()
        .update(
          "workbench.editor.showTabs",
          this.originalTabSetting,
          vscode.ConfigurationTarget.Workspace
        );
      this.originalTabSetting = undefined;

      this.outputChannel.appendLine(
        `[EditorActions Restore] this.originalEditorActionsLocation: ${this.originalEditorActionsLocation}`
      );
      await vscode.workspace.getConfiguration().update(
        "workbench.editor.editorActionsLocation", // 修正配置键名，之前错写成了 workbench.action.editorActionsLocation
        this.originalEditorActionsLocation,
        vscode.ConfigurationTarget.Workspace
      );
      this.originalEditorActionsLocation = undefined;

      this.outputChannel.appendLine(
        "[restoreWindowState] Window state restored"
      );
    }
  }

  private async cleanupPanel() {
    if (this.webviewPanel) {
      this.outputChannel.appendLine("[cleanupPanel] Disposing webview panel");

      await this.restoreWindowState();

      // Dispose the panel
      this.webviewPanel.dispose();
      this.webviewPanel = undefined;

      this.outputChannel.appendLine(
        "[cleanupPanel] Panel disposed and reference cleared"
      );
    }
  }

  private async handleWindowModeStateChange(panel: vscode.WebviewPanel) {
    if (this.uiMode === "window") {
      this.outputChannel.appendLine(
        "[handleWindowModeStateChange] Setting up window mode handlers"
      );

      // Handle close button via message
      panel.webview.onDidReceiveMessage(
        (message: any) => {
          this.outputChannel.appendLine(
            `[onDidReceiveMessage] Received message: ${JSON.stringify(message)}`
          );
          if (message.type === "window-close") {
            this.outputChannel.appendLine(
              "[onDidReceiveMessage] Handling window close"
            );
            this.cleanupPanel();
          }
        },
        undefined,
        []
      );

      // Handle window close
      panel.onDidDispose(() => {
        this.outputChannel.appendLine(
          "[onDidDispose] Panel disposed event triggered"
        );
        this.webviewPanel = undefined;
      });

      // Handle keyboard shortcuts and window state changes
      let lastVisible = true;
      let lastActive = false;
      let isMovingToNewWindow = true; // Flag to track window mode transition

      panel.onDidChangeViewState((e) => {
        const currentVisible = e.webviewPanel.visible;
        const active = e.webviewPanel.active;
        this.outputChannel.appendLine(
          `[onDidChangeViewState] State changed - visible: ${currentVisible}, active: ${active}, lastVisible: ${lastVisible}, lastActive: ${lastActive}, isMovingToNewWindow: ${isMovingToNewWindow}`
        );

        // Ignore the first active:false event when moving to new window
        if (isMovingToNewWindow && !active) {
          this.outputChannel.appendLine(
            "[onDidChangeViewState] Ignoring focus loss during window transition"
          );
          isMovingToNewWindow = false;
          lastActive = true; // Force lastActive to true since we're ignoring this transition
          lastVisible = currentVisible;
          return;
        }

        // Close when:
        // 1. Visibility changes from true to false, or
        // 2. Focus changes from active to inactive (after window transition), or
        // 3. Panel becomes hidden (handles cmd+w)
        if (
          (lastVisible && !currentVisible) ||
          (!active && lastActive && !isMovingToNewWindow) ||
          !e.webviewPanel.visible
        ) {
          this.outputChannel.appendLine(
            `[onDidChangeViewState] Panel lost ${
              !currentVisible ? "visibility" : !active ? "focus" : "shown state"
            }, cleaning up panel`
          );
          this.cleanupPanel();
          return;
        }

        lastVisible = currentVisible;
        lastActive = active;
      });

      // Register keyboard shortcut handler
      const disposable = vscode.commands.registerCommand(
        "workbench.action.closeActiveEditor",
        () => {
          if (this.webviewPanel && this.webviewPanel.active) {
            this.outputChannel.appendLine("[closeActiveEditor] Handling cmd+w");
            this.cleanupPanel();
          }
        }
      );

      // Clean up the command registration when panel is disposed
      panel.onDidDispose(() => disposable.dispose());
    }
  }

  private async updateWebview() {
    if (!this.webviewPanel?.webview) return;

    const templateData = {
      scriptUri: this.webviewPanel.webview
        .asWebviewUri(this.scriptUri)
        .toString(),
      cspSource: this.webviewPanel.webview.cspSource,
      windowMode: this.uiMode === "window",
    };

    const html = this.template(templateData);
    this.webviewPanel.webview.html = html;
  }

  public get uiMode(): string {
    return (
      vscode.workspace.getConfiguration("yaac").get<string>("ui.mode") ??
      "panel"
    );
  }

  public async dispose() {
    await this.cleanupPanel();
  }
}
