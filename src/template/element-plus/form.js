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
      <el-form ref="form" :model="formData.form.items" label-width="120px">
      <% for(var i = 0; i < data.length; i ++){ %>
        <el-form-item label="<%=data[i].label%>" >
        <% if(data[i].type == "date") { %>
          <el-date-picker v-model="formData.form.items.<%=data[i].field%>" type="date" :disabled="formData.form.loading" <%- data[i].configFlat || '' %> />
          <% } else if (data[i].type == "datetime") { %>
          <el-date-picker v-model="formData.form.items.<%=data[i].field%>" type="datetime" :disabled="formData.form.loading" <%- data[i].configFlat || '' %> />
          <% } else if (data[i].type == "select") { %>
          <el-select v-model="formData.form.items.<%=data[i].field%>" :disabled="formData.form.loading" <%- data[i].configFlat || '' %> >
            <% if (data[i].config?.options && data[i].config?.options?.length > 0) {  
              for(var j = 0; j < data[i].config?.options?.length; j ++){
            %>
            <el-option label="<%= data[i].config?.options[j]?.key %>" value="<%= data[i].config?.options[j]?.value %>" />
            <% } } else {%>
            <el-option label="默认" value="0" />
            <% } %>
          </el-select>
        <% } else { %>
          <el-input v-model="formData.form.items.<%=data[i].field%>" :disabled="formData.form.loading"  <%- data[i].configFlat || '' %> /> 
        <% } %>
        </el-form-item>
      <% } %>
        </el-form>
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