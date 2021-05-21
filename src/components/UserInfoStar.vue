<template>
  <div>
    <h3>已收藏文章</h3>
    <el-table :data="articles" class="blocks_table">
      <el-table-column class="col" width="150" label="作者">
                <template slot-scope="scope">
<!--                  <el-avatar :size="large" :src="scope.row.user.img"></el-avatar>-->
                  <i class="el-icon-edit"></i>
                  <span>{{scope.row.article.user.name}}</span>
                </template>
      </el-table-column>
      <el-table-column class="col" width="150" prop="title" label="标题">
                    <template slot-scope="scope">
                                    <span>{{scope.row.article.title}}</span>
                    </template>
      </el-table-column>
      <el-table-column class="col" width="150" prop="score" label="评分">
        <template slot-scope="scope">
          <!--              <span>{{scope.row.title}}</span>-->
          <el-rate
            v-model="scope.row.article.score"
            disabled
            show-score
            text-color="#ff9900">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column class="col" prop="created_at" label="发布时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{formatter(scope.row.article.created_at,'yyyy年MM月dd日 hh:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="ac-btn"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.article.id,userid)">移出</el-button>
          <el-button
            class="ac-btn"
            size="mini"
            type="primary"
            @click="handleInfo(scope.row.article.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      hide-on-single-page
      @current-change="current_page_change"
      @prev-click="pnclick"
      @next-click="pnclick"
      :current-page="current_page+1"
      :page-size="pagesize"
      :total="pageTotal">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "UserInfoStar",
  props:['userid'],
  data(){
    return{
      pageTotal:1,
      pagesize:6,
      current_page:0,
      articles:''
    }
  },
  methods:{
    //初始化收藏列表
    getStar_articles(uid,currentpage,pagesize){
      this.axios({
        method:"get",
        url:"/api/users/get_collect_page/"+uid+'/'+currentpage*pagesize+'/'+pagesize
      }).then((e)=>{
        this.articles = e.data
      })
    },
    //初始化收藏总数
    total(){
      this.axios({
        method:'get',
        url:'/api/users/get_collect_count/'+this.userid
      }).then((e)=>{
        this.pageTotal = e.data.total
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
    //点击页码事件
    current_page_change(page){
      this.getStar_articles(this.userid,page-1,this.pagesize)
    },
    //分页前后按键事件
    pnclick(page){
      this.getStar_articles(this.userid,page-1,this.pagesize)
    },
    //跳转详情页
    handleInfo(aid){
      this.$router.push('/showartilce/'+aid)
    },
    //移出收藏夹方法
    handleDelete(aid,uid){
      this.axios({
        method:'delete',
        url:'/api/users/uncollect/'+uid+'/'+aid
      }).then((e)=>{
        this.$message.info(e.data.msg)
        this.getStar_articles(this.userid,this.current_page,this.pagesize)
        this.total()
      })
    }
  },
  mounted() {
    this.getStar_articles(this.userid,this.current_page,this.pagesize)
    this.total()
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
