<template>
  <!--  页头-->
  <div id="head">
    <ul>
      <li class="title_li" @click="gotoActice">
        <el-avatar class="title_icon" icon="el-icon-chat-dot-round"></el-avatar>
        <span class="title_span">动态</span>
      </li>
      <li class="title_li" @click="gotoFocus">
        <a href="#">
          <!--          <i class="el-icon-chat-dot-round title_icon"></i>-->
          <el-avatar class=" title_icon" icon="el-icon-star-off"></el-avatar>
          <span class="title_span">收藏</span>
        </a>
      </li>
      <li class="title_li" @click="gotoStar">
        <a href="#">
          <!--          <i class="el-icon-chat-dot-round title_icon"></i>-->
          <el-avatar class=" title_icon" icon="el-icon-thumb"></el-avatar>
          <span class="title_span">关注</span>
        </a>
      </li>
    </ul>

    <ul>
      <li class="title_li" v-for="t in blocks" @click="gotoSection(t.title,t.text)">
        <a :href="'#'"><span class="title_span_2">{{ t.text }}</span></a>
      </li>
    </ul>

    <!--搜索框-->
    <el-input class="input-with-select" v-model="searcharray" placeholder="搜索内容">
      <el-button class="input-btn" slot="append" icon="el-icon-search" @click="search(searcharray)"></el-button>
    </el-input>

  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      blocks:[
        {
          title:1,
          text:'电影'
        },
        {
          title:2,
          text:'游戏'
        },
        {
          title:3,
          text:'音乐'
        },
        {
          title:4,
          text:'舞蹈'
        },
        {
          title:5,
          text:'美食'
        },
        {
          title:6,
          text:'动漫'
        },
      ],
      //搜索条件
      searcharray:''
    }
  },
  methods:{
    search(array){
      this.$router.push('/search/'+array)
    },
    gotoActice(){
      this.$router.push("/active/"+this.$session.get("user_id"))
    },
    gotoFocus(){
      this.$router.push("/userInfo/"+this.$session.get("user_id")+'/focus/'+this.$session.get("user_id"))
    },
    gotoStar(){
      this.$router.push("/userInfo/"+this.$session.get("user_id")+'/stars/'+this.$session.get("user_id"))
    },
    gotoSection(section,sname){
      this.$router.push("/SectionPage/"+section+'/'+sname)
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
