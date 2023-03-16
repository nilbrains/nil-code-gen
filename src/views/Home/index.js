import { NButton, NInput, NSelect, NSpace } from "naive-ui";
import { h, ref } from "vue";

import { formatSql } from "../../utils/index";
import ejs from "ejs"
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';

import * as template from "@/template";


const typeOptions = [
  {
    label: '字符串',
    value: 'string'
  },
  {
    label: '选择框',
    value: 'select'
  },
  {
    label: '日期',
    value: 'date'
  },
  {
    label: '日期时间',
    value: 'datetime'
  },
]

const createColumns = ({ moveTop, moveBottom, remove }) => {
  return [
    {
      title: "字段名",
      key: "field",
      width: "20%",
      render(row) {
        return h(NInput, {
          value: row?.field,
          onUpdateValue: (e) => (row.field = e),
        });
      },
    },
    {
      title: "标题",
      key: "label",
      width: "20%",
      render(row) {
        return h(NInput, {
          value: row?.label,
          onUpdateValue: (e) => (row.label = e),
        });
      },
    },
    {
      title: "类型",
      key: "type",
      width: "20%",
      render(row) {
        return h(NSelect, {
          options: typeOptions,
          value: row?.type,
          onUpdateValue: (e) => (row.type = e),
        });
      },
    },
    {
      title: "操作",
      key: "actions",
      render(row, index) {
        return h(
          NSpace,
          {},
          {
            default: () => [
              h(
                NButton,
                {
                  onClick: () => {
                    moveTop(index)
                  }
                },
                { default: () => '上移' }
              ),
              h(
                NButton,
                {
                  onClick: () => {
                    moveBottom(index)
                  }
                },
                { default: () => '下移' }
              ),
              h(
                NButton,
                {
                  onClick: () => {
                    remove(index)
                  }
                },
                { default: () => '移除' }
              )
            ]
          }
        )
      }
    },
  ];
};

export function useHomeTable() {
  const data = ref([]);

  function moveTop(index) {
    if (index != 0) {
      data.value[index] = data.value.splice(index - 1, 1, data.value[index])[0];
    } else {
      data.value.push(data.value.shift());
    }
  }

  function moveBottom(index) {
    if (index != data.value.length - 1) {
      data.value[index] = data.value.splice(index + 1, 1, data.value[index])[0];
    } else {
      data.value.unshift(data.value.splice(index, 1)[0]);
    }
  }

  function remove(index) {
    data.value.splice(index, 1)
  }

  const columns = createColumns({
    moveTop, moveBottom, remove
  });


  function addEmptyRow() {
    data.value?.push({
      field: "",
      label: "",
      type: "string",
    });
  }

  return {
    columns,
    data,
    addEmptyRow,
  };
}

export function useHomeUploadSql() {
  function getFormatSql(sql) {
    return formatSql(sql);
  }



  return {
    getFormatSql,
  };
}



const uiOptions = [
  {
    label: 'Element Plus',
    value: 'element-plus'
  },
]

const tempOptions = [
  {
    label: '表格',
    value: 'table-me'
  },
  {
    label: '表单',
    value: 'form-me'
  },
]

export function useHomeGenCode() {
  const genSettingVal = reactive({
    uiType: "element-plus",
    tempType: "table-me"
  })

  function genCodeForTemp(data) {
    // console.log(data);
    if (genSettingVal.uiType === "element-plus" && genSettingVal.tempType === "table-me") {
      let code = ejs.render(template.elementPlusTableMe, { data })
      // console.log(code);
      code = prettier.format(code, {
        parser: "html",
        plugins: [parserHtml]
      })
      return code;
    } else if (genSettingVal.uiType === "element-plus" && genSettingVal.tempType === "form-me") {
      let code = ejs.render(template.elementPlusFormMe, { data })
      // console.log(code);
      code = prettier.format(code, {
        parser: "html",
        plugins: [parserHtml]
      })
      return code;
    } else {
      throw new Error("未找到模板")
    }
  }

  return {
    uiOptions,
    tempOptions,
    genSettingVal,
    genCodeForTemp
  };
}
