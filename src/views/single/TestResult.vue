<template>

  <div>

    <div style="display: flex;justify-content: center;margin-top: 10px">
      <el-row>

        <el-col :span="12">
          <div class="left">
            <el-image :src=imgUrl style="width: 75%"></el-image>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right">
            <VValue style="margin-top: 10px;margin-left: 10px"></VValue>
          </div>
        </el-col>

      </el-row>
    </div>

    <div class="under">
      <DataTable></DataTable>
    </div>

  </div>

</template>

<script>

import Img from "../../assets/img1.png"
import DataTable from "../../components/DataTable";
import VValue from "../../components/V-Value";

export default {
  name: "TestResult",
  components: {VValue, DataTable},
  data() {
    return {
      imgUrl: Img,
    };
  },
  methods: {}
}
</script>

<style scoped>

.left {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/ui/result/rl.png");
  background-size: 100%;
  width: 475px;
  height: 420px;
}

.right {
  display: flex;
  justify-content: center;
  background-image: url("../../assets/ui/result/rr.png");
  background-size: 100%;
  width: 700px;
  height: 420px;
}

.under {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  background-image: url("../../assets/ui/result/ru.png");
  background-size: 100%;
  width: 1350px;
  height: 319px;
}

</style>
