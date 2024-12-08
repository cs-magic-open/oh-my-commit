# YAAC (Yet Another Auto Commit)

🚀 一款基于 AI 的智能 Git 提交插件，让你的每一次提交都专业而优雅。YAAC（读作"雅刻"）致力于提供最流畅的 AI 辅助提交体验。

## 特性

- 🤖 智能分析代码变更，自动生成高质量的提交信息
- 🎨 优雅的用户界面，流畅的操作体验
- 🔧 高度可定制的提交模板和规则
- 🌍 支持多语言（中英文）
- ⚡ 快速响应，支持离线模式
- 🤝 团队协作友好

## 安装

1. 安装 VSCode 扩展 "YAAC"
2. 立即启用！

## 使用方法

1. 在 VSCode 中打开一个 Git 仓库
2. 当你完成代码修改后，点击源代码管理图标
3. 点击 "AI Commit" 按钮或使用快捷键 `cmd+shift+c`
4. 插件会自动分析你的更改并生成合适的提交信息
5. 你可以直接使用或编辑生成的信息
6. 确认后提交更改

## 用户配置

| 配置项                         | 类型    | 默认值      | 说明                                              | 可选值                                                                                                                                                |
| ------------------------------ | ------- | ----------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yaac.basic.enabled`           | boolean | true        | 是否启用 YAAC                                     | `true / false`                                                                                                                                        |
| `yaac.basic.uiLanguage`        | string  | "system"    | 界面显示语言                                      | • `system`: 跟随系统语言<br>• `zh_CN`: 中文<br>• `en_US`: English                                                                                     |
| `yaac.ac.model`                | string  | "yaac.test" | 选择自动提交（AC）服务的供应商与模型              | • `yaac.test`<br>• `yaac.balanced`<br>• `yaac.professional`<br>• `cgop.openai.chatgpt-3.5`<br>• `cgop.openai.chatgpt-4`                               |
| `yaac.git.emptyChangeBehavior` | string  | "skip"      | 当工作区没有文件变更时的行为                      | • `skip`: 跳过空更改，不执行任何操作<br>• `amend`: 修改最近一次提交（git commit --amend）                                                             |
| `yaac.git.autoStage`           | boolean | true        | 是否自动暂存所有更改                              | `true / false`                                                                                                                                        |
| `yaac.git.commitLanguage`      | string  | "system"    | Git 提交信息的语言                                | • `system`: 跟随系统语言<br>• `zh_CN`: 中文提交信息<br>• `en_US`: English commit messages                                                             |
| `yaac.ai.apiKeys`              | object  | -           | AI 服务提供商的 API 密钥配置                      |                                                                                                                                                       |
| `yaac.ui.mode`                 | string  | "webview"   | 提交界面模式选择                                  | • `quickInput`: Quick & Simple: Single-line input box for fast commits<br>• `webview`: Professional: Full-featured editor with preview and formatting |
| `yaac.telemetry.enabled`       | boolean | true        | 是否启用使用数据收集（匿名）                      | `true / false`                                                                                                                                        |
| `yaac.telemetry.shareLevel`    | string  | "basic"     | 数据收集级别                                      | • `minimal`: 仅收集基本错误信息<br>• `basic`: 包含功能使用统计和性能数据<br>• `full`: 额外包含 AI 生成结果的质量反馈                                  |
| `yaac.feedback.enabled`        | boolean | true        | 是否启用用户反馈功能（支持一键创建 GitHub Issue） | `true / false`                                                                                                                                        |

## 贡献指南

欢迎贡献代码！请查看我们的 [贡献指南](CONTRIBUTING.md) 了解详情。

## 支持

如果你遇到任何问题或有建议，请：

1. 查看 [常见问题](FAQ.md)
2. 提交 [Issue](https://github.com/cs-magic/yaac/issues)
3. 加入我们的 [Discord 社区](https://discord.gg/yaac)

## 许可证

MIT
