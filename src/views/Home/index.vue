<script setup>
import { provide } from "vue";
import CodeDialog from "../../components/CodeDialog.vue";
import { useHomeGenCode, useHomeTable, useHomeUploadSql } from ".";
import { useCodeDialog } from "../../hooks/codeDialog";
import { useMessage } from "naive-ui";

const message = useMessage()

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
    language: "sql",
    buttons: ["save", "close"]
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
        type: "string",
      });
    });
    data.value = _temp;
  }
}

const { uiOptions, genSettingVal, tempOptions, genCodeForTemp } = useHomeGenCode()


function gencode() {
  // 

  try {
    const code = genCodeForTemp(data.value)
    // console.log(code);
    codeDialog.open({
      title: "代码预览",
      code: code,
      language: "html",
      buttons: ["close"]
    })
  } catch (error) {
    console.error(error);
    message.error(error ? error.message : "遇到一个未知的错误")
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
          <n-select style="width: 180px;" v-model:value="genSettingVal.uiType" :options="uiOptions" />
          <n-select style="width: 180px;" v-model:value="genSettingVal.tempType" :options="tempOptions" />
          <NButton @click="gencode">生成代码</NButton>
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
