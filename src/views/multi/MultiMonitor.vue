<template>

  <el-row :gutter="4">

    <el-col :span="10">
      <el-card shadow="always" style="width: 650px;height: 440px">
        <FatigueVideo></FatigueVideo>
      </el-card>
    </el-col>

    <el-col :span="10">
      <el-card shadow="always" style="width: 650px;height: 440px;margin-left: 150px">
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
  name: "MultiMonitor",
  components: {FatigueDegree, DataTable, WaveVideo,FatigueVideo},
  data() {
    return {}
  }
}
</script>

<style scoped>
.fatigue {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
