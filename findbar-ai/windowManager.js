// https://github.com/CosmoCreeper/Sine/blob/main/engine/injectAPI.js
// ===========================================================
// Module to read HTML content (and maybe modify if I implement it)
// ===========================================================
import { debugError, debugLog } from "./prefs.js";

const getUrlAndTitle = () => {
  return {
    url: gBrowser.currentURI.spec,
    title: gBrowser.selectedBrowser.contentTitle,
  };
};

const _actors = new Set();
let _lazy = {};
ChromeUtils.defineESModuleGetters(_lazy, {
  ActorManagerParent: "resource://gre/modules/ActorManagerParent.sys.mjs",
});

const windowManagerName = "FindbarAIWindowManager";

const windowManager = () => {
  if (_actors.has(windowManagerName)) {
    return;
  }

  const decl = {};
  decl[windowManagerName] = {
    parent: {
      esModuleURI:
        "chrome://userscripts/content/custom/findbar-ai/actors/FindbarAIWindowManagerParent.sys.mjs",
    },
    child: {
      esModuleURI:
        "chrome://userscripts/content/custom/findbar-ai/actors/FindbarAIWindowManagerChild.sys.mjs",
      events: {
        DOMContentLoaded: {},
      },
    },
    matches: ["https://*", "http://*"],
  };

  try {
    _lazy.ActorManagerParent.addJSWindowActors(decl);
    _actors.add(windowManagerName);
    debugLog("FindbarAI WindowManager registered successfully");
  } catch (e) {
    debugError(`Failed to register JSWindowActor: ${e}`);
  }
};

export const windowManagerAPI = {
  getWindowManager() {
    try {
      if (!gBrowser || !gBrowser.selectedBrowser) return undefined;
      const context = gBrowser.selectedBrowser.browsingContext;
      if (!context || !context.currentWindowContext) return undefined;
      return context.currentWindowContext.getActor(windowManagerName);
    } catch {
      return undefined;
    }
  },

  async getHTMLContent() {
    const wm = this.getWindowManager();
    if (!wm) return {};
    try {
      return await wm.getPageHTMLContent();
    } catch (error) {
      debugError("Failed to get page HTML content:", error);
      return {};
    }
  },

  async getSelectedText() {
    const wm = this.getWindowManager();
    if (!wm) return getUrlAndTitle();
    try {
      return await wm.getSelectedText();
    } catch (error) {
      debugError("Failed to get selected text:", error);
      return getUrlAndTitle();
    }
  },

  async getPageTextContent(trimWhiteSpace) {
    const wm = this.getWindowManager();
    if (!wm) return getUrlAndTitle();
    try {
      return await wm.getPageTextContent(trimWhiteSpace);
    } catch (error) {
      debugError("Failed to get page text content:", error);
      return getUrlAndTitle();
    }
  },

  async clickElement(selector) {
    const wm = this.getWindowManager();
    if (!wm) return { error: "No window manager found." };
    try {
      return await wm.clickElement(selector);
    } catch (error) {
      debugError(`Failed to click element with selector "${selector}":`, error);
      return { error: `Failed to click element with selector "${selector}".` };
    }
  },

  async fillForm(selector, value) {
    const wm = this.getWindowManager();
    if (!wm) return { error: "No window manager found." };
    try {
      return await wm.fillForm(selector, value);
    } catch (error) {
      debugError(`Failed to fill form with selector "${selector}":`, error);
      return { error: `Failed to fill form with selector "${selector}".` };
    }
  },

  async getYoutubeTranscript() {
    const wm = this.getWindowManager();
    if (!wm) return { error: "No window manager found." };
    try {
      return await wm.getYoutubeTranscript();
    } catch (error) {
      debugError("Failed to get youtube transcript:", error);
      return { error: "Failed to get youtube transcript." };
    }
  },
};

export default windowManager;
