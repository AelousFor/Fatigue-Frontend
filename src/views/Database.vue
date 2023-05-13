<template>
  <div class="main">
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :cell-style="rowClass" :header-cell-style="headClass">
      <el-table-column
        prop="userName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="userGender"
        label="性别">
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
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DataBase",
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    getData() {
      //get或者post , api为接口地址
      this.$axios({
        method: 'get',
        url: 'http://127.0.0.1:9876/user/get',
        params: {
          //get这里应为params
          //请求参数
        },
        //withCredentials:true, //局部携带cookie
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
                userName: tmp.userName,
                userGender: tmp.userName,
                userAge: tmp.userAge,
                userOccupation: tmp.userOccupation,
                userEducation: tmp.userEducation,
                mathTime: tmp.mathTime * 5,
                fatigueDegree: tmp.fatigueDegree,
                vValue: tmp.vValue,
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
      return 'text-align: center;background:rgb(24,106,121);color:white;border-color:#18BAAF'
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
}

/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell {
  background-color: transparent;
  border-color: transparent;
}

</style>
