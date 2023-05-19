<template>

  <div>
  <div id="chart" style="width:700px;height:440px;float:left;"></div>
  </div>

</template>

<script>

import {mapGetters, mapState} from "vuex";
import * as echarts from "echarts";

export default {
  name: "V-Value",
  data() {
    return {
      chart: ''
    };
  },
  computed: {
    ...mapState(['vvalue']),
    ...mapGetters(['getVValue'])
  },
  watch: {
    vvalue: function() {
      this.chart.setOption({
        series: [
          {
            data: this.$store.getters.getVValue
          }
        ]
      })
    }
  },
  mounted: function () {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('chart'))
      // 绘制图表
      this.chart.setOption({
        title: {
          text: 'V值折线图', // 主标题
          subtext: '', // 副标题
          x: 'left', // x轴方向对齐方式
          textStyle:{
            color:'#18BAAF'
          }
        },
        tooltip: {
          trigger: 'axis' // axis   item   none三个值
        },
        xAxis: {
          type: 'category', // 还有其他的type，可以去官网喵两眼哦
          data: ['第一次', '第两次', '第三次', '第四次', '第五次'], // x轴数据
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#18BAAF',
              width: '2'
            }
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#18BAAF',
              width: '2'
            }
          },
          splitLine:{
            lineStyle:{
              color:'#139189'
            }
          },
        },
        legend: {
          orient: 'vertical',
          x: 'center',
          y: 'top',
          data: ['V值'],
          lineStyle:{
            color: '#E6D177'
          }
        },
        series: [
          {
            name: 'V值',
            data: this.$store.getters.getVValue,
            type: 'line',
            lineStyle:{
              color: '#E6D177'
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
