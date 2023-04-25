<template>

  <div>
    <el-table
      :data="tableData"
      :cell-style="{borderColor:'#139189'}"
      :header-cell-style="{borderColor:'#18BAAF',color:'#25C4B9'}"

      class="table-body">
      <el-table-column class="table-header"
                       prop="th"
                       label="测试次序"
                       width="180">
      </el-table-column>
      <el-table-column class="table-header"
                       prop="reactionTime"
                       label="反应总时间(ms)"
                       width="180">
      </el-table-column>
      <el-table-column class="table-header"
                       prop="totalCount"
                       label="总答题数"
                       width="180">
      </el-table-column>
      <el-table-column class="table-header"
                       prop="rightCount"
                       label="正确答题数">
      </el-table-column>
      <el-table-column class="table-header"
                       prop="wrongCount"
                       label="错误答题数">
      </el-table-column>
      <el-table-column class="table-header"
                       prop="rightRatio"
                       label="正确率">
      </el-table-column>
      <el-table-column class="table-header"
                       prop="reactionTimeDiv"
                       label="反应时间标准差(ms)">
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
import Test from "./Test";
import {mapGetters, mapState} from "vuex";

export default {
  name: "DataTable",
  components: {
    Test
  },
  computed: {
    ...mapState(['table']),
    ...mapGetters(['getTable'])
  },
  watch: {
    table: function () {
      this.tableData = this.$store.getters.getTable
    }
  },
  methods: {},
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
    }
  }
}
</script>

<style scoped>

.table-header {
  font-weight: bold;
}

.table-body {
  font-size: 14px;
  color: #18BAAF;
  width: 1300px;
}


/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell {
  background-color: transparent;
}

/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
/deep/ .el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: #18BAAF;
}
/deep/ .el-table th.el-table__cell {
  background-color: transparent;
}

</style>
