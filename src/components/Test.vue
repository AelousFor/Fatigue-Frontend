<template>

  <div>
    <div style="text-align: center">
      <el-tooltip class="item" effect="light" placement="right">
        <div slot="content">进行数学测试，<br/>更新“实时监测”与“数据采集”页面所展示的数据</div>
        <el-button type="text" icon="el-icon-edit" @click="selectVisible = true" style="color: white">开始测试
        </el-button>
      </el-tooltip>
    </div>


    <el-dialog
      title="请选择数学测试时间(分钟)"
      :visible.sync="selectVisible"
      width="30%"
      :before-close="handleClose">

      <el-input v-model="selectTime" placeholder="请输入测试时间/min"></el-input>
      <div style="display: flex;justify-content: center">

        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="start" class="buttons">下 一 步</el-button>
        </span>

      </div>
    </el-dialog>


    <el-dialog
      title="疲劳度调查"
      :visible.sync="tiredVisible"
      width="30%"
      :before-close="handleClose">

      <div class="block">
        <span class="text">请滑动下方进度条确认你的疲劳程度</span>
        <el-slider v-model="tiredDegree" :format-tooltip="formatTooltip"></el-slider>
      </div>

      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="dialogChange" class="buttons">
         下 一 步
       </el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="两位数加减法测试"
      :visible.sync="mathVisible"
      width="30%"
      :before-close="handleClose">


      <div style="text-align: center;font-size: 30px">
        <el-statistic @finish="mathTime" :value="mathLine" time-indices
                      title="倒计时结束后进入下一轮测试" class="text"></el-statistic>
        <br>
        <span class="text">{{ num1 }} {{ roll }}</span>
        <span class="text">{{ num2 }} =</span>
      </div>

      <br>
      <br>

      <el-input v-model="input" placeholder="请输入结果" @keyup.enter.native="getNewNumbers(input)"></el-input>
      <span slot="footer" class="dialog-footer">
           <el-button type="primary" @click="getNewNumbers(input)" class="buttons">下一题</el-button>
      </span>


    </el-dialog>

    <el-dialog
      title="放松时间"
      :visible.sync="leisureVisible"
      width="30%"
      :before-close="handleClose">

      <div style="width: 100%; display: inline-block; ">
        <el-statistic @finish="leisureTime" :value="leisureLine" time-indices title="倒计时结束后进入下轮测试">
        </el-statistic>
      </div>

    </el-dialog>

    <el-dialog
      title="测试结果"
      :visible.sync="resVisible"
      width="80%"
      :before-close="handleClose">

      <span class="text">V:  ①{{ V[0] }}  ②{{ V[1] }}  ③{{ V[2] }}  ④{{ V[3] }}  ⑤{{ V[4] }}</span>

      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="th"
          label="测试次序"
          width="180">
        </el-table-column>
        <el-table-column
          prop="reactionTime"
          label="反应总时间(ms)"
          width="180">
        </el-table-column>
        <el-table-column
          prop="totalCount"
          label="总答题数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rightCount"
          label="正确答题数">
        </el-table-column>
        <el-table-column
          prop="wrongCount"
          label="错误答题数">
        </el-table-column>
        <el-table-column
          prop="rightRatio"
          label="正确率">
        </el-table-column>
        <el-table-column
          prop="reactionTimeDiv"
          label="反应时间标准差(ms)">
        </el-table-column>
      </el-table>


      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="insertVisible=true" class="buttons">存 入 数 据</el-button>
        <el-button type="primary" @click="sendData" class="buttons">结 束</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="信息录入"
      :visible.sync="insertVisible"
      width="30%"
      :before-close="handleClose">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.region" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.userAge"></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input v-model="form.userOccupation"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="form.userEducation" placeholder="请选择学历">
            <el-option label="小学" value="小学"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="insertData" class="buttons">录入</el-button>
          <el-button type="primary" @click="insertVisible=false" class="buttons">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>

