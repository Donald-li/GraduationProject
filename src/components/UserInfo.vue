<template>
  <div>
<!--    <h1>这是个人信息页面</h1>-->
<!--    信息卡片头-->
    <el-card class="box-card">
<!--      头像-->
      <div class="demo-basic--circle avatar">
        <div class="block"><el-avatar :size="150" :src="user.img"></el-avatar></div>
      </div>
<!--      个人信息-->
      <div class="info_area_box">
        <h2 class="info_area">用户姓名：{{user.name}}</h2>
        <h2 class="info_area">账号：{{user.account}}</h2>
        <h2 class="info_area">用户级别：{{user.rule}}</h2>
      </div>
    </el-card>
<!--    用户发表的文章-->
    <el-card>
      <div>
        <h3>已发表文章</h3>
        <el-table :data="articles" class="blocks_table">
          <el-table-column class="col" width="200" label="作者">
            <template slot-scope="scope">
              <el-avatar :size="large" :src="user.img"></el-avatar>
              <i class="el-icon-edit"></i>
              <span>{{user.name}}</span>
            </template>
          </el-table-column>
          <el-table-column class="col" width="200" prop="title" label="标题">
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
          <el-table-column class="col" width="200" prop="score" label="评分">
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
                size="mini"
                @click="handleEdit(scope.id, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.id, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      user: {
        account: '001',
        name: 'Donald lee',
        rule: 0,
        img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },
      articles:[
        {
          id:'1',
          title:'1',
          body:'123',
          score:4,
          section:1,
          thumbs:99,
          created_at: '2021-5-10'
        },{
          id:'2',
          title:'2',
          body:'123',
          score:5,
          section:1,
          thumbs:99,
          created_at: '2021-5-9'
        }
      ]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style scoped>
.info_area{
  /*float: left;*/
  margin-top: 5px;
  margin-left: 0px;
  text-align: left;
}
.avatar{
  float: left;
  margin-left: 10px;
}
.box-card,.info_area_box{
  overflow: auto;
}
.info_area_box{
  float: left;
  margin-left: 20px;
}
</style>
