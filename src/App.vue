<script setup>
import PageHeader from './components/PageHeader.vue';
// import WaterMask from "@/components/WaterMask.vue";
</script>

<template>
  <n-message-provider>
    <!-- <WaterMask text="啊实打实的" fullwindows :font-size="16" :line-height="16" :width="384" :height="384"
      :x-offset="12" :y-offset="60" :rotate="-15"> -->
      <n-space vertical class="code-app">
        <n-layout>
          <n-layout-header>
            <PageHeader />
          </n-layout-header>
          <n-layout-content content-style="padding: 32px;">
            <RouterView />
          </n-layout-content>
          <n-layout-footer></n-layout-footer>
        </n-layout>
      </n-space>
    <!-- </WaterMask> -->
  </n-message-provider>
</template>

<style lang="scss" scoped>
.code-app {
  min-height: 100vh;
}
</style>
