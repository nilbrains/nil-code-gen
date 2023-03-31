export const naiveDefault = {
  placeholder: {
    key: "placeholder",
    name: "占位文本",
    default: "请输入文本",
    render: "string",
  },
};
export const naiveString = {
  type: {
    key: "type",
    name: "显示类型",
    default: "text",
    render: "string",
  },
  placeholder: {
    key: "placeholder",
    name: "占位文本",
    default: "请输入文本",
    render: "string",
  },
  "show-count": {
    key: "show-count",
    name: "统计字数",
    default: false,
    render: "switch",
  },
};

export const naiveSelect = {
  placeholder: {
    key: "placeholder",
    name: "占位文本",
    default: "请输入文本",
    render: "string",
  },
  options: {
    key: "options",
    name: "选项",
    default: [],
    render: "dynamic-input",
  },
};

export const naiveDate = {
  placeholder: {
    key: "placeholder",
    name: "占位文本",
    default: "请选择日期",
    render: "string",
  },
  type: {
    key: "type",
    name: "类型",
    default: "date",
    render: "string",
  },
  "value-format": {
    key: "value-format",
    name: "绑定格式",
    default: "",
    render: "string",
  },
};

export const naiveDateTime = {
  placeholder: {
    key: "placeholder",
    name: "占位文本",
    default: "请选择时间",
    render: "string",
  },
  type: {
    key: "type",
    name: "类型",
    default: "datetime",
    render: "string",
  },
  "value-format": {
    key: "value-format",
    name: "绑定格式",
    default: "",
    render: "string",
  },
};
