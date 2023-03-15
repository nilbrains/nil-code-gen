import { NInput, NSelect } from "naive-ui";
import { h, ref } from "vue";

import { formatSql } from "../../utils/index";

const typeOptions = [
  {
    label: '字符串',
    value: 'string'
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

const createColumns = () => {
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
    },
  ];
};

export function useHomeTable() {
  const columns = createColumns();

  const data = ref([]);

  function addEmptyRow() {
    data.value?.push({
      field: "",
      label: "",
      type: "",
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
