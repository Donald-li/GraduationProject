<template>
  <div id="outter_box">
<!--    头部分区栏-->
    <Head/>
    <el-divider></el-divider>

    <div style="overflow: auto">
      <Index_block v-for=" (title,index) in titles " :key="index" :title="title" :titleindex="index+1"></Index_block>
    </div>
    <el-divider />
    <div style="overflow: auto">
      <CreateArticle style="margin-top: 30px" :id="this.$session.get('user_id')"></CreateArticle>
    </div>
  </div>
</template>

<script>
import Head from "./Head";
import Index_block from "./Index_block";
import CreateArticle from "./CreateArticle";

export default {
  name: "index",
  components:{
    CreateArticle,
    Head,
    Index_block
  },
  data() {
    return {
      currentDate: '2021.4.20',
      titles:['电影','游戏','音乐','舞蹈','美食','动漫'],
      carousel_images:['../../static/images/NieR.jpg','../../static/images/NieR2.jpg','../../static/images/R姐.jpg','../../static/images/老虎.jpg'],
      //获取的首页文章
      index_articles:'',
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
  height: auto;
}
</style>
