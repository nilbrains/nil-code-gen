<script setup>
import { inject, nextTick } from "vue";

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { useHomeGenCode } from "@/views/Home";

self.MonacoEnvironment = {
  getWorker(_, label) {
    return new editorWorker();
  },
};

let monacoEditor = null;
const model = inject("CODE-DIALOG");

model.listener.openEnd = () => {
  initCode();
};

model.listener.closeEnd = () => {
  monacoEditor && monacoEditor.dispose();
};

// onMounted(() => {
//   initCode();
// });

function initCode() {
  nextTick(() => {
    monacoEditor = monaco.editor.create(
      document.getElementById("code-container"),
      {
        value: model.dialog.code,
        language: model.dialog.language,
        readOnly: model.dialog.readOnly,
        renderSideBySide: false,
      }
    );
    // 监听值变化
    monacoEditor.onDidChangeModelContent(() => {
      const currenValue = monacoEditor?.getValue();
      model.dialog.code = currenValue;
    });

    // 如果 获取到 temps 默认选中第一项
    if (Array.isArray(model.dialog.temps) && model.dialog.temps.length > 0) {
      updateTempsType(model.dialog.temps[0]?.value);
    }
  });
}

const { genSettingVal, genCodeForTemp } = useHomeGenCode();

function updateTempsType(val) {
  genSettingVal.tempType = val;
  const _code = genCodeForTemp(model.dialog.data);
  monacoEditor && monacoEditor?.setValue(_code);
}
</script>

<template>
  <n-modal :show="model.dialog.showed">
    <n-card
      style="width: 80%; height: 100vh"
      :title="model.dialog.title"
      size="huge"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      <template #header>
        <n-space>
          <div>{{ model.dialog.title }}</div>
          <n-radio-group
            v-model:value="genSettingVal.tempType"
            v-if="model.dialog.temps"
            @update-value="updateTempsType"
          >
            <n-radio-button
              v-for="temp in model.dialog.temps"
              :key="temp.value"
              :value="temp.value"
              :label="temp.label"
            />
          </n-radio-group>
        </n-space>
      </template>
      <template #header-extra>
        <NSpace>
          <NButton
            v-if="model.dialog.buttons?.indexOf('save') != -1"
            @click="model.save"
            type="success"
            >确定</NButton
          >
          <NButton
            v-if="model.dialog.buttons?.indexOf('close') != -1"
            @click="model.close"
            type="error"
            >关掉</NButton
          >
        </NSpace>
      </template>
      <div id="code-container" style="height: 100%"></div>
    </n-card>
  </n-modal>
</template>
