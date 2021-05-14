<template>
  <!--  页头-->
  <div id="head">
    <ul>
      <li class="title_li">
        <a href="/hot">
          <!--          <i class="title_icon el-icon-message"></i>-->
          <el-avatar class="title_icon" icon="el-icon-message"></el-avatar>
          <span class="title_span">消息</span>
        </a>
      </li>
      <li class="title_li">
        <a href="#">
          <!--          <i class="el-icon-chat-dot-round title_icon"></i>-->
          <el-avatar class=" title_icon" icon="el-icon-chat-dot-round"></el-avatar>
          <span class="title_span">回复</span>
        </a>
      </li>
      <li class="title_li">
        <a href="#">
          <!--          <i class="el-icon-chat-dot-round title_icon"></i>-->
          <el-avatar class=" title_icon" icon="el-icon-chat-dot-round"></el-avatar>
          <span class="title_span">关注</span>
        </a>
      </li>
    </ul>

    <ul>
      <li class="title_li" v-for="t in blocks">
        <a :href="'#'"><span class="title_span_2">{{ t }}</span></a>
      </li>
    </ul>

    <!--搜索框-->
    <el-input class="input-with-select" placeholder="搜索内容">
      <el-button class="input-btn" slot="append" icon="el-icon-search"></el-button>
    </el-input>

  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      blocks:['电影','游戏','音乐','舞蹈','美食','动漫']
    }
  }
}
</script>

<style scoped>
#head{
  overflow: auto;
  background-color: #ECF5FF;
}
.input-with-select{
  width: fit-content;
  height: 40px;
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
.input-btn{
  height: 40px;
}
.title_li{
  width: 70px;
  height: 70px;
  border-radius: 5px;
  /*background-color: rgb(121,187,255);*/
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
  margin-left: 1px;
  list-style-type: none;
  text-align: center;
  float: left;
}
.title_span{
  float: left;
  width: 40px;
  height: 30px;
  color: #409EFF;
}
.title_icon{
  background-color: #a0cfff;
  width: 40px;
  height: 40px;
  text-align: center;
  float: left;
}
.title_span_2{
  margin-top: 20px;
  float: left;
}
</style>
