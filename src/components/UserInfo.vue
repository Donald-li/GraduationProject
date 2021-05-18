<template>
  <div>
<!--    <h1>这是个人信息页面</h1>-->
<!--    信息卡片头-->
    <el-card class="box-card" shadow="hover" style="text-align: center">
<!--      头像-->
      <div class="demo-basic--circle avatar">
        <div class="block"><el-avatar :size="150" :src="user.img"></el-avatar></div>
      </div>
      <h1 style=" color: white">{{user.name}}</h1>
    </el-card>

    <el-divider/>

    <el-card class="body_card" shadow="hover">
      <el-row class="tac">
        <el-col>
          <el-menu
            :default-active="$router.currentRoute.path"
            class="el-menu-vertical-demo"
            :router="true">
            <el-menu-item class="el-menu-item"  :index="'/userInfo/'+user.id+'/detail/'+user.id" exact>
              <i class="el-icon-menu"></i>
              <span slot="title">详细信息</span>
            </el-menu-item >
            <el-menu-item class="el-menu-item"  :index="'/userInfo/'+user.id+'/articles/'+user.id">
              <i class="el-icon-document"></i>
              <span slot="title">文章管理</span>
            </el-menu-item>
            <el-menu-item class="el-menu-item"  :index="'/userInfo/'+user.id+'/focus/'+user.id">
              <i class="el-icon-view"></i>
              <span slot="title">关注列表</span>
            </el-menu-item>
            <el-menu-item class="el-menu-item"  :index="'/userInfo/'+user.id+'/stars/'+user.id">
              <i class="el-icon-star-off"></i>
              <span slot="title">收藏列表</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <router-view name="UserInfoDetail" class="userInfoDetail"/>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props:['id'],
  data() {
    return {
      user: {
        account: '001',
        name: 'Donald lee',
        rule: 0,
        img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      },
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //获取个人资料
    getInfo(){
      this.axios({
        method:'get',
        url:'/api/users/'+this.id
      }).then((e)=>{
        this.user = e.data
      })
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
.userInfoDetail{
  width: 70%;
  float: right;
  text-align: left;
}
.el-menu-item{
  height: 80px;
}
.el-menu-vertical-demo{
  width: 100%;
}
.tac{
  width: 25%;
  float: left;
}
.info_area{
  /*float: left;*/
  margin-top: 5px;
  margin-left: 0px;
  text-align: left;
}
.avatar{
}
.box-card,.info_area_box{
  overflow: auto;
  background-image: url("../../static/images/背景1.jpg");
  background-size:100%,100%;
  background-repeat: no-repeat;
}
.info_area_box{
  float: left;
  margin-left: 20px;
}
.body_card{
  min-height: 500px;
}
</style>
