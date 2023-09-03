<template>
  <div class="main">

    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :cell-style="rowClass" :header-cell-style="headClass">
      <el-table-column
        prop="userName"
        label="姓名"
        :filters="[{text: '宁毓轩', value: '宁毓轩'}, {text: '柳佳瑞', value: '柳佳瑞'}, {text: '何演', value: '何演'}]"
        :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
        prop="userGender"
        label="性别"
        :filters="[{text: '男', value: '男'}, {text: '女', value: '女'}]"
        :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
        prop="userAge"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="userOccupation"
        label="职业">
      </el-table-column>
      <el-table-column
        prop="userEducation"
        label="学历">
      </el-table-column>
      <el-table-column
        prop="mathTime"
        label="测试时间/min">
      </el-table-column>
      <el-table-column
        prop="fatigueDegree"
        label="疲劳程度">
      </el-table-column>
      <el-table-column
        prop="vValue"
        label="V值">
      </el-table-column>
      <el-table-column
        prop="rightNumber"
        label="正确题数">
      </el-table-column>
      <el-table-column
        prop="wrongNumber"
        label="错误题数">
      </el-table-column>
      <el-table-column
        prop="divValue"
        label="标准差">
      </el-table-column>


      <el-table-column>
        <template slot-scope="scope">
          <el-button slot="reference" @click="visible=true"><i class="el-icon-s-data"></i></el-button>
        </template>
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-popconfirm
            title="确定要删除该条数据吗？"
            @confirm="deleteData(scope.$index)"
          >
            <el-button slot="reference"><i class="el-icon-delete-solid"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="测试结果"
      :visible.sync="visible"
      width="30%"
      :before-close="handleClose"
      @open="open">

      <div id="resultChart" style="width: 100%; height: 300px">
      </div>

      <div id="resultChart2" style="width: 100%; height: 300px">
      </div>

    </el-dialog>

  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "DataBase",
  data() {
    return {
      chart: '',
      tableData: [],
      visible: false,
      result: [4, 7, 6, 7],
      r2: [6, 5, 5, 8],
      hours: [2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 3, 2, 3, 2, 2, 1, 1, 2, 1],
      h2: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3, 3, 3, 2, 2, 3, 2, 3, 3, 1, 2, 1],
      msg2:'数据显示您在13～15时段平均疲劳较高，请注意休息',
      msg:'数据显示您在14～16时段平均疲劳较高，请注意休息'
    }
  },
  methods: {
    open() {
      const tmp1=this.result
      const tmp2=this.hours
      const tmp3=this.msg
      this.result=this.r2
      this.hours=this.h2
      this.r2=tmp1
      this.h2=tmp2
      this.msg=this.msg2
      this.msg2=tmp3
      this.$nextTick(() => {
        this.getChart()
        this.drawLine()
        this.$message({
          message: this.msg,
          type: 'warning'
        });
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      if (this.chart == '') {
        this.chart = echarts.init(document.getElementById('resultChart2'))
      }
      // 绘制图表
      this.chart.setOption({
        title: {
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
          data: Array.from({length: 24}, (v, k) => k + 1), // x轴数据
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
              color: ['#CC0000', '#139189', '#139189'], // 分割线颜色数组
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
            },
          ],
          lineStyle: {
            color: '#E6D177'
          }
        },
        series: [
          {
            name: '疲劳程度',
            data: this.hours,
            type: 'line',
            lineStyle:
              {
                color: '#E6D177'
              }
          }
        ]
      })
    },
    getChart() {
      const chartContainer = document.getElementById('resultChart');
      const option = {
        title: {
          text: '疲劳分析图',
          left: 'center',
          top: 'center'
        },
        series: [
          {
            type: 'pie',
            data: [
              {value: this.result[0], name: '疲劳时间', itemStyle: {color: '#FF0000'}},
              {value: this.result[1], name: '略微疲劳时间', itemStyle: {color: '#F5DD79'}},
              {value: this.result[2], name: '略微放松时间', itemStyle: {color: '#18BAAF'}},
              {value: this.result[2], name: '放松时间', itemStyle: {color: '#139189'}}
            ],
            radius: ['40%', '70%'],
            label: {
              formatter: '{b}: {c}' // 显示数据项的名称和值
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold'
              }
            }
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}' // 显示数据项的名称和值
        }
      };
      echarts.init(chartContainer).setOption(option);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    deleteData(index) {
      //get或者post , api为接口地址
      this.$axios({
        method: 'delete',
        url: '/user/delete',
        params: {
          autoKey: this.tableData[index].autoKey
        },
      })
        .then((res) => {
          if (res.data.code === "200") {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getData()
          } else {
            this.$message.error('删除失败');
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getData() {
      //get或者post , api为接口地址
      this.$axios({
        method: 'get',
        url: '/user/get',
        params: {},
        headers: {}, //如果需要添加请求头可在这写
      })
        .then((res) => {
          if (res.data.code === "200") {
            let data = res.data.body
            let size = data.length
            let tableArr = []
            for (var i = 0; i < size; i++) {
              let tmp = data[i]
              tableArr.push({
                autoKey: tmp.autoKey,
                userName: tmp.userName,
                userGender: tmp.userGender,
                userAge: tmp.userAge,
                userOccupation: tmp.userOccupation,
                userEducation: tmp.userEducation,
                mathTime: tmp.mathTime * 5,
                fatigueDegree: tmp.fatigueDegree,
                vValue: tmp.vvalue,
                rightNumber: tmp.rightNumber,
                wrongNumber: tmp.wrongNumber,
                divValue: tmp.divValue
              })
            }
            this.tableData = tableArr
          }
        })
        .catch((err) => {
          //请求失败就会捕获报错信息
          //err.response可拿到服务器返回的报错数据
          console.log(err)
        })
    },
    // 表头样式设置
    headClass() {
      return 'text-align: center;background:rgb(24,106,121);color:white;border-bottom:transparent'
    },
    // 表格样式设置
    rowClass() {
      return 'text-align: center;color:black;'
    }
  },
  mounted: function () {
    this.getData()
  }
}
</script>

<style scoped>
.main {
  display: flex;
  height: 100%;
  width: 100%;
  border: transparent;
}

/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell {
  background-color: transparent;
}

/deep/ .el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: transparent;
}

/deep/ .el-table th.el-table__cell > .cell.highlight {
  color: #18BAAF;
}

/deep/ .el-icon-arrow-down:before {
  content: "\E6DF";
  color: white;
}
</style>
