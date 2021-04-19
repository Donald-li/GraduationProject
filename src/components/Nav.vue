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
      <el-menu-item index="/index">
        主页
      </el-menu-item>
<!--      热点-->
      <el-menu-item index="/hot">
        热点
      </el-menu-item>
<!--      空白-->
      <el-menu-item class="blocks" index="0" disabled>

      </el-menu-item>
<!--      头像-->
      <el-menu-item index="/userInfo">
        <el-tooltip class="item" effect="dark" content="个人信息" placement="bottom">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="large" :src="avatar">登录</el-avatar>
            </div>
          </div>
        </el-tooltip>
      </el-menu-item>

<!--  消息-->
      <el-menu-item index="/messagePage" @click="cleanmsg()">
        <el-badge id="msg" :value="messageNumb" :max="99" class="item" :hidden="ishidden_msg">
          <div>消息</div>
        </el-badge>
      </el-menu-item>
<!--      回复-->
      <el-menu-item index="/reply" @click="cleanres()">
        <el-badge id="resbonse" v-model="res" :max="99" class="item" :hidden="ishidden_res">
          <div>回复</div>
        </el-badge>
      </el-menu-item>
<!--      收藏-->
      <el-menu-item index="/collect">
        <el-popover trigger="hover" width="200px">
          <el-table :data="gridData">
            <el-table-column width="150" property="date" label="日期"></el-table-column>
            <el-table-column width="100" property="name" label="姓名"></el-table-column>
          </el-table>
          <div slot="reference">收藏</div>
        </el-popover>
      </el-menu-item>
<!--      关注-->
      <el-menu-item index="/focus">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageNumb:123,
      ishidden_msg:false,
      ishidden_res:false,
      avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      res:12,
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
      }]
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
