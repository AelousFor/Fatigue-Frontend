<template>

  <div>

    <div style="display: flex;justify-content: center;margin-top: 10px">
      <el-row>
        <el-col :span="12">
          <div class="left">
            <FatigueWave></FatigueWave>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right">
            <HeadWave></HeadWave>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="under">
      <FatigueDegree></FatigueDegree>
    </div>

  </div>

</template>

<script>
import DataTable from "../../components/DataTable";
import FatigueDegree from "../../components/FatigueDegree";
import HeadWave from "../../components/HeadWave";
import FatigueWave from "../../components/FatigueWave";

export default {
  name: "FatigueMonitor",
  components: {FatigueDegree, DataTable, FatigueWave, HeadWave},
  data() {
    return {}
  }
}
</script>

<style scoped>

.left {
  display: flex;
  justify-content: center;
  background-image: url('../../assets/ui/monitor/ml.png');
  background-size: 100%;
  width: 650px;
  height: 442px;
}

.right {
  display: flex;
  justify-content: center;
  background-image: url('../../assets/ui/monitor/mr.png');
  background-size: 100%;
  width: 650px;
  height: 437px;
  margin-left: 40px;
}

.under {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  width: 1400px;
  height: 394px;
  background-image: url('../../assets/ui/monitor/mu.png');
  background-size: 100%;
}

</style>
