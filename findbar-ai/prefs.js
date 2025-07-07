export const PREFS = {
  ENABLED: "extension.findbar-ai.enabled",
  MINIMAL: "extension.findbar-ai.minimal",
  PERSIST: "extension.findbar-ai.persist-chat",

  GOD_MODE: "extension.findbar-ai.god-mode",
  CITATIONS_ENABLED: "extension.findbar-ai.citations-enabled",

  CONTEXT_MENU_ENABLED: "extension.findbar-ai.context-menu-enabled",
  CONTEXT_MENU_AUTOSEND: "extension.findbar-ai.context-menu-autosend",

  DEBUG_MODE: "extension.findbar-ai.debug-mode",

  LLM_PROVIDER: "extension.findbar-ai.llm-provider",
  MISTRAL_API_KEY: "extension.findbar-ai.mistral-api-key",
  MISTRAL_MODEL: "extension.findbar-ai.mistral-model",
  GEMINI_API_KEY: "extension.findbar-ai.gemini-api-key",
  GEMINI_MODEL: "extension.findbar-ai.gemini-model",

  //TODO: Not yet implimented
  COPY_BTN_ENABLED: "extension.findbar-ai.copy-btn-enabled",
  MARKDOWN_ENABLED: "extension.findbar-ai.markdown-enabled",

  CONFORMATION: "extension.findbar-ai.confirmation-before-tool-call",
  SHOW_TOOL_CALL: "extension.findbar-ai.show-tool-call",
  DND_ENABLED: "extension.findbar-ai.dnd-enabled",
  POSITION: "extension.findbar-ai.position",

  defaultValues: {},

  getPref(key) {
    try {
      const pref = UC_API.Prefs.get(key);
      if (!pref) return PREFS.defaultValues[key];
      if (!pref.exists()) return PREFS.defaultValues[key];
      return pref.value;
    } catch {
      return PREFS.defaultValues[key];
    }
  },

  setInitialPrefs() {
    for (const [key, value] of Object.entries(PREFS.defaultValues)) {
      UC_API.Prefs.setIfUnset(key, value);
    }
  },

  get enabled() {
    return this.getPref(this.ENABLED);
  },
  set enabled(value) {
    UC_API.Prefs.set(this.ENABLED, value);
  },

  get minimal() {
    return this.getPref(this.MINIMAL);
  },
  set minimal(value) {
    UC_API.Prefs.set(this.MINIMAL, value);
  },

  set godMode(value) {
    UC_API.Prefs.set(this.GOD_MODE, value);
  },
  get godMode() {
    return this.getPref(this.GOD_MODE);
  },

  get citationsEnabled() {
    return this.getPref(this.CITATIONS_ENABLED);
  },
  set citationsEnabled(value) {
    UC_API.Prefs.set(this.CITATIONS_ENABLED, value);
  },

  get contextMenuEnabled() {
    return this.getPref(this.CONTEXT_MENU_ENABLED);
  },
  set contextMenuEnabled(value) {
    UC_API.Prefs.set(this.CONTEXT_MENU_ENABLED, value);
  },

  get contextMenuAutoSend() {
    return this.getPref(this.CONTEXT_MENU_AUTOSEND);
  },
  set contextMenuAutoSend(value) {
    UC_API.Prefs.set(this.CONTEXT_MENU_AUTOSEND, value);
  },

  get llmProvider() {
    return this.getPref(this.LLM_PROVIDER);
  },
  set llmProvider(value) {
    UC_API.Prefs.set(this.LLM_PROVIDER, value);
  },

  get mistralApiKey() {
    return this.getPref(this.MISTRAL_API_KEY);
  },
  set mistralApiKey(value) {
    UC_API.Prefs.set(this.MISTRAL_API_KEY, value);
  },

  get mistralModel() {
    return this.getPref(this.MISTRAL_MODEL);
  },
  set mistralModel(value) {
    UC_API.Prefs.set(this.MISTRAL_MODEL, value);
  },

  get geminiApiKey() {
    return this.getPref(this.GEMINI_API_KEY);
  },
  set geminiApiKey(value) {
    UC_API.Prefs.set(this.GEMINI_API_KEY, value);
  },

  get geminiModel() {
    return this.getPref(this.GEMINI_MODEL);
  },
  set geminiModel(value) {
    UC_API.Prefs.set(this.GEMINI_MODEL, value);
  },

  get persistChat() {
    return this.getPref(this.PERSIST);
  },
  set persistChat(value) {
    UC_API.Prefs.set(this.PERSIST, value);
  },

  get copyBtnEnabled() {
    return this.getPref(this.COPY_BTN_ENABLED);
  },
  set copyBtnEnabled(value) {
    UC_API.Prefs.set(this.COPY_BTN_ENABLED, value);
  },
  // Helper method to map PREFS constants to their setter property names
  getPrefSetterName(prefKey) {
    const keyMap = {
      [PREFS.ENABLED]: "enabled",
      [PREFS.MINIMAL]: "minimal",
      [PREFS.PERSIST]: "persistChat",
      [PREFS.GOD_MODE]: "godMode",
      [PREFS.CITATIONS_ENABLED]: "citationsEnabled",
      [PREFS.CONTEXT_MENU_ENABLED]: "contextMenuEnabled",
      [PREFS.CONTEXT_MENU_AUTOSEND]: "contextMenuAutoSend",
      [PREFS.DEBUG_MODE]: "debugMode",
      [PREFS.LLM_PROVIDER]: "llmProvider",
      [PREFS.MISTRAL_API_KEY]: "mistralApiKey",
      [PREFS.MISTRAL_MODEL]: "mistralModel",
      [PREFS.GEMINI_API_KEY]: "geminiApiKey",
      [PREFS.GEMINI_MODEL]: "geminiModel",
      [PREFS.COPY_BTN_ENABLED]: "copyBtnEnabled",
      [PREFS.MARKDOWN_ENABLED]: "markdownEnabled",
      [PREFS.CONFORMATION]: "conformation",
      [PREFS.SHOW_TOOL_CALL]: "showToolCall",
      [PREFS.DND_ENABLED]: "dndEnabled",
      [PREFS.POSITION]: "position",
    };
    return keyMap[prefKey];
  },
};

