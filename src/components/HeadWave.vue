<template>

  <div>
    <div id="chart2" style="width:700px;height:440px;float:left;margin-top: 15px"></div>
  </div>

</template>

<script>
import * as echarts from "echarts";
import {mapGetters, mapState} from "vuex";

export default {
  name: "HeadWave",
  data() {
    return {
      chart: '',
      row: 0,
      data: [],
      timer: null,
      start: false
    };
  },
  mounted() {
    this.drawLine()
    this.getData()
    this.timer = setInterval(() => {
      this.getNewRow()
    }, 1250); // 延迟 1.25 秒后再执行请求
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  computed: {
    ...mapState(['signal']),
    ...mapGetters(['getSignal'])
  },
  watch: {
    signal: function () {
      this.start = this.$store.getters.getSignal
    }
  },
  methods: {
    getNewRow() {
      if (this.start) {
        if (this.row === this.data.length) {
          this.row = 0
        }
        this.drawLine()
        this.row = this.row + 1
      }
    },
    getData() {
      this.$axios({
        method: 'get',
        url: '/file/getWave',
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
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      if (this.chart == '') {
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
          max: 400,
          min: -400,
          interval: 100,
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
          data: [
            {
              name: '脑电波',
              textStyle: {
                color: '#18BAAF', // 修改部分：将文字颜色设置为红色
              },
            },
          ],
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
