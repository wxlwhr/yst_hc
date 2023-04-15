<template>
    <div class="yst-age-content" id="yst-age-figure"></div>
</template>

<script setup lang="ts">
import *as echarts from 'echarts'
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
const props = defineProps<{
    optionFath: any
}>();
onMounted(() => {
    initPieCharts()
})
const initPieCharts = () => {
    const charts = echarts.init(document.querySelector(".yst-age-content") as HTMLElement)
    const option = {
        // backgroundColor: "#000",
        title: {
            text: '年 龄'+'\n'+'占 比',
            x: '13.2%',
            y: '36%',
            textStyle: {
                fontSize: 14,
                color: '#FFFFFF'
            }
        },
        legend: {
            type: 'plain',
            orient: 'vertical',
            right: '5%',
            top: 'middle',
            itemGap: 16,
            // selectedMode: false,
            textStyle: {
                color: '#CCEFEC',
                fontSize: 12,
            },
            itemStyle: {
                borderRadius: 4,
                borderColor: '#000',
                borderWidth: 0,
            },
            icon: 'circle',
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['55%', '90%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 2,
                    borderColor: '#000',
                    borderWidth: 1,
                },
                center: ['18%', '50%'],
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        color: '#4c4a4a',
                        // formatter: (parmes: any) => {
                        //     return '{active|' + parmes.value + '}' + '\n\r' + '{total|' + parmes.name + '}'
                        // },

                        // rich: {
                        //     total: {
                        //         fontSize: 13,
                        //         color: '#b0b9c8',
                        //         padding: [4, 0, 4, 0]
                        //     },
                        //     active: {
                        //         fontFamily: 'Bahnschrift',
                        //         fontSize: 25,
                        //         color: '#fff',
                        //         fontWeight: 'bold',
                        //         padding: [4, 0, 4, 0]
                        //     }
                        // }
                    }
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 32, name: '0-18岁' },
                    { value: 25, name: '19-35岁' },
                    { value: 8, name: '36-50岁' },
                    { value: 12, name: '51-60岁' },
                    { value: 18, name: '61-78岁' },
                    { value: 0, name: '78-79岁' },
                    { value: 0, name: '90+' },
                ]
            }

        ],
        color: ['#0AC85B', '#FDF350', '#FF6D5E', '#F19E66', '#01ECEC', '#ED2DDD', '#3C8DF1']
    }
    charts.setOption(option)
    charts.on('click', function (params: any) {
        // 获取点击图例的选中状态
        // var isSelected = params.selected[params.name];
        console.log(params);

        // 在控制台中打印
        // console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
        // 打印所有图例的状态
        // console.log(params.selected);
    });
}


</script>

<style scoped lang="less">
.yst-age-content {
    height: calc(100% - 60px);
}
</style>