export const debugLog = (...args) => {
  if (PREFS.getPref(PREFS.DEBUG_MODE, false)) {
    console.log("FindbarAI :", ...args);
  }
};

export const debugError = (...args) => {
  if (PREFS.getPref(PREFS.DEBUG_MODE, false)) {
    console.error("FindbarAI :", ...args);
  }
};

PREFS.defaultValues = {
  [PREFS.ENABLED]: true,
  [PREFS.MINIMAL]: true,
  [PREFS.GOD_MODE]: false,
  [PREFS.DEBUG_MODE]: false,
  [PREFS.PERSIST]: false,
  [PREFS.CITATIONS_ENABLED]: false,
  [PREFS.CONTEXT_MENU_ENABLED]: true,
  [PREFS.CONTEXT_MENU_AUTOSEND]: true,
  [PREFS.LLM_PROVIDER]: "gemini",
  [PREFS.MISTRAL_API_KEY]: "",
  [PREFS.MISTRAL_MODEL]: "mistral-medium-latest",
  [PREFS.GEMINI_API_KEY]: "",
  [PREFS.GEMINI_MODEL]: "gemini-2.0-flash",
  [PREFS.COPY_BTN_ENABLED]: true,
  [PREFS.MARKDOWN_ENABLED]: true,
  [PREFS.CONFORMATION]: true,
  [PREFS.SHOW_TOOL_CALL]: false,
  [PREFS.DND_ENABLED]: true,
  [PREFS.POSITION]: "top-right",
};

export default PREFS;
