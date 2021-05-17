<template>
  <div>
    <h3>已关注用户</h3>
    <el-table :data="articles" class="blocks_table">
      <el-table-column class="col" width="500" label="昵称">
                <template slot-scope="scope">
                  <el-avatar :size="large" :src="user.img"></el-avatar>
                  <i class="el-icon-edit"></i>
                  <span>{{user.name}}</span>
                </template>
      </el-table-column>
      <el-table-column label="操作" prop="id">
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
  data(){
    return{
      pageTotal:1
    }
  }
}
</script>

<style scoped>
.page{
  margin-top: 7px;
}
.ac-btn{
  float: right;
}
</style>
