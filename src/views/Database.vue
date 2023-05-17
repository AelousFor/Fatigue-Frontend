<template>
  <div class="main">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :cell-style="rowClass" :header-cell-style="headClass">
      <el-table-column
        prop="userName">
        <template #header>
          <!-- 表头名称 -->
          <span> 姓名 </span>
          <!-- 自定义筛选组件 -->
          <el-popover
            placement="bottom"
            width="300"
            trigger="hover"
            popper-class="filter-table-input"
          >
            <i slot="reference" class="el-icon-search table-filter-icon" />
            <!-- content -->

              <el-input v-model="searchKey" placeholder="请输入要查询的姓名" size="mini" class="filte-input" @keydown.native.enter="handleConfirm" />

            <div style="display: flex;justify-content: flex-end;margin-top: 10px">
                <el-button plain size="mini" @click="handleClear">
                  重置
                </el-button>

                <el-button type="primary" size="mini" style="background-color: #18BAAF;border-color: #18BAAF" @click="handleConfirm">
                  确认
                </el-button>
            </div>

          </el-popover>
        </template>
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
      <i class="el-icon-delete"></i>
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


  </div>
</template>

<script>
export default {
  name: "DataBase",
  data() {
    return {
      tableData: [],
      searchKey:'',
    }
  },
  methods: {
    handleClear(){

    },
    handleConfirm(){

    },
    deleteData(index) {
      //get或者post , api为接口地址
      this.$axios({
        method: 'delete',
        url: 'http://127.0.0.1:9876/user/delete',
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
        url: 'http://127.0.0.1:9876/user/get',
        params: {
        },
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

</style>
