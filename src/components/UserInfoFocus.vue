<template>
  <div>
    <h3>已关注用户</h3>
    <el-table :data="focus" class="blocks_table">
      <el-table-column class="col" width="250"  prop="img" label="用户头像">
                <template slot-scope="scope">
                  <el-avatar :size="large" :src="scope.row.user.img"></el-avatar>
                </template>
      </el-table-column>
      <el-table-column class="col" width="250"  prop="name" label="用户昵称">
        <template slot-scope="scope">
          <span>{{scope.row.user.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="ac-btn"
            size="mini"
            @click="handleEdit(scope.id, scope.row)">编辑</el-button>
          <el-button
            class="ac-btn"
            size="mini"
            type="danger"
            @click="handleDelete(scope.id, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      hide-on-single-page
      :page-size="6"
      :total="pageTotal">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Focus",
  props:['userid'],
  data(){
    return{
      pageTotal:1,
      focus:''
    }
  },
  methods:{
    getFollowers(){
      this.axios({
        method:"get",
        url:"/api/users/get_follow_user/"+this.userid
      }).then((e)=>{
        this.focus = e.data
      })
    }
  },
  mounted() {
    this.getFollowers()
  }
}
</script>

<style scoped>
.page{
  margin-top: 7px;
}
.ac-btn{
  float: left;
}
</style>
