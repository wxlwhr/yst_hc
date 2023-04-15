<template>
    <div class="yst-shop-container">
        <div class="yst-shop-container-left">
            <div class="yst-shop-container-title"><span>客户信息</span></div>
            <div class="yst-shop-container-content">
                <!-- 今日客户 -->
                <div class="content-row1">

                    <SmallCard v-for="(item, index) in sells" :key="index" :has-border="index !== 2" :data="item"
                            :type="3" />
                </div>
                <!-- 男女比例 -->
                <div class="content-row2">
                    <div class="sex-canvas p-t-15 p-b-15">
                        <sex-scale :optionFath="option1"></sex-scale>
                    </div>
                    <div>
                        <age-scale :optionFath="option1"></age-scale>
                    </div>
                </div>
                <!-- 店铺排行 -->
                <div class="shop-rank">

                </div>
            </div>
        </div>
        <div class="yst-shop-container-center">中

        </div>
        <div class="yst-shop-container-right">
            <div class="yst-shop-container-title"><span>资产信息</span></div>
            <div class="yst-shop-container-content">

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    defineComponent,
    getCurrentInstance,
    nextTick,
    onMounted,
    ref,
    watch,
} from "vue";
// echart图引入
import sexScale from "@/components/sex/index.vue";
import ageScale from "@/components/age/index.vue";
import SmallCard from "@/components/card-small.vue";
import icon1 from "@/assets/images/日客单价.png";
import icon2 from "@/assets/images/日客流量.png";
const option1: any = ref({
    man: "35",
    woman: "80"
});
const sells = ref([
      {
        name: "今日客户数量",
        icon: icon2,
        num: 3500,
        pre: 78,
      },
      {
        name: "今日客单价",
        icon: icon1,
        num: 365.12,
        pre: 15,
      }
    ]);
</script>

<style lang="less" scoped>
@import "../../assets/css/shop/index.less";
</style>