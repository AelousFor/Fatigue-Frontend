<template>

  <el-row :gutter="4">

    <el-col :span="10">
      <el-image :src=imgUrl style="display: flex;justify-content: center;width: 500px"></el-image>
    </el-col>

    <el-col :span="10">
      <el-card shadow="always" style="width: 800px;height: 478px">
        <VValue></VValue>
      </el-card>
    </el-col>

    <el-col :span="24" style="margin-top: 15px">
      <el-card shadow="always" style="width: 1400px;height: 330px">
        <DataTable></DataTable>
      </el-card>
    </el-col>

  </el-row>

</template>

<script>

import Img from "../../assets/img2.jpg"
import DataTable from "../../components/DataTable";
import VValue from "../../components/V-Value";

export default {
  name: "MultiResult",
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
</style>
