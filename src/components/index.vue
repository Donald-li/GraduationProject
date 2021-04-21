<template>
  <div id="outter_box">
<!--    头部分区栏-->
    <Head/>
    <el-divider></el-divider>

<!--    主体部分-->
<!--    走马灯-->
    <div class="carouselbox">
      <el-carousel height="300px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
        </el-carousel-item>
      </el-carousel>
    </div>
<!--首页热点-->
    <div class="headcard">
      <div class="innercard"  v-for="index in 4">
        <img class="innercard-img" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
        <div style="padding: 4px;">
          <span>好吃的汉堡</span>
          <div>
            <time class="time">{{ currentDate }}</time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </div>
    </div>

    <el-divider class="dividers"></el-divider>

    <Index_block v-for=" (title,index) in titles " :key="index" :title="title" ></Index_block>

  </div>
</template>

<script>
import Head from "./Head";
import Index_block from "./Index_block";

export default {
  name: "index",
  components:{
    Head,
    Index_block
  },
  data() {
    return {
      currentDate: '2021.4.20',
      titles:['体育','经济','政治','地理','电影','游戏','音乐','舞蹈','美食','动漫']
    };
  }
}
</script>

<style scoped>
.dividers{
  float: left;
}
.innercard-img{
  height: 80%;
  width: 100%;
}
.innercard{
  width: 23%;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-left: 2px;
  float: left;
}
.carouselbox{
  width: 30%;
  height: 300px;
  float: left;
  overflow: auto;
}
.headcard{
  width: 68%;
  height: 300px;
  float: right;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
#outter_box{
  height: 1000px;
}
</style>
