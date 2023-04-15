<template>
    <div class="echart" ref="chartDom"></div>
</template>
<script lang="ts" setup>
import  * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount, defineProps, watch } from "vue";
const chartDom = ref()
let myChart:any = null;
const props = defineProps({
    option: Object,
})
//重绘图表函数
const resizeHandler = () => {
    myChart.resize();
}
//设置防抖，保证无论拖动窗口大小，只执行一次获取浏览器宽高的方法
const debounce = (fun:Function, delay:number) => {
    let timer:any;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fun();
        }, delay);
    }
};
const cancalDebounce = debounce(resizeHandler, 500);
onMounted(() => {
    myChart = echarts.init(chartDom.value)
    myChart.setOption(props.option, true);
    window.addEventListener('resize', cancalDebounce);
})
//页面销毁前，销毁事件和实例
onBeforeUnmount(() => {
    window.removeEventListener('resize', cancalDebounce)
    myChart.dispose()
})
//监听图表数据时候变化，重新渲染图表
watch(() => props.option, () => {
    myChart.setOption(props.option, true);
}, { deep: true })

</script>
<style lang="less" scoped>
.echart {
    width: 100%;
    height: 100%
}
</style>
