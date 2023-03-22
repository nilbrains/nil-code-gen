import { reactive } from "vue";
import { genFormData } from "@/config/index";

export function useSettingDialog() {
  const dialog = reactive({
    showed: false,
    index: -1,
    form: [],
    formData: {}
  });

  function open(uiType, row, index ,showed = true) {
    dialog.showed = showed;
    dialog.index = index;
    console.log(uiType + JSON.stringify(row) + " ---- " + index);
    // 获取表单内容
    console.log("\"config\" in row && !row['edited'] === >" + "config" in row && !row['edited']);
    if ("config" in row && !row['edited']) {
      [dialog.form, {}] = genFormData(uiType, row);
      dialog.formData = row.config || {};
    } else {
      [dialog.form, dialog.formData] = genFormData(uiType, row);
    }
    listener["openEnd"] && listener["openEnd"]();
  }

  function close() {
    dialog.showed = false;
    listener["closeEnd"] && listener["closeEnd"]();
  }

  function save() {
    close();
    listener["saveEnd"] && listener["saveEnd"](dialog.formData, dialog.index);
  }

  const listener = reactive({
    openEnd: () => {
    },
    closeEnd: () => {
    },
    saveEnd: () => {
    }
  });

  return { dialog, open, close, save, listener };
}
