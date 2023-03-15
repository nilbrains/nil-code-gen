<script setup>
import { provide } from "vue";
import CodeDialog from "../../components/CodeDialog.vue";
import { useHomeTable, useHomeUploadSql } from ".";
import { useCodeDialog } from "../../hooks/codeDialog";
// 表格
const { columns, data, addEmptyRow } = useHomeTable();

const { getFormatSql } = useHomeUploadSql();

const codeDialog = useCodeDialog();

provide("CODE-DIALOG", codeDialog);

// 导入sql
function openSqlModel() {
  codeDialog.open({
    title: "SQL创建语句",
    code: "",
    language: "sql"
  })
}

codeDialog.listener.saveEnd = (sql) => {
  console.log(sql);
  if (sql.trim() === "") {
    return;
  }
  const sqlBody = getFormatSql(sql);

  console.log(sqlBody);
  if (sqlBody.vars) {
    const _temp = [];
    sqlBody.vars.forEach((it) => {
      _temp.push({
        field: it.field || "",
        label: it.comment || "",
        type: "",
      });
    });
    data.value = _temp;
  }
}
</script>

<template>
  <div class="">
    <n-card style="margin-bottom: 16px">
      <NSpace justify="space-between">
        <NSpace>
          <NButton @click="openSqlModel">导入建表SQL</NButton>
        </NSpace>

        <NSpace>
          <NButton>生成代码</NButton>
        </NSpace>
      </NSpace>
    </n-card>
    <n-card>
      <n-data-table :columns="columns" :data="data" :bordered="false" />

      <NButton block @click="addEmptyRow">新增字段</NButton>
    </n-card>

    <CodeDialog />
  </div>
</template>
