<template>

  <div id="app">

    <el-container>
      <el-header style=" padding: 0 !important;">
        <el-menu
          :default-active="activeIndex"
          class="header"
          mode="horizontal"
          text-color="#fff"
          active-text-color="#18BAAF"
          style="border-bottom: 2px solid  #18BAAF;box-shadow: 0 0 10px #18BAAF">
          <el-menu-item index="0">

            <div class="logo">
              <el-row :gutter="6">
                <el-col :span="6">
                  <el-image :src=LogoUrl style="width: 50px"></el-image>
                </el-col>
                <el-col :span="10">
                  <div class="title">
                    <span>疲劳测试实验</span>
                  </div>
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
              default-active="1"
              class="aside"
              text-color="#fff"
              style=" height: 925px;border-right: solid 2px #18BAAF"
              active-text-color="#18BAAF">

              <el-menu-item index="1" @click="toSingle">
                <i class="el-icon-location"></i>
                <span slot="title">单通道</span>
              </el-menu-item>

              <el-menu-item index="2" @click="toMulti">
                <i class="el-icon-menu"></i>
                <span slot="title">多通道</span>
              </el-menu-item>

              <el-menu-item index="3" @click="toDatabase">
                <i class="el-icon-s-data"></i>
                <span slot="title">历史数据</span>
              </el-menu-item>


            </el-menu>
          </div>

        </el-aside>


        <el-main style="background-color: black">
          <div class="main">
            <router-view></router-view>
          </div>
        </el-main>

      </el-container>
    </el-container>

  </div>


</template>

<script>
import Test from "./components/Test";
import Logo from "./assets/gzhu.png"

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
    toDatabase() {
      this.$router.push('/database');
    },
    toSingle() {
      const hash = location.hash;
      const match = hash.match(/^#\/(\w+)\/(\w+)/);
      if (match) {
        const chatPath = match[2]
        this.$router.push('/single' + '/' + chatPath);
      }else {
        this.$router.push('/single');
      }
    },
    toMulti() {
      const hash = location.hash;
      const match = hash.match(/^#\/(\w+)\/(\w+)/);
      if (match) {
        const chatPath = match[2]
        this.$router.push('/multi' + '/' + chatPath);
      }else {
        this.$router.push('/multi');
      }
    },
    toMonitor() {
      const hash = location.hash;
      const match = hash.match(/^#\/(\w+)/);
      if (match) {
        const chatPath = match[1]
        if (chatPath !== 'database') {
          this.$router.push('/' + chatPath + '/monitor');
        }
      }
    },
    toResult() {
      const hash = location.hash;
      const match = hash.match(/^#\/(\w+)/);
      if (match) {
        const chatPath = match[1]
        if (chatPath !== 'database') {
          this.$router.push('/' + chatPath + '/result');
        }
      }
    },
  }
}
</script>

<style>

.header {
  background-image: url('assets/ui/header.png');
  background-size: 100%;
}

.aside {
  background-image: url('assets/ui/aside.png');
  background-size: 109%;
}

.main {
  display: flex;
  justify-content: space-around;
  background-image: url('../src/assets/ui/back.png');
  background-size: 100%;
  border: #18BAAF 3px solid;
  height: 880px;
}

.title {
  display: flex;
  align-content: center;
}

.logo {
  width: 200px;
  font-weight: bold;
  font-size: large;
}

</style>
