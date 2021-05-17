<template>
  <div>
    <h3>已收藏文章</h3>
    <el-table :data="articles" class="blocks_table">
      <el-table-column class="col" width="150" label="作者">
        <!--        <template slot-scope="scope">-->
        <!--          <el-avatar :size="large" :src="user.img"></el-avatar>-->
        <!--          <i class="el-icon-edit"></i>-->
        <!--          <span>{{user.name}}</span>-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column class="col" width="150" prop="title" label="标题">
        <!--            <template slot-scope="scope">-->
        <!--              &lt;!&ndash;              <span>{{scope.row.title}}</span>&ndash;&gt;-->
        <!--              <el-rate-->
        <!--                v-model="scope.row.score"-->
        <!--                disabled-->
        <!--                show-score-->
        <!--                text-color="#ff9900">-->
        <!--              </el-rate>-->
        <!--            </template>-->
      </el-table-column>
      <el-table-column class="col" width="150" prop="score" label="评分">
        <template slot-scope="scope">
          <!--              <span>{{scope.row.title}}</span>-->
          <el-rate
            v-model="scope.row.score"
            disabled
            show-score
            text-color="#ff9900">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column class="col" prop="created_at" label="发布时间">
        <template slot="header" slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>发布时间</span>
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
  name: "UserInfoStar",
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
