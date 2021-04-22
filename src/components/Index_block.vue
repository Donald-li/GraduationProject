<template>
  <div class="blocks">
    <h3 class="blocks_title">
      <i class="el-icon-guide"></i>
      {{title}}
    </h3>
    <el-divider class="dividers"></el-divider>

    <el-table :data="tabledata" class="blocks_table">
      <el-table-column class="col" width="300" prop="author" label="作者">
        <template slot-scope="scope">
          <el-avatar :size="large" :src="scope.row.avatar"></el-avatar>
          <i class="el-icon-edit"></i>
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column class="col" width="1000" prop="title" label="标题">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
          <el-rate
            v-model="scope.row.value"
            disabled
            show-score
            text-color="#ff9900">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column class="col" prop="date" label="发布时间">
        <template slot="header" slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>发布时间</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="rank">
      <h4 class="rank_title">排行榜</h4>
      <el-divider class="rank_dividers"></el-divider>

      <el-table :data="tabledata" class="rank_table" :show-header="false">
        <el-table-column class="rank_col" width="100" prop="author" label="作者">
<!--          <template slot-scope="scope">-->
<!--            <el-avatar :size="large" :src="scope.row.avatar"></el-avatar>-->
<!--            <i class="el-icon-edit"></i>-->
<!--            <span>{{scope.row.author}}</span>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column class="rank_col" width="1000" prop="title" label="标题">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
            <el-rate
              v-model="scope.row.value"
              disabled
              show-score
              text-color="#ff9900">
            </el-rate>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index_block",
  props:['title'],
  data(){
    return{
      tabledata:[{
        author:'Donald lee',
        title:'这是第一篇文章的标题',
        date:'2021.4.21',
        value:4.1,
        avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },{
        author:'Donald lee',
        title:'这是第二篇文章的标题',
        date:'2021.4.21',
        value:4.1,
        avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },{
        author:'Donald lee',
        title:'这是第三篇文章的标题',
        date:'2021.4.21',
        value:4.1,
        avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },{
        author:'Donald lee',
        title:'这是第四篇文章的标题',
        date:'2021.4.21',
        value:4.1,
        avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },{
        author:'Donald lee',
        title:'这是第五篇文章的标题',
        date:'2021.4.21',
        value:4.1,
        avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }]
    }
  }
}
</script>

<style scoped>
.rank_table{
  max-height: 340px;
}
.rank_dividers{
  margin-top: 5px;
  margin-bottom: 2px;
}
.rank_title{
  color: white;
  text-align: left;
  padding-left: 20px;
}
.rank{
  float: right;
  width: 18%;
  height: 400px;
  background-color: #409EFF;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.col{
  text-align: center;
}
.dividers{
  float: left;
}
.blocks_table{
  float: left;
  width: 80%;
}
.blocks_title{
  background-color: #ECF5FF;
  height: 40px;
  width: 100%;
  text-align: left;
  padding-top: 15px;
  padding-left: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin: 0px
}
.blocks{
  float: left;
  width: 100%;
}
</style>
