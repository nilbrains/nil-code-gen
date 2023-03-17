<script setup>
import logo from "../assets/logo.svg";
import config from "../../package.json";
</script>

<template>
  <n-space class="page-header" align="center" justify="space-between">
    <n-space align="center">
      <n-avatar :size="50" object-fit="contain" :src="logo" color="transparent" />
      <h1 class="title">
        <div class="version"> {{ config.version }} </div>
      </h1>
    </n-space>
    <n-space align="center">
      <n-button @click="$router.push({ name: 'home' })">主页</n-button>
      <n-button @click="$router.push({ name: 'dependencies' })">依赖</n-button>
    </n-space>
  </n-space>
</template>

<style lang="scss" scoped>
.page-header {
  height: 80px;
  padding: 0 32px;
  border-bottom: 1px solid #dcdfe6;

  // box-shadow: 0 10px 50px -16px rgba(0, 0, 0, 0.1);
  .title {
    line-height: 48px;
    margin: 0;
    padding: 0;
    color: #41b883;

    .version {
      font-size: 14px;
      display: inline-block;

      &::before {
        content: "v ";
      }
    }
  }
}
</style>
