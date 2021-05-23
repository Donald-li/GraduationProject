<template>
  <div style="overflow: auto;height: 600px">
    <div class="side_bar">
      <el-scrollbar style="height: 100%;">
        <div v-for="(f,index) in focusList"
             style="background-color: aliceblue;overflow: auto;border-radius: 3px;margin-top: 4px"
             @click="chooseReceiver(f.id)">
          <el-avatar class="side_item" style="margin-top: 7px" :src="f.img" />
          <p class="side_item">{{ f.name }}</p>
        </div>
      </el-scrollbar>
    </div>
    <div class="main_area" v-if="receiver!==''">
      <el-scrollbar style="height: 100%;"> <!-- 滚动条 -->

        <div v-for="(msg,index) in msgs" :key="index">

          <div v-if="isReceiver(msg.user_id)" style="overflow: auto">
            <el-avatar class="side_item" style="margin-top: 7px" :src="msg.receiver.img" />
            <p class="msg_text">{{ msg.body }}</p>
          </div>

          <div v-if="!isReceiver(msg.user_id)" style="overflow: auto">
            <el-avatar class="side_item" style="margin-top: 7px;float: right;margin-right: 10px" :src="user.img" />
            <p class="msg_text" style="float: right">{{ msg.body }}</p>
          </div>
        </div>

        <p v-if="msgs.length == 0">你们还没有消息，跟他（她）打个招呼吧！</p>

      </el-scrollbar>
      <el-input class="msg_input" v-model="msgbody">
        <el-button class="input-btn" slot="append" icon="el-icon-s-promotion" @click="giveMessage"></el-button>
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
      msgs:'',
      //想要发送的消息主体
      msgbody:''
    }
  },
  methods: {
    //初始化可沟通用户列表
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
        this.initMessages()
        this.getMessageBytime()
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
    },
    //初始化选定的接收用户的沟通信息
    initMessages(){
      this.axios({
        method:'get',
        url:'/api/users/get_messages_two_user/'+this.user.id+'/'+this.receiver.id
      }).then((e)=>{
        this.msgs = e.data
      })
    },
    //判断消息是否为当前登陆用户所发
    isReceiver(id){
      if(id === this.user.id){
        return true
      }else{
        return false
      }
    },
    //发送消息方法
    giveMessage(){
      this.axios({
        method:'post',
        url:'/api/users/create_message',
        data:{
          uid:this.user.id,
          rid:this.receiver.id,
          body:this.msgbody
        }
      }).then((e)=>{
        if(e.data.flag === 1){
          this.initMessages()
        }else{
          this.$message.error("发送信息失败！")
        }
      })
    },
    //消息轮询
    getMessageBytime(){
      if(this.receiver!==''){
        window.setInterval(() => {
          setTimeout(this.initMessages(), 0);
        }, 3000);
      }
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
