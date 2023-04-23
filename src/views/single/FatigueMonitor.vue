<template>

  <el-row>

    <el-col :span="10">
      <div shadow="always" class="left">
        <FatigueVideo></FatigueVideo>
      </div>
    </el-col>

    <el-col :span="10">
      <el-card shadow="always" class="right">
        <WaveVideo></WaveVideo>
      </el-card>
    </el-col>

    <el-col :span="24" style="display: flex;justify-content: center">
      <el-card shadow="always" style="width: 1400px;height: 330px;margin-top: 25px">
        <div class="fatigue">
          <FatigueDegree></FatigueDegree>
        </div>
      </el-card>
    </el-col>

  </el-row>

</template>

<script>
import DataTable from "../../components/DataTable";
import FatigueDegree from "../../components/FatigueDegree";
import WaveVideo from "../../components/WaveVideo";
import FatigueVideo from "../../components/FatigueVideo";

export default {
  name: "FatigueMonitor",
  components: {FatigueDegree, DataTable, WaveVideo, FatigueVideo},
  data() {
    return {}
  }
}
</script>

<style scoped>

.left {
  background-image: url('../src/assets/ui/monitor/④左.png');
  width: 650px;
  height: 440px;
}

.right {
  width: 650px;
  height: 440px;
  margin-left: 150px
}

.fatigue {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
