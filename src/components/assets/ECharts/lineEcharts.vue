<template>
    <div>
      <div :id="id" :style="{width: width, height: height}"></div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import westeros from './theme/westeros'
  export default {
    name: 'lineEcharts',
    props: {
      id: {
        type: String,
        default: 'myChart'
      },
      width: {
        type: String,
        default: '98%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id),'westeros')

        this.chart.setOption({
          title: {
            text: '访问量与成交量曲线'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['访问量','商品销量']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'访问量',
              type:'line',
              stack: '总量',
              data:[1200, 2320, 3010, 4340, 3400, 4500, 5100]
            },
            {
              name:'商品销量',
              type:'line',
              stack: '总量',
              data:[2200, 3820, 1910, 2340, 4900, 3300, 1100]
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
