<template>
  <div style="overflow: auto;height: 600px">
    <div class="side_bar">
      <el-scrollbar style="height: 100%;">
        <div v-for="(f,index) in focusList"
             style="background-color: aliceblue;overflow: auto;border-radius: 3px;margin-top: 4px"
             @click="chooseReceiver(f.user.id)">
          <el-avatar class="side_item" style="margin-top: 7px" :src="f.user.img" />
          <p class="side_item">{{ f.user.name }}</p>
        </div>
      </el-scrollbar>
    </div>
    <div class="main_area" v-if="receiver!==''">
      <el-scrollbar style="height: 100%;"> <!-- 滚动条 -->

        <div v-for="(msg,index) in msgs" :key="index">

          <div v-if="msg.isReceiver===1" style="overflow: auto">
            <el-avatar class="side_item" style="margin-top: 7px" :src="img" />
            <p class="msg_text">{{ msg.body }}</p>
          </div>

          <div v-if="msg.isReceiver===2" style="overflow: auto">
            <el-avatar class="side_item" style="margin-top: 7px;float: right;margin-right: 10px" :src="img" />
            <p class="msg_text" style="float: right">{{ msg.body }}</p>
          </div>

        </div>
      </el-scrollbar>
      <el-input class="msg_input">
        <el-button class="input-btn" slot="append" icon="el-icon-s-promotion"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collect",
  props:['uid'],
  data () {
    return {
      //关注列表
      focusList:'',
      //当前接收信息的用户
      receiver:'',
      //当前发送信息的用户
      user:'',
      msgs:[
        {
          body:'你好啊！',
          isReceiver:1
        },
        {
          body:'你好！',
          isReceiver:2
        },
        {
          body:'初次见面！',
          isReceiver:1
        },
        {
          body:'初次见面！',
          isReceiver:2
        }
      ]
    }
  },
  methods: {
    //初始化关注列表
    initFocusList(){
      this.axios({
        method:'get',
        url:'/api/users/get_total_follow_user/'+this.uid
      }).then((e)=>{
        this.focusList = e.data
      })
    },
    //选择聊天用户
    chooseReceiver(uid){
      this.axios({
        method:'get',
        url:'/api/users/'+uid
      }).then((e)=>{
        this.receiver = e.data
      })
    },
    //初始化当前发送信息的用户
    initUser(){
      this.axios({
        method:'get',
        url:'/api/users/'+this.uid
      }).then((e)=>{
        this.user = e.data
      })
    }
  },
  mounted() {
    this.initFocusList()
    this.initUser()
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
  height: 560px;
  width: 69%;
  /*background-color: aliceblue;*/
  border: #409EFF;
  border-radius: 10px;
  /*position: fixed;*/
  /*right: 190px;*/
}
.side_item{
  float: left;
  margin-left: 10px;
}
.msg_input{
  position: fixed;
  width: 765px;
  /*float: right;*/
  right: 165px;
}
.msg_text{
  text-align: center;
  float: left;
  height: 25px;
  width: auto;
  min-width: 20px;
  margin-left: 10px;
  background-color: #409EFF;
  border-radius: 5px;
}
</style>
