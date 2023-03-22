import * as uiElementConfig from "@/config/element-plus/index.js";

export * from "@/config/element-plus/index.js";

export function genFormData(uiType, row) {
  const rowType = row?.type || "string";
  const _form_data = {};
  const _form = [];
  let _config = {};
  if (uiType === "element-plus") {
    if (rowType === "string") {
      _config = uiElementConfig.elementPlusString;
    } else if (rowType === "select") {
      _config = uiElementConfig.elementPlusSelect;
    } else if (rowType === "date") {
      _config = uiElementConfig.elementPlusDate;
    } else if (rowType === "datetime") {
      _config = uiElementConfig.elementPlusDateTime;
    }else {
      _config = uiElementConfig.elementPlusDefault;
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

export function getConfigData(config) {
  const _form_data = {}
  Object.keys(config).forEach(it => {
    _form_data[it] = config[it]?.default ?? "";
  });
  return _form_data;
}
