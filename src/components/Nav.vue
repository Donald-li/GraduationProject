<template>
  <div>

    <el-menu
      :default-active="'/index'"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#409EFF"
      text-color="#FFFFFF"
      active-text-color="#FFFFFF"
      :router="true">
<!--      主页-->
      <el-menu-item index="/index" :articles="articles">
        主页
      </el-menu-item>
<!--      空白-->
<!--&lt;!&ndash;      <el-menu-item class="blocks" index="0" disabled>&ndash;&gt;</el-menu-item>-->
      <!--     头像 未登录-->
      <el-menu-item v-if="currect_user===0" @click="dialogFormVisible = true">
        <el-tooltip class="item" effect="dark" :content="userinfo" placement="bottom">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="large">登录</el-avatar>
            </div>
          </div>
        </el-tooltip>
      </el-menu-item>
      <!--      头像 登录-->
      <el-menu-item v-if="currect_user!==0" :index="'/userInfo/'+loginuser.id">
        <el-tooltip class="item" effect="dark" :content="userinfo" placement="bottom">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="large" :src="loginuser.img">登录</el-avatar>
            </div>
          </div>
        </el-tooltip>
      </el-menu-item>

<!--  动态-->
      <el-menu-item v-if="currect_user!==0" index="/activePage" @click="cleanmsg()">
        <el-badge id="active" :value="messageNumb" :max="99" class="item" :hidden="ishidden_msg">
          <div>动态</div>
        </el-badge>
      </el-menu-item>
<!--&lt;!&ndash;      回复&ndash;&gt;-->
<!--      <el-menu-item v-if="currect_user!==0" index="/reply" @click="cleanres()">-->
<!--        <el-badge id="resbonse" v-model="res" :max="99" class="item" :hidden="ishidden_res">-->
<!--          <div>回复</div>-->
<!--        </el-badge>-->
<!--      </el-menu-item>-->
<!--      收藏-->
      <el-menu-item v-if="currect_user!==0" index="/collect">
        <el-popover trigger="hover" width="200px">
          <el-table :data="gridData">
            <el-table-column width="150" property="date" label="日期"></el-table-column>
            <el-table-column width="100" property="name" label="姓名"></el-table-column>
          </el-table>
          <div slot="reference">收藏</div>
        </el-popover>
      </el-menu-item>
<!--      关注-->
      <el-menu-item v-if="currect_user!==0" index="/focus">
        <el-popover trigger="hover" width="200px">
          <el-table :data="gridData">
            <el-table-column width="150" property="date" label="日期"></el-table-column>
            <el-table-column width="100" property="name" label="姓名"></el-table-column>
          </el-table>
          <div slot="reference">关注</div>
        </el-popover>
      </el-menu-item>
    </el-menu>
<!--    <router-view/>-->
    <!--登陆框-->
          <el-dialog title="登陆" :visible.sync="dialogFormVisible" :width="formLabelWidth">
            <el-form :model="form">
              <el-form-item label="账号：" :width="formLabelWidth">
                <el-input v-model="form.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码：" :width="formLabelWidth">
                <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <router-link to="/createuser"><el-button type="danger" @click="dialogFormVisible = false">注 册</el-button></router-link>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false" v-on:click="login()">确 定</el-button>
            </div>
          </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {

      //登陆用户对象
      loginuser:'',
      //获取到的用户所属的文章
      user_articles:'',
      //登陆框默认不显示
      dialogFormVisible: false,
      //登陆框输入框长度
      formLabelWidth: '400px',
      //登陆记录
      currect_user:0,
      //消息数
      messageNumb:0,
      //头像提示信息
      userinfo:'点击登陆',
      ishidden_msg:false,
      ishidden_res:false,
      avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      //评论数
      res:0,
      input: '',
      gridData: [{
        date: '2016-05-02',
        name: '王小虎'
      }, {
        date: '2016-05-04',
        name: '王小虎'
      }, {
        date: '2016-05-01',
        name: '王小虎'
      }, {
        date: '2016-05-03',
        name: '王小虎'
      }],
      form: {
        account:'',
        password:'',
      },
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    cleanmsg(){
      this.ishidden_msg = true;
    },
    cleanres(){
      this.ishidden_res = true;
    },
    //登陆方法
    login(){
      this.axios({
        method:'post',
        url:'/api/users/login',
        data:{
          account: this.form.account,
          password: this.form.password
        }
      }).then((response)=>{
        if(response.data.msg==null){
          this.loginuser = response.data.user
          this.currect_user = response.data.account
          this.userinfo = "欢迎，"+response.data.user.name+"！"
          this.user_articles = response.data.user_articles
        }else{
          alert(response.data.msg)
        }
      })
    },
    goto(url){
      this.$route.push(url)
    }
  },
  mounted() {
    if(this.messageNumb===0){
      this.ishidden_msg=true
    }
    if(this.res===0){
      this.ishidden_res=true
    }
  }
}
</script>

<style>
  .blocks{
    width: 1200px;
  }
  .item{
    z-index: 1;
  }
</style>
