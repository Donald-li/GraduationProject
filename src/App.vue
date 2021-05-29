<template>
  <div id="app" :style="appstyle">
    <el-container>
      <el-header>
        <Nav/>
      </el-header>
      <el-main class="el-main">
        <router-view class="main_view"/>
        <router-view name="admin_view" class="admin_view"/>
      </el-main>
      <el-footer style="text-align: center;color: #ffffff"><h5 style="background-color: #D9ECFF;">©2021 HurgHart Corporation. All rights reserved.</h5></el-footer>
    </el-container>
  </div>
</template>

<script>
import Nav from "./components/Nav";

export default {
  name: 'App',
  components: {
    Nav
  },
  date(){
    return{
      appstyle:{
        backgroundImage: "url(" + require("../static/images/beijing.jpg") + ")",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.el-main{
  text-align: center;
}
.main_view{
  width: 80%;
  padding-left: 10%;
}
</style>
