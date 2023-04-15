<template>
    <div class="yst-box-container">
        <div class="yst-box-header">
            <Header></Header>
        </div>
        <div class="yst-box-main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
</script>

<style lang="less" scoped>
.yst-box-container {
    height: 100%;
    background-color: #022430;

    .yst-box-main {
        width: 100%;
        height: calc(100% - 60px);
        padding: 30px 20px 20px;
        box-sizing: border-box;
    }
}
</style>