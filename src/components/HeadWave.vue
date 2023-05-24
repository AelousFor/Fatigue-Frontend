<template>

  <div>
    <div id="chart2" style="width:700px;height:440px;float:left;margin-top: 15px"></div>
  </div>

</template>

<script>
import * as echarts from "echarts";

export default {
  name: "HeadWave",
  data() {
    return {
      chart: '',
      row: 0,
      data: [],
      timer: null
    };
  },
  mounted: function () {
    this.getData()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  created() {
  },
  methods: {

    async getNewRow() {
      if (this.row === this.data.length) {
        this.row = 0
      }
      this.drawLine()
      this.row = this.row + 1

      await new Promise((resolve) => {
        this.timer = setTimeout(() => {
          resolve();
        }, 1250); // 延迟 1.25 秒后再执行请求
      });
      await this.getNewRow(); // 等待上次接口请求结束后再执行新的请求
    },

    getData() {
      this.$axios({
        method: 'get',
        url: 'http://127.0.0.1:9876/file/get',
        params: {},
      })
        .then((res) => {
          if (res.data.code === "200") {
            this.data = res.data.body
          }
        })
        .catch((err) => {
          console.log(err)
        })
      this.getNewRow()
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      if(this.chart == ''){
        this.chart = echarts.init(document.getElementById('chart2'))
      }
      // 绘制图表
      this.chart.setOption({
        title: {
          text: '脑电波实时波形', // 主标题
          padding: [10, 50],
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
          data: ['脑电波'],
          lineStyle: {
            color: '#E6D177'
          }
        },
        series: [
          {
            name: '脑电波',
            data: this.data[this.row],
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
