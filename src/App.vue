<template>

  <div id="app">

    <el-container>
      <el-header class="test">
        <el-menu

          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border-bottom: 2px solid #fff;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <el-menu-item index="0">
            <div class="logo">
            <el-row :gutter="6">
              <el-col :span="8">
                <el-image :src=LogoUrl style="width: 50px"></el-image>
              </el-col>
              <el-col :span="10">
                <span>疲劳测试实验</span>
              </el-col>
            </el-row>
            </div>
          </el-menu-item>
          <el-menu-item index="1" @click="toMonitor">实时监测</el-menu-item>
          <el-menu-item index="2" @click="toResult">数据采集</el-menu-item>

          <el-menu-item index="3">
            <Test></Test>
          </el-menu-item>
        </el-menu>
      </el-header>


      <el-container>
        <el-aside width="220px">

          <div>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              style=" height: 100vh;"
              active-text-color="#ffd04b">

              <el-menu-item index="1" @click="toSingle">
                <i class="el-icon-location"></i>
                <span slot="title">单通道</span>
              </el-menu-item>

              <el-menu-item index="2" @click="toMulti">
                <i class="el-icon-menu"></i>
                <span slot="title">多通道</span>
              </el-menu-item>

              <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">环境模拟</span>
              </el-menu-item>

            </el-menu>
          </div>

        </el-aside>


        <el-main>
          <el-card style="width: 1430px;height: 900px">
            <router-view></router-view>
          </el-card>
        </el-main>

      </el-container>
    </el-container>

  </div>


</template>

<script>
import Test from "./components/Test";
import Logo from "./assets/logo.png"

export default {
  name: 'App',
  components: {Test},
  data() {
    return {
      LogoUrl: Logo,
      activeIndex: '1',
    };
  },
  methods: {
    toSingle() {
      this.$router.push('/single');
    },
    toMulti() {
      this.$router.push('/multi');
    },
    toMonitor() {
      const hash = location.hash;
      const match = hash.match(/^#\/(\w+)/);
      if (match) {
        const chatPath = match[1]
        this.$router.push('/' + chatPath + '/monitor');
      }
    },
    toResult() {
      const hash = location.hash;
      const match = hash.match(/^#\/(\w+)/);
      if (match) {
        const chatPath = match[1]
        this.$router.push('/' + chatPath + '/result');
      }
    },
  }
}
</script>

<style>
.test {
  padding: 0 !important;
}
.logo{
  width: 200px;
  font-weight: bold;
  font-size: large;
}
</style>
