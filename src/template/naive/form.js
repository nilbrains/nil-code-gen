export const naiveFormMe = `
<template>
    <BaseDialog inject-key="NIl_FORM">
      <% for(var i = 0; i < data.length; i ++){ %>
        <n-form-item label="<%=data[i].label%>" >
        <% if(data[i].type == "date") { %>
          <n-date-picker v-model:value="formData.form.items.<%=data[i].field%>" type="date" :disabled="formData.form.loading" <%- data[i].configFlat || '' %> />
          <% } else if (data[i].type == "datetime") { %>
          <n-date-picker v-model:value="formData.form.items.<%=data[i].field%>" type="datetime" :disabled="formData.form.loading" <%- data[i].configFlat || '' %> />
          <% } else if (data[i].type == "select") { %>
          <n-select v-model:value="formData.form.items.<%=data[i].field%>" :disabled="formData.form.loading" :options="<%=data[i].field%>Options" <%- data[i].configFlat || '' %> >
          </n-select>
        <% } else { %>
          <n-input v-model:value="formData.form.items.<%=data[i].field%>" :disabled="formData.form.loading"  <%- data[i].configFlat || '' %> /> 
        <% } %>
        </n-form-item>
      <% } %>
    </BaseDialog>
</template>

<script setup>
import { inject } from "vue";

const formData = inject("NIl_FORM");

<% for(var i = 0; i < data.length; i ++){ %>
  <%  if (data[i].type == "select") { %>
const <%=data[i].field%>Options = [
    <% if (data[i].config?.options && data[i].config?.options?.length > 0) {  
      for(var j = 0; j < data[i].config?.options?.length; j ++){
    %>
  { "label": "<%= data[i].config?.options[j]?.key %>" , "value": "<%= data[i].config?.options[j]?.value %>"  },
    <% } } else {%>
  { "label": "默认", "value": "0"  },
    <% } %>
]
<% } %>
<% } %>
</script>
`;
