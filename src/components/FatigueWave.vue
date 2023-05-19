<template>

  <div>
    <div id="chart1" style="width:700px;height:440px;float:left;margin-top: 15px"></div>
  </div>

</template>

<script>
import * as echarts from "echarts";

export default {
  name: "FatigueWave",
  data() {
    return {
      chart: '',
      row: 0,
      data: []
    };
  },
  mounted: function () {
    this.drawLine()
  },
  created() {
    setInterval(() => {
      setTimeout(() => {
        // this.getData()
      }, 0);
    }, 1500);
  },
  methods: {
    getData() {
      this.$axios({
        method: 'get',
        // url: 'http://127.0.0.1:9876/file/get',
        params: {
          row: this.row
        },
      })
        .then((res) => {
          if (res.data.code === "200") {
            this.data = res.data.body
            this.row = this.row + 1
            if(this.row===5040){
              this.row=0
            }
            this.drawLine()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('chart1'))
      // 绘制图表
      this.chart.setOption({
        title: {
          text: '疲劳程度实时波形', // 主标题
          padding: [10,50],
          x: 'left', // x轴方向对齐方式
          textStyle: {
            color: '#18BAAF',
          }
        },
        tooltip: {
          trigger: 'axis' // axis   item   none三个值
        },
        xAxis: {
          type: 'category', // 还有其他的type，可以去官网喵两眼哦
          data: Array.from({length: 200}, (v, k) => k + 1), // x轴数据
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
          max: 500,
          min: -500,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#18BAAF',
              width: '2',
            }
          },
          splitLine: {
            lineStyle: {
              color: '#139189'
            }
          },
        },
        legend: {
          orient: 'vertical',
          x: 'center',
          y: 'top',
          data: ['疲劳程度'],
          lineStyle: {
            color: '#E6D177'
          }
        },
        series: [
          {
            name: '疲劳程度',
            data: this.data,
            type: 'line',
            lineStyle:
              {
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
