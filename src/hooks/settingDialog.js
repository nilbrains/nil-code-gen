import { reactive } from "vue";
import * as uiConfig from "@/config/index";
import { elementPlusDefault } from "@/config/index";


function genFormData(uiType, row) {
  const rowType = row?.type || "string";
  const _form_data = {};
  const _form = [];
  let _config = {};
  if (uiType === "element-plus") {
    if (rowType === "string") {
      _config = uiConfig.elementPlusString;
    } else if (rowType === "select") {
      _config = uiConfig.elementPlusSelect;
    } else if (rowType === "date") {
      _config = uiConfig.elementPlusDate;
    } else {
      _config = uiConfig.elementPlusDefault;
    }
  }
  if (_config) {
    Object.keys(_config).forEach(it => {
      _form_data[it] = _config[it]?.default || "";
      _form.push(_config[it]);
    });
  }
  return [_form, _form_data];
}


export function useSettingDialog() {
  const dialog = reactive({
    showed: false,
    index: -1,
    form: [],
    formData: {}
  });

  function open(uiType, row, index) {
    dialog.showed = true;
    dialog.index = index;
    // console.log(uiType + JSON.stringify(row));
    // 获取表单内容
    if ("config" in row) {
      //   是否存在 config
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
