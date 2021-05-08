<template>
  <div id="app">
    <el-container>
      <el-header>
        <Nav/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer style="text-align: center;color: #ffffff"><h2 style="background-color: #D9ECFF;">Footer</h2></el-footer>
    </el-container>

    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    <Test/>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Test from "./components/Test";

export default {
  name: 'App',
  components: {
    Test,
    Nav
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
</style>
