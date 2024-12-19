"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMarkdown = void 0;
// Fetch markdown content at runtime instead of importing
const MARKDOWN_URLS = {
    "commit-specification": "https://raw.githubusercontent.com/cs-magic-open/oh-my-commit/main/packages/website/docs/yet-another-best-practice/commit-specification.md",
};
const loadMarkdown = async (name) => {
    const url = MARKDOWN_URLS[name];
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch markdown: ${response.statusText}`);
        }
        const text = await response.text();
        // Remove HTML comments from the markdown content
        return text.replace(/<!--[\s\S]*?-->/g, "");
    }
    catch (error) {
        console.error("Error loading markdown:", error);
        return "Failed to load markdown content. Please try again later.";
    }
};
exports.loadMarkdown = loadMarkdown;
