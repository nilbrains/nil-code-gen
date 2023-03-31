<script setup>
import { provide, ref } from "vue";
import CodeDialog from "../../components/CodeDialog.vue";
import {
  useHomeGenCode,
  useHomeTable,
  useHomeUploadSql,
  useMenuOption,
} from ".";
import { useCodeDialog } from "@/hooks/codeDialog.js";
import { useMessage } from "naive-ui";
import { useSpaceStore } from "@/stores/space.js";
import { useSettingDialog } from "@/hooks/settingDialog.js";
import Setting from "@/views/Home/Setting.vue";
import { elementPlusString, getConfigData } from "@/config/index.js";
import { naiveString } from "@/config/naive";

const message = useMessage();
const spaceStore = useSpaceStore();
// 表格
const { columns, data, addEmptyRow } = useHomeTable({
  setting: openSetting,
  typeChange: onTypeChange,
});

function openSetting(row, index) {
  console.log(row, index);
  settingDialog.open(genSettingVal.uiType, row, index);
  // 还原修改状态
  row.edited = false;
}

function onTypeChange(row, index) {
  console.log("onTypeChange .... ", JSON.stringify(row));
  settingDialog.open(genSettingVal.uiType, row, index, false);
  settingDialog.save();
}

const { getFormatSql } = useHomeUploadSql();

const codeDialog = useCodeDialog();

provide("CODE-DIALOG", codeDialog);

const settingDialog = useSettingDialog();

provide("SETTING-DIALOG", settingDialog);

settingDialog.listener.saveEnd = (config, index) => {
  // console.log(sql);
  if (index > -1) {
    data.value[index].config = config;
  }
};

// 导入sql
function openSqlModel() {
  codeDialog.open({
    title: "SQL创建语句",
    code: "",
    language: "sql",
    buttons: ["save", "close"],
  });
}

function sql2table(sql) {
  if (sql.trim() === "") {
    return;
  }
  try {
    const sqlBody = getFormatSql(sql);
    // console.log(sqlBody);
    if (sqlBody.vars) {
      const _temp = [];
      sqlBody.vars.forEach((it) => {
        _temp.push({
          field: it.field || "",
          label: it.comment || "",
          type: "string",
          config: getConfigData(elementPlusString),
        });
      });
      data.value = _temp;
    }
  } catch (error) {
    console.error(error);
    message.error(error ? error.message : "遇到一个未知的错误");
  }
}

codeDialog.listener.saveEnd = (sql) => {
  // console.log(sql);
  sql2table(sql);
};

const { uiOptions, genSettingVal, tempOptions, genCodeForTemp } =
  useHomeGenCode();

function gencode() {
  //
  try {
    const code = genCodeForTemp(data.value);
    // console.log(code);
    codeDialog.open({
      title: "代码预览",
      code: code,
      language: "html",
      buttons: ["close"],
    });
  } catch (error) {
    console.error(error);
    message.error(error ? error.message : "遇到一个未知的错误");
  }
}

// 菜单选项
const { menuOptions, handleSelect } = useMenuOption(message, spaceStore);

const nowSelectSql = ref("");

function handleNowSelectSql(key, option) {
  // console.log(option.sql);
  sql2table(option.sql);
}

function handleUiOptions(key) {
  if (key == "element-plus") {
    data.value.forEach((it) => {
      it.type = "string";
      it.config = getConfigData(elementPlusString);
    });
  } else if (key == "naive") {
    data.value.forEach((it) => {
      it.type = "string";
      it.config = getConfigData(naiveString);
    });
  }
}
</script>

<template>
  <div class="">
    <n-affix
      :trigger-top="0"
      position="fixed"
      style="z-index: 10; width: 100%; left: 0"
    >
      <n-card style="margin-bottom: 16px">
        <NSpace justify="space-between">
          <NSpace>
            <n-dropdown
              trigger="hover"
              :options="menuOptions"
              @select="handleSelect"
            >
              <n-button>菜单</n-button>
            </n-dropdown>
            <NButton @click="openSqlModel">输入单表SQL</NButton>
            <n-select
              style="width: 180px"
              v-if="spaceStore.sqls.length > 0"
              v-model:value="nowSelectSql"
              @update:value="handleNowSelectSql"
              :options="spaceStore.sqls"
            />
          </NSpace>

          <NSpace>
            <n-select
              style="width: 180px"
              v-model:value="genSettingVal.uiType"
              :options="uiOptions"
              @update:value="handleUiOptions"
            />
            <n-select
              style="width: 180px"
              v-model:value="genSettingVal.tempType"
              :options="tempOptions"
            />
            <NButton @click="gencode">生成代码</NButton>
          </NSpace>
        </NSpace>
      </n-card>
    </n-affix>

    <n-card>
      <n-data-table :columns="columns" :data="data" :bordered="false" />

      <NButton block @click="addEmptyRow">新增字段</NButton>
    </n-card>

    <CodeDialog />
    <Setting />
  </div>
</template>
