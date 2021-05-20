<template>
  <el-table :data="search_articles" class="blocks_table" @row-click="overclick">
    <el-table-column class="col" width="300" prop="user" label="作者">
      <template slot-scope="scope">
        <el-avatar :size="large" :src="scope.row.user.img"></el-avatar>
        <i class="el-icon-edit"></i>
        <span>{{ scope.row.user.name}}</span>
      </template>
    </el-table-column>
    <el-table-column class="col" width="500" prop="title" label="标题">
      <template slot-scope="scope">
        <span>{{ scope.row.title }}</span>
        <el-rate
          v-model="scope.row.score"
          disabled
          show-score
          text-color="#ff9900">
        </el-rate>
      </template>
    </el-table-column>
    <el-table-column class="col" prop="created_at" label="发布时间">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span>{{ formatter(scope.row.created_at, 'yyyy年MM月dd日 hh:mm:ss') }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "SearchList",
  props:['array'],
  data(){
    return{
      search_articles:''
    }
  },
  methods:{
    initArticles(){
      this.axios({
        method:'get',
        url:'/api/articles/search/'+this.array
      }).then((e)=>{
        this.search_articles = e.data
      })
    },
    //时间格式化
    formatter (thistime, fmt) {
      let $this = new Date(thistime)
      let o = {
        'M+': $this.getMonth() + 1,
        'd+': $this.getDate(),
        'h+': $this.getHours(),
        'm+': $this.getMinutes(),
        's+': $this.getSeconds(),
        'q+': Math.floor(($this.getMonth() + 3) / 3),
        'S': $this.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ($this.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    //表格点击事件
    overclick(row){
      if(row){
        this.$router.push({
          path:'/showartilce/'+row.id,
        })
      }
    }
  },
  mounted() {
    this.initArticles()
  }
}
</script>

<style scoped>
.blocks_table{
  width: auto;
}
</style>
