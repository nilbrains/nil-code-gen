import * as uiElementConfig from "@/config/element-plus/index.js";
import * as uiNaiveConfig from "@/config/naive/index.js";

export * from "@/config/element-plus/index.js";

export function genFormData(uiType, row) {
  console.log("uiType == > " + uiType);
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
    } else {
      _config = uiElementConfig.elementPlusDefault;
    }
  } else if (uiType === "naive") {
    if (rowType === "string") {
      _config = uiNaiveConfig.naiveString;
    } else if (rowType === "select") {
      _config = uiNaiveConfig.naiveSelect;
    } else if (rowType === "date") {
      _config = uiNaiveConfig.naiveDate;
    } else if (rowType === "datetime") {
      _config = uiNaiveConfig.naiveDateTime;
    } else {
      _config = uiNaiveConfig.naiveDefault;
    }
  }
  if (_config) {
    Object.keys(_config).forEach((it) => {
      _form_data[it] = _config[it]?.default || "";
      _form.push(_config[it]);
    });
  }
  return [_form, _form_data];
}

export function getConfigData(config) {
  const _form_data = {};
  Object.keys(config).forEach((it) => {
    _form_data[it] = config[it]?.default ?? "";
  });
  return _form_data;
}
