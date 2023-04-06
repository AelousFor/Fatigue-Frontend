<template>

  <div>
  <el-table
    :data="tableData"
    border
    class="table-body"
    style="width: 100%">
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
  components:{
    Test
  },
  computed: {
    ...mapState(['table']),
    ...mapGetters(['getTable'])
  },
  watch: {
    table: function() {
      this.tableData=this.$store.getters.getTable
    }
  },
  methods:{
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
    }
  }
}
</script>

<style scoped>
.table-header {
  font-weight: bold;
  background-color: #f5f5f5;
}
.table-header .cell {
  padding: 15px;
}
.table-body {
  font-size: 14px;
}
.table-body .cell {
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
}
.table-body .row:last-child .cell {
  border-bottom: none;
}
</style>
