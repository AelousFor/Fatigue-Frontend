<template>
  <div>
    <div id="bar" style="width:1500px;height:350px;float:left;"></div>
  </div>
</template>

<script>
import Test from "./Test";
import {mapGetters, mapState} from "vuex";
import * as echarts from "echarts";

export default {
  name: "FatigueDegree",
  components: {
    Test
  },
  computed: {
    ...mapState(['fatigue']),
    ...mapGetters(['getFatigue'])
  },
  watch: {
    fatigue: function () {
      this.bar.setOption({
        series: [
          {
            data: this.$store.getters.getFatigue,
          }
        ]
      })
    }
  },
  data() {
    return {
      bar: '',
    };
  },
  mounted: function () {
    this.drawBar()
  },
  methods: {
    drawBar() {
      this.bar = echarts.init(document.getElementById('bar'))
      this.bar.setOption({
        xAxis: {
          type: 'category',
          data: ['第一次', '第二次', '第三次', '第四次', '第五次'],
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
          splitNumber: 5,
          max: 1,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#18BAAF',
              width: '2'
            }
          },
          name: '疲劳程度',
          nameTextStyle: {
            fontWeight: 'bold',
            color: '#18BAAF'
          },
          splitLine:{
            lineStyle:{
              color:'#139189'
            }
          },
        },
        series: [
          {
            data: this.$store.getters.getFatigue,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'sans-serif',
                  }
                },
                color: function (params) {
                  var data = params.value
                  if (data <= 0.4) {
                    return '#277C87'
                  } else if (data > 0.4 && data <= 0.7) {
                    return '#E6D177'
                  } else {
                    return '#B6BC7B'
                  }
                },
                barBorderRadius: 5,
                borderWidth: 1,
                borderType: 'solid',
                shadowBlur: 3
              },
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
