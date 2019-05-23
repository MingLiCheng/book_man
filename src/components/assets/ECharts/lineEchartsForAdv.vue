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
        // 计算设备的dpr
        // function setupCanvas(canvas) {
        //   var dpr = (scale = window.devicePixelRatio || 1);
        //   var rect = canvas.getBoundingClientRect();
        //   canvas.width = rect.width * dpr;
        //   canvas.height = rect.height * dpr;
        //   canvas.style.width = rect.width + "px"
        //   canvas.style.height = rect.height + "px"
        //   return canvas;
        // }
      this.initChart()
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id), 'westeros')

        this.chart.setOption({
          title: {
            text: '广告推荐收益曲线'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['广告访问量','推荐访问量']
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
              name:'广告访问量',
              type:'line',
              stack: '总量',
              data:[2500, 4302, 5010, 2540, 6900, 5300, 6410]
            },
            {
              name:'推荐访问量',
              type:'line',
              stack: '总量',
              data:[5320, 7332, 9301, 6334, 5390, 4330, 1320]
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
