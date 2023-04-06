<template>

  <el-row :gutter="4">

    <el-col :span="10">
      <el-image :src=imgUrl></el-image>
    </el-col>

    <el-col :span="10">
      <el-card shadow="always" style="width: 650px;height: 450px;margin-left: 150px">

        <el-col :span="5">
          <div class="vertical-text">
            疲劳程度实时波形
          </div>
        </el-col>

        <el-col :span="19">
          <div style="width: 100%">
            <el-image :src=waveUrl></el-image>
          </div>
        </el-col>

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
import Img from "../../assets/img1.png"
import WaveImg from "../../assets/wave1.jpg"
import DataTable from "../../components/DataTable";
import FatigueDegree from "../../components/FatigueDegree";

export default {
  name: "FatigueMonitor",
  components: {FatigueDegree, DataTable},
  data() {
    return {
      imgUrl: Img,
      waveUrl: WaveImg
    }
  }
}
</script>

<style scoped>
.vertical-text {
  writing-mode: vertical-lr; /* 竖排方向从上到下 */
  font-weight: bold;
  font-size: 24px;
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  letter-spacing: 0.5em;
}
.fatigue{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
