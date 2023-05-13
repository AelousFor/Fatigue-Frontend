<template>
  <div class="main">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="用户名"
        style="width: 10%">
      </el-table-column>
      <el-table-column
        prop="userGender"
        label="性别"
        style="width: 5%">
      </el-table-column>
      <el-table-column
        prop="userAge"
        label="年龄"
        style="width: 5%">
      </el-table-column>
      <el-table-column
        prop="userOccupation"
        label="职业"
        style="width: 10%">
      </el-table-column>
      <el-table-column
        prop="userEducation"
        label="学历"
        style="width: 10%">
      </el-table-column>
      <el-table-column
        prop="mathTime"
        label="测试时间/次"
        style="width: 10%">
      </el-table-column>
      <el-table-column
        prop="fatigueDegree"
        label="疲劳程度"
        style="width: 10%">
      </el-table-column>
      <el-table-column
        prop="vValue"
        label="V值"
        style="width: 10%">
      </el-table-column>
      <el-table-column
        prop="rightNumber"
        label="正确题数"
        style="width: 10%">
      </el-table-column>
      <el-table-column
        prop="divValue"
        label="标准差"
        style="width: 10%">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DataBase",
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },]
    }
  },
  methods: {
    getData() {
      //get或者post , api为接口地址
      this.$axios({
        method: 'get',
        url: 'http://127.0.0.1:8086/get/image',
        params: {
          //get这里应为params
          //请求参数
        },
        //withCredentials:true, //局部携带cookie
        headers: {}, //如果需要添加请求头可在这写
      })
        .then((res) => {
          //res是返回结果
          //你的下一步操作 例:
          let data = res.data
          let size = data.length
          if (this.resultImgs.length > 0) {
            this.resultImgs = []
          }
          for (var i = 0; i < size; i++) {
            var str12 = this.arrayBufferToBase64(data[i])
            var outputImg = document.createElement('png')
            outputImg.src = 'data:image/png;base64,' + str12
            this.resultImgs.push(outputImg.src)
          }
        })
        .catch((err) => {
          //请求失败就会捕获报错信息
          //err.response可拿到服务器返回的报错数据
          console.log(err)
        })
    },
  },
  mounted() {

  }
}
</script>

<style scoped>
.main {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
