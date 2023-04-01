import { reactive } from "vue";

export function useCodeDialog() {
  const dialog = reactive({
    title: "",
    showed: false,
    code: "",
    language: "",
    readOnly: false,
    buttons: ["close"],
    temps: [],
    data: [],
  });

  function open({
    title,
    code,
    language,
    readOnly = false,
    buttons = ["close"],
    temps = [],
    data = [],
  }) {
    dialog.showed = true;
    dialog.code = code;
    dialog.title = title;
    dialog.language = language || "";
    dialog.readOnly = readOnly;
    dialog.buttons = buttons;
    dialog.temps = temps;
    dialog.data = data;

    listener["openEnd"] && listener["openEnd"]();
  }

  function close() {
    dialog.title = "";
    dialog.showed = false;
    dialog.language = "";
    dialog.readOnly = false;
    dialog.buttons = ["close"];
    dialog.temps = [];
    dialog.data = [];
    listener["closeEnd"] && listener["closeEnd"]();
  }

  function save() {
    close();
    listener["saveEnd"] && listener["saveEnd"](dialog.code);
    dialog.code = "";
  }

  const listener = reactive({
    openEnd: () => {},
    closeEnd: () => {},
    saveEnd: () => {},
  });

  return { dialog, open, close, save, listener };
}
