import { reactive } from "vue";

export function useCodeDialog() {
  const dialog = reactive({
    title: "",
    showed: false,
    code: "",
    language: "",
    readOnly: false,
    buttons: ["close"]
  });

  function open({ title, code, language, readOnly = false, buttons = ["close"] }) {
    dialog.showed = true;
    dialog.code = code;
    dialog.title = title;
    dialog.language = language || "";
    dialog.readOnly = readOnly;
    dialog.buttons = buttons;

    listener["openEnd"] && listener["openEnd"]();
  }

  function close() {
    dialog.showed = false;
    listener["closeEnd"] && listener["closeEnd"]();
  }

  function save() {
    close();
    listener["saveEnd"] && listener["saveEnd"](dialog.code);
  }

  const listener = reactive({
    openEnd: () => { },
    closeEnd: () => { },
    saveEnd: () => { },
  });

  return { dialog, open, close, save, listener };
}
