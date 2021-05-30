<template>
  <div>
    <el-table :data="articles" class="blocks_table">
      <el-table-column class="col" width="200" label="作者">
        <template slot-scope="scope">
          <el-avatar :size="large" :src="scope.row.user.img"></el-avatar>
          <i class="el-icon-edit"></i>
          <span>{{scope.row.user.name}}</span>
        </template>
      </el-table-column>
      <el-table-column class="col" width="150" prop="title" label="标题">
      </el-table-column>
      <el-table-column class="col" width="150" prop="score" label="审核">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="show"
            inactive-value="hidden"
            active-text="通过"
            inactive-text="未通过"
            @change="onChange($event,scope.row.id)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column class="col" prop="created_at" label="发布时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{formatter(scope.row.created_at, 'yyyy年MM月dd日 hh:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="id">
        <template slot-scope="scope">
          <el-button
            class="ac-btn"
            size="mini"
            @click="handleMore(scope.row.id)">查看</el-button>
          <el-button
            class="ac-btn"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="page"
      background
      hide-on-single-page
      @current-change="current_page_change"
      :current-page="offset+1"
      layout="prev, pager, next"
      :page-size="pagesize"
      :total="pageTotal">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "AdminArticle",
  data(){
    return{
      articles:'',
      pagesize:8,
      pageTotal:100,
      offset:0,
      select:'',
      created_at:''
    }
  },
  methods: {
    //时间格式化
    formatter(thistime, fmt) {
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
    //初始化用户
    initArticle(pagesize, offset) {
      this.axios({
        method: 'get',
        url: '/api/articles/show_by_page_index/' + offset + "/" + pagesize
      }).then((e) => {
        this.articles = e.data
        // this.pageTotal = e.data.length
      })
    },
    initTotal(){
      this.axios({
        method:'get',
        url:'/api/articles/get_total'
      }).then((e)=>{
        this.pageTotal = e.data.total
      })
    },
    current_page_change(page){
      this.initArticle(this.pagesize,this.pagesize*(page-1))
    },
    //改变用户状态
    onChange(value,id){
      this.axios({
        method:'get',
        url:'/api/articles/changeArticleState/'+id+'/'+value
      }).then((e)=>{
        this.$message.info(e.data.msg)
      })
    },
    //删除用户
    handleDelete(id){
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method:'delete',
          url:'/api/articles/'+id
        }).then((e)=>{
          this.$message.info(e.data.msg)
          this.initArticle(this.pagesize,this.pagesize * this.offset)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //查看详情
    handleMore(aid){
      this.$router.push('/showartilce/'+aid)
    }

  },
  mounted(){
    this.initArticle(this.pagesize,this.offset)
    this.initTotal()
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
