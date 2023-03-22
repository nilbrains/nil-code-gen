export const elementPlusDefault = {
    placeholder: {
      key: "placeholder",
      name: "占位文本",
      default: "请输入文本",
      render: "string"
    },
  };
  export const elementPlusString = {
    type: {
      key: "type",
      name: "显示类型",
      default: "text",
      render: "string"
    },
    placeholder: {
      key: "placeholder",
      name: "占位文本",
      default: "请输入文本",
      render: "string"
    },
    "show-word-limit": {
      key: "show-word-limit",
      name: "统计字数",
      default: false,
      render: "switch"
    }
  }
  
  export const elementPlusSelect = {
    placeholder: {
      key: "placeholder",
      name: "占位文本",
      default: "请输入文本",
      render: "string"
    },
    options: {
      key: "options",
      name: "选项",
      default: [],
      render: "dynamic-input"
    }
  }
  
  export const elementPlusDate = {
    placeholder: {
      key: "placeholder",
      name: "占位文本",
      default: "请选择日期",
      render: "string"
    },
    type: {
      key: "type",
      name: "类型",
      default: "date",
      render: "string"
    },
    format: {
      key: "format",
      name: "显示格式",
      default: "YYYY-MM-DD",
      render: "string"
    },
    "value-format": {
      key: "value-format",
      name: "绑定格式",
      default: "",
      render: "string"
    }
  }
  
  
  export const elementPlusDateTime = {
    placeholder: {
      key: "placeholder",
      name: "占位文本",
      default: "请选择时间",
      render: "string"
    },
    type: {
      key: "type",
      name: "类型",
      default: "date",
      render: "string"
    },
    format: {
      key: "format",
      name: "显示格式",
      default: "YYYY-MM-DD HH:mm:ss",
      render: "string"
    },
    "value-format": {
      key: "value-format",
      name: "绑定格式",
      default: "",
      render: "string"
    }
  }