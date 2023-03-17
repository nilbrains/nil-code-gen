<script setup>
import { inject, nextTick } from "vue";

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution';

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
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
  });
}
</script>

<template>
  <n-modal :show="model.dialog.showed">
    <n-card style="width: 80%; height: 100vh" :title="model.dialog.title" size="huge" :bordered="false" role="dialog"
      aria-modal="true">
      <template #header-extra>
        <NSpace>
          <NButton v-if="model.dialog.buttons?.indexOf('save') != -1" @click="model.save" type="success">确定</NButton>
          <NButton v-if="model.dialog.buttons?.indexOf('close') != -1" @click="model.close" type="error">关掉</NButton>
        </NSpace>
      </template>
      <div id="code-container" style="height: 100%"></div>
    </n-card>
  </n-modal>
</template>
