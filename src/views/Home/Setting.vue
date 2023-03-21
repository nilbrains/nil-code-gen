<script setup>
import { inject } from "vue";

const settingDialog = inject("SETTING-DIALOG");

function handleShowChange (show){
  if (!show) {
    settingDialog.save()
  }
}
</script>
<template>
  <n-drawer v-model:show="settingDialog.dialog.showed" :width="502" @update-show="handleShowChange">
    <n-drawer-content>
      <template #header>
        <n-space>
          <div class=""></div>
<!--          <n-button>保存</n-button>-->
        </n-space>
      </template>
      <n-form
        ref="formRef"
        :model="settingDialog.dialog.formData"
        label-placement="left"
      >
        <template v-for="(item, index) in settingDialog.dialog.form" :key="index">
          <n-form-item :label="item?.name"  v-if="item?.render === 'string'">
            <n-input v-model:value="settingDialog.dialog.formData[item?.key]" placeholder="请输入配置" />
          </n-form-item>
          <n-form-item :label="item?.name"  v-if="item?.render === 'switch'">
            <n-switch v-model:value="settingDialog.dialog.formData[item?.key]" />
          </n-form-item>
          <n-form-item :label="item?.name"  v-if="item?.render === 'dynamic-input'">
            <n-dynamic-input
              v-model:value="settingDialog.dialog.formData[item?.key]"
              preset="pair"
              key-placeholder="名称"
              value-placeholder="值"
            />
          </n-form-item>
        </template>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>


<style scoped>

</style>