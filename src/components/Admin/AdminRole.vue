<template>
  <div>
    <el-table :data="users" class="blocks_table" @row-click="overclick">
      <el-table-column class="col" width="200" label="用户名">
        <template slot-scope="scope">
          <el-avatar :size="large" :src="scope.row.img"></el-avatar>
          <i class="el-icon-edit"></i>
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column class="col" width="150" label="用户账号">
        <template slot-scope="scope">
          <i class="el-icon-edit"></i>
          <span>{{ scope.row.account}}</span>
        </template>
      </el-table-column>
      <el-table-column class="col" width="300" label="用户角色">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.rule"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="admin"
            inactive-value="normal"
            active-text="管理员"
            inactive-text="普通用户"
            @change="onChange($event,scope.row.id)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column class="col" width="250" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ formatter(scope.row.created_at, 'yyyy年MM月dd日 hh:mm:ss') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column class="col" prop="created_at" label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="danger"-->
<!--            @click="handleDelete(scope.row.id)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
  name: "AdminRole",
  data(){
    return{
      users:'',
      pagesize:6,
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
    initUser(pagesize, offset) {
      this.axios({
        method: 'get',
        url: '/api/users/index_page/' + pagesize + "/" + offset
      }).then((e) => {
        this.users = e.data.users
        this.pageTotal = e.data.total
      })
    },
    current_page_change(page){
      this.initUser(this.pagesize,this.pagesize*(page-1))
    },
    //改变用户状态
    onChange(value,id){
      this.axios({
        method:'get',
        url:'/api/users/changeRole/'+id+'/'+value
      }).then((e)=>{
        this.$message.info(e.data.msg)
      })
    },
    //删除用户
    handleDelete(id){
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method:'delete',
          url:'/api/users/'+id
        }).then((e)=>{
          this.$message.info(e.data.msg)
          this.initUser(this.pagesize,this.pagesize * this.offset)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  },
  mounted(){
    this.initUser(this.pagesize,this.offset)
  }
}
</script>

<style scoped>

</style>
