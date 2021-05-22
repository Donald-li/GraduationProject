<template>
  <div style="overflow: auto;height: 600px">
    <div class="side_bar">
      <el-scrollbar>
        <div v-for="i in 20" style="background-color: aliceblue;overflow: auto;border-radius: 3px;margin-top: 4px">
          <el-avatar class="side_item" style="margin-top: 7px" :src="img" />
          <p class="side_item">这里是用户名</p>
        </div>
      </el-scrollbar>
    </div>
    <div class="main_area">

    </div>
  </div>
</template>

<script>
export default {
  name: "Collect",
  props:['uid'],
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.side_bar{
  border-radius: 10px;
  float: left;
  height: 600px;
  width: 30%;
  /*background-color: #a0cfff;*/
}
.main_area{
  float: right;
  height: 600px;
  width: 750px;
  background-color: aliceblue;
  border: #409EFF;
  border-radius: 10px;
  position: fixed;
  right: 190px;
}
.side_item{
  float: left;
  margin-left: 10px;
}
</style>
