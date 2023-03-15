<script setup>
import PageHeader from './components/PageHeader.vue';

</script>

<template>
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
</template>

<style lang="scss" scoped>
.code-app {
  min-height: 100vh;
}
</style>
