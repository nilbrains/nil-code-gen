export const elementPlusFormMe = `
<script setup>
import { inject, ref } from "vue";

const form = ref(null);

const formData = inject("NIL_FORM");
</script>

<template>
  <el-dialog
    custom-class="nil-dialog"
    :close-on-click-modal="false"
    :model-value="formData.form.method ? true : false"
    @close="formData?.toggleForm"
  >
    <template #title>
      <div class="nil-dialog-title">
        {{ formData.form.method ? formData.headerText[formData.form.method] : "" }}
      </div>
    </template>
    <el-scrollbar
      v-loading="formData.form.loading"
      class="nil-dialog-scrollbar"
    >
      <div class="nil-form">
        
      <% for(var i = 0; i < data.length; i ++){ %>
        <el-form-item label="<%=data[i].label%>" >
        <% if(data[i].type == "date") { %>
          <el-date-picker v-model="formData.form.items.<%=data[i].field%>" type="date" placeholder="请选择<%=data[i].label%>" :disabled="formData.form.loading"/>
          <% } else if (data[i].type == "datetime") { %>
          <el-date-picker v-model="formData.form.items.<%=data[i].field%>" type="datetime" placeholder="请选择<%=data[i].label%>" :disabled="formData.form.loading"/>
          <% } else if (data[i].type == "select") { %>
          <el-select v-model="formData.form.items.<%=data[i].field%>" placeholder="请选择<%=data[i].label%>" :disabled="formData.form.loading">
            <el-option label="默认" value="0" />
          </el-select>
        <% } else { %>
          <el-input v-model="formData.form.items.<%=data[i].field%>" placeholder="请输入<%=data[i].label%>" :disabled="formData.form.loading"/> 
        <% } %>
        </el-form-item>
      <% } %>

      </div>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="formData?.toggleForm('')">取消</el-button>
        <el-button
          :loading="formData.form.loading"
          @click="formData?.onSave(form)"
          type="primary"
          >保存</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
`