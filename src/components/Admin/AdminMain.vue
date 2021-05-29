<template>
  <div>

    <el-container style="width: 100%;min-height: 600px">

      <el-aside width="400px">

        <h3>后台管理工具</h3>

        <el-menu router="true">

          <el-menu-item :index="'/admin/users'">

            <i class="el-icon-setting"></i>

            <span slot="title">用户概览</span>

          </el-menu-item>

          <el-menu-item :index="'/admin/roles'">

            <i class="el-icon-setting"></i>

            <span slot="title">角色管理</span>

          </el-menu-item>

          <el-menu-item :index="'/admin/articles'">

            <i class="el-icon-setting"></i>

            <span slot="title">文章管理</span>

          </el-menu-item>
          <el-menu-item :index="'/admin/comments'">

            <i class="el-icon-setting"></i>

            <span slot="title">评论管理</span>

          </el-menu-item>
<!--          <el-menu-item index="/user/permission">-->

<!--            <i class="el-icon-setting"></i>-->

<!--            <span slot="title">消息管理</span>-->

<!--          </el-menu-item>-->

        </el-menu>

      </el-aside>

      <el-container>

        <el-main>

          <router-view name="admin_detail"></router-view>

        </el-main>

      </el-container>

    </el-container>

  </div>
</template>

<script>
export default {
  name: "AdminMain",
  data(){
    return{
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>

<style scoped>

.el-menu-item{
  padding-top: 14px;
  height: 80px;
}
</style>
