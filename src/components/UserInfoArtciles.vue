<template>
  <div style="height: 450px">
    <h3>已发表文章</h3>
    <el-table :data="articles" class="blocks_table">
      <el-table-column class="col" width="150" label="作者">
        <template slot-scope="scope">
<!--          <el-avatar :size="large" :src="user.img"></el-avatar>-->
          <i class="el-icon-edit"></i>
          <span>{{user.name}}</span>
        </template>
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
            @click="handleEdit(scope.id, scope.row)">编辑</el-button>
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
      @prev-click="pnclick"
      @next-click="pnclick"
      :current-page="offset+1"
      layout="prev, pager, next"
      :page-size="pagesize"
      :total="pageTotal">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "UserInfoArtciles",
  props:['userid'],
  data(){
    return{
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
        },
        {
          id:'3',
          title:'2',
          body:'123',
          score:5,
          section:1,
          thumbs:99,
          created_at: '2021-5-9'
        },
        {
          id:'4',
          title:'2',
          body:'123',
          score:5,
          section:1,
          thumbs:99,
          created_at: '2021-5-9'
        },
        {
          id:'5',
          title:'2',
          body:'123',
          score:5,
          section:1,
          thumbs:99,
          created_at: '2021-5-9'
        },
        {
          id:'6',
          title:'2',
          body:'123',
          score:5,
          section:1,
          thumbs:99,
          created_at: '2021-5-9'
        }
      ],
      pageTotal:30,
      //用户信息
      user:'',
      //当前页面
      offset:0,
      //页面大小
      pagesize:6
    }
  },
  methods:{
    getuser(){
      this.axios({
        method:'get',
        url:'/api/users/'+this.userid
      }).then((e)=>{
        this.user = e.data
      })
    },
    //初始化显示分页
    getarticles(uid,offset,pagesize){
      this.axios({
        method:'get',
        url:'/api/users/get_articles/'+uid+'/'+offset+'/'+pagesize
      }).then((e)=>{
        this.articles = e.data.articles
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
    //点击页码跳转
    current_page_change(page){
      this.getarticles(this.userid,page-1,this.pagesize)
    },
    //点击前后页跳转
    pnclick(page){
      this.getarticles(this.userid,page-1,this.pagesize)
    },
    //表格点击跳转
    overclick(row){
      if(row){
        this.$router.push({
          path:'/showartilce/'+row.id,
        })
      }
    },
    handleDelete(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method:'delete',
          url:'/api/articles/'+id
        }).then((e)=>{
          this.$message({
            type: 'success',
            message: e.data.msg
          });
          this.getarticles(this.userid,this.offset,this.pagesize)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  },
  mounted() {
    this.getuser()
    this.getarticles(this.userid,this.offset,this.pagesize)
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