</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "Test",
  computed: {
    ...mapState(['fatigue', 'vvalue', 'table']),
    ...mapMutations(['setData'])
  },
  data() {
    return {
      tableData: [{
        th: 1,
        reactionTime: 0,
        totalCount: 0,
        rightCount: 0,
        wrongCount: 0,
        rightRatio: 0,
        reactionTimeDiv: 0,
      }, {
        th: 2,
        reactionTime: 0,
        totalCount: 0,
        rightCount: 0,
        wrongCount: 0,
        rightRatio: 0,
        reactionTimeDiv: 0,
      }, {
        th: 3,
        reactionTime: 0,
        totalCount: 0,
        rightCount: 0,
        wrongCount: 0,
        rightRatio: 0,
        reactionTimeDiv: 0,
      }, {
        th: 4,
        reactionTime: 0,
        totalCount: 0,
        rightCount: 0,
        wrongCount: 0,
        rightRatio: 0,
        reactionTimeDiv: 0,
      }, {
        th: 5,
        reactionTime: 0,
        totalCount: 0,
        rightCount: 0,
        wrongCount: 0,
        rightRatio: 0,
        reactionTimeDiv: 0,
      }],

      selectVisible: false,
      selectTime: 0,
      mathLine: Date.now() + this.selectTime * 1000 * 60,
      leisureLine: Date.now() + 1000 * 30,
      tiredDegree: 0,
      tiredRes: [],
      mathTimes: 0,
      V: [0, 0, 0, 0, 0],

      input: '',
      roll: '+',
      insertVisible: false,
      tiredVisible: false,
      mathVisible: false,
      resVisible: false,
      leisureVisible: false,
      counts: [0, 0, 0, 0, 0],
      currentTime: (new Date()).valueOf(),
      div: [0, 0, 0, 0, 0],
      resTimes: [],
      totalResTime: [0, 0, 0, 0, 0],
      aveTime: [0, 0, 0, 0, 0],
      right: [0, 0, 0, 0, 0],
      wrong: [0, 0, 0, 0, 0],
      ratio: [0, 0, 0, 0, 0],
      num1: Math.floor((Math.random() * 100) + 1),
      num2: Math.floor((Math.random() * 100) + 1),

      form: {
        userName: "",
        userGender: "",
        userAge: 0,
        userOccupation: "",
        userEducation: "",
      }
    };
  },
  methods: {
    insertData() {
      //get或者post , api为接口地址
      this.$axios({
        method: 'post',
        url: 'http://127.0.0.1:9876/user/insert',
        data: {
          userName: this.form.userName,
          userGender: this.form.userGender,
          userAge: this.form.userAge,
          userOccupation: this.form.userOccupation,
          userEducation: this.form.userEducation,
          mathTime: this.selectTime,
          fatigueDegree: this.tiredRes.toString(),
          vValue: this.V.toString(),
          rightNumber: this.right.toString(),
          wrongNumber: this.wrong.toString(),
          divValue: this.div.toString()
        },
      })
        .then((res) => {
          if (res.data.code === "200") {
            this.$message({
              message: '录入成功',
              type: 'success'
            });
            this.insertVisible = false
          } else {
            this.$message.error('录入失败，请检查信息后重试');
          }
        })
        .catch((err) => {
          //请求失败就会捕获报错信息
          //err.response可拿到服务器返回的报错数据
          console.log(err)
          this.$message.error('接口请求错误');
        })
    },
    start() {
      this.selectVisible = false
      this.tiredVisible = true
    },
    sendData() {
      this.$store.commit('setData', {fatigue: this.tiredRes, vvalue: this.V, table: this.tableData})
      this.resVisible = false
    },
    getNewNumbers(input) {

      var tmp = this.currentTime
      this.getTime()
      var tmpRes = this.currentTime - tmp
      this.resTimes.push(tmpRes)
      var index = this.mathTimes
      this.counts[index]++

      if (this.roll == '+' && this.num1 + this.num2 == input) {
        //加法运算
        this.right[index]++
      } else if (this.num1 - this.num2 == input) {
        //减法运算
        this.right[index]++
      } else {
        this.wrong[index]++
      }
      this.input = ''
      this.randomNum()

      this.num1 = Math.floor((Math.random() * 100) + 1)
      this.num2 = Math.floor((Math.random() * 100) + 1)

    },
    randomNum() {
      // 生成1-100的随机数
      var randomNum = Math.floor(Math.random() * 100) + 1;

      // 判断奇偶性
      if (randomNum % 2 == 0) {
        this.roll = '+'
      } else {
        this.roll = '-'
      }
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    getTime() {
      this.currentTime = (new Date()).valueOf()
    },
    formatTooltip(val) {
      return val / 100;
    },
    leisureTime() {
      this.leisureVisible = false
      this.tiredVisible = true
    },
    mathTime() {

      var index = this.mathTimes
      var number = this.counts[index]

      var tmps = this.resTimes
      for (var i = 0; i < number; i++) {
        this.totalResTime[index] += tmps[i]
      }
      var ave = this.totalResTime[index] / number
      this.aveTime[index] = ave
      var divs = 0
      for (var j = 0; j < number; j++) {
        divs += ((tmps[j] - ave) * (tmps[j] - ave))
      }
      this.div[index] = Math.sqrt(divs / number)
      this.ratio[index] = this.right[index] / number

      this.tableData[index].reactionTime = this.totalResTime[index]
      this.tableData[index].reactionTimeDiv = this.div[index].toFixed(3)
      this.tableData[index].rightCount = this.right[index]
      this.tableData[index].rightRatio = this.ratio[index].toFixed(3)
      this.tableData[index].totalCount = this.counts[index]
      this.tableData[index].wrongCount = this.wrong[index]

      this.getRes();
      this.watchMathTimes()

      this.mathTimes++
      this.resTimes = []
    },
    getRes() {
      var index = this.mathTimes
      var tmp = parseInt(this.tiredDegree) * 0.01

      if (index == 0) {
        this.V[0] = (0.2 - (0.2 * (1 - tmp))).toFixed(3)
      } else {
        var S2 = this.right[index] / this.right[0] * this.aveTime[0] / this.aveTime[index]
        this.V[index] = (1 - (S2 * 0.8 + (1 - tmp) * 0.2)).toFixed(3)
      }
    },
    dialogChange() {
      this.tiredRes.push(parseInt(this.tiredDegree) * 0.01)
      this.tiredVisible = false
      this.mathLine = Date.now() + (this.selectTime * 1000 * 60)
      this.mathVisible = true
      this.getTime()
    },
    watchMathTimes() {
      if (this.mathTimes == 3) {
        this.leisureLine = Date.now() + 1000 * 30
        this.mathVisible = false
        this.leisureVisible = true
      } else if (this.mathTimes == 4) {
        this.mathVisible = false
        this.resVisible = true
      } else {
        this.mathVisible = false
        this.tiredVisible = true
      }
    }
  }
}
</script>

<style scoped>


.buttons {
  background-color: #18BAAF
}

/deep/ .el-slider__bar {
  background-color: #18BAAF;
}

/deep/ .el-slider__button {
  border: 2px solid #18BAAF;
}


</style>
