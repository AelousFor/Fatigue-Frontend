<template>

  <div ref="fatigue">
    <div id="chart3" style="width:700px;height:440px;float:left;margin-top: 15px"></div>
  </div>

</template>

<script>
import * as echarts from "echarts";
import {mapGetters, mapState} from "vuex";

export default {
  name: "FatigueWave",
  data() {
    return {
      chart: '',
      data: [],
      timer: null,
      start: false
    };
  },
  mounted() {
    this.drawLine()
    this.timer = setInterval(() => {
      this.getData()
    }, 1250); // 每秒执行一次
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
    // 创建长度为 n，取值范围为 [min, max) 的随机实数数组
    getRandomArray(n, min, max) {
      const arr = [];
      for (let i = 0; i < n; i++) {
        const value = Math.random() * (max - min) + min;
        arr.push(value);
      }
      return arr;
    },
    getData() {
      if (this.start) {
        this.data = []
        const arr1 = this.getRandomArray(200, -100, 100);
        const arr2 = this.getRandomArray(200, 300, 500);
        const arr3 = this.getRandomArray(200, 700, 900);
        const arr4 = this.getRandomArray(200, -500, -300);
        const arr5 = this.getRandomArray(200, -900, -700);
        this.data.push(arr1)
        this.data.push(arr2)
        this.data.push(arr3)
        this.data.push(arr4)
        this.data.push(arr5)
        this.drawLine()
      }
    }
    ,
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      if (this.chart == '') {
        this.chart = echarts.init(document.getElementById('chart3'))
      }
      // 绘制图表
      this.chart.setOption({
        title: {
          text: '疲劳程度实时波形', // 主标题
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
          max: 1000,
          min: -1000,
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
          axisLabel: {
            show: false
          }
        },
        legend: {
          orient: 'vertical',
          x: 'center',
          y: 'top',
          data: [
            {
              name: '疲劳程度',
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
            name: '通道1',
            data: this.data[0],
            type: 'line',
            lineStyle:
              {
                color: '#ADD8E6'
              }
          },
          {
            name: '通道2',
            data: this.data[1],
            type: 'line',
            lineStyle:
              {
                color: '#9400D3'
              }
          },
          {
            name: '通道3',
            data: this.data[2],
            type: 'line',
            lineStyle:
              {
                color: '#E6D177'
              }
          },
          {
            name: '通道4',
            data: this.data[3],
            type: 'line',
            lineStyle:
              {
                color: 'green'
              }
          },
          {
            name: '通道5',
            data: this.data[4],
            type: 'line',
            lineStyle:
              {
                color: '#D2B48C'
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
