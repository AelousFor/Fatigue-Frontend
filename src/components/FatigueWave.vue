<template>

  <div>
    <div id="chart1" style="width:700px;height:440px;float:left;margin-top: 15px"></div>
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
    getData() {
      if (this.start) {
        // 每秒生成 20 个 0-3 之间的随机整数，并赋值给数组
        const array = new Array(20);
        for (let i = 0; i < 20; i++) {
          const randomNum = Math.random();
          if (randomNum < 0.3) {
            array[i] = 0;
          } else if (randomNum < 0.65) {
            array[i] = 1;
          } else if (randomNum < 0.96) {
            array[i] = 2;
          } else {
            array[i] = 3;
          }
        }
        this.data = array;
        this.drawLine()
      }
    }
    ,
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      if (this.chart == '') {
        this.chart = echarts.init(document.getElementById('chart1'))
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
          data: Array.from({length: 20}, (v, k) => k + 1), // x轴数据
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
          max: 3,
          min: 0,
          interval: 1,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#18BAAF',
              width: '2',
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#CC0000', '#139189','#139189'], // 分割线颜色数组
            }
          },
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
