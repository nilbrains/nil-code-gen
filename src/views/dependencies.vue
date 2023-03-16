<script setup>
import { dependencies, devDependencies } from "../../package.json";
</script>

<template>
    <n-space vertical="">
        <NCard :title="`dependencies`.toUpperCase()">
            <NSpace>

                <div class="dependencies-item" v-for="(item, index) in Object.keys(dependencies)" :key="index">
                    <div class="name">{{ item }}</div>
                    <div class="version">{{ dependencies[item] }}</div>
                </div>

            </NSpace>
        </NCard>
        <NCard :title="`devDependencies`.toUpperCase()">
            <NSpace>

                <div class="dependencies-item" v-for="(item, index) in Object.keys(devDependencies)" :key="index">
                    <div class="name">{{ item }}</div>
                    <div class="version">{{ devDependencies[item] }}</div>
                </div>

            </NSpace>
        </NCard>
    </n-space>
</template>

<style scoped lang="scss">
.dependencies-item {
    display: flex;

    .name {
        background-color: #4d90fe;
        color: #fff;
        padding: 10px 5px 10px 10px;
        border-radius: 10px 0 0 10px;
    }

    .version {
        background-color: #527e40;
        color: #fff;
        padding: 10px 10px 10px 5px;
        border-radius: 0 10px 10px 0;
    }
}
</style>