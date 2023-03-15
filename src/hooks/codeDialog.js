import { reactive } from "vue";

export function useCodeDialog() {
  const dialog = reactive({
    title: "",
    showed: false,
    code: "",
    language: "",
    readOnly: false,
  });

  function open({ title, code, language, readOnly = false }) {
    dialog.showed = true;
    dialog.code = code;
    dialog.title = title;
    dialog.language = language || "";
    dialog.readOnly = readOnly;

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
    openEnd: () => {},
    closeEnd: () => {},
    saveEnd: () => {},
  });

  return { dialog, open, close, save, listener };
}
