export const infoOption = {
    grid: {
        left: '10%',
        right: '10%',
        top: '28%',
        bottom: '17%',
    },
    tooltip:{
        show:false
    },
    xAxis: {
        type: 'category',
        splitLine: {
            lineStyle: {
                color: '#2F5372'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#2F5372'
            },
        },
        axisLabel: {
            fontSize: 16,
            color: '#8DCBC6'
        },
        data: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
    },
    yAxis: {
        type: 'value',
        name:'日客流量统计',
        nameTextStyle:{
            color:'#11E5C0',
            fontSize:16,
            fontWeight:500
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show:true,
            lineStyle: {
                color: '#2F5372'
            },
        },
        splitLine: {
            lineStyle: {
                color: '#2F5372'
            }
        },
        axisLabel: {
            fontSize: 16,
            color: '#8DCBC6'
        },
        scale: true
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: '#fff',
                    borderColor: '#09F1C8',
                    borderWidth: 3,
                    lineStyle: {
                        color: "#09F1C8",
                        width: 4
                    },
                }
            },
            type: 'line'
        }
    ]
}