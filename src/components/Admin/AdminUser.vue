<template>
  <div>

<!--    <el-header>-->
<!--      <div class="demo-input-size">-->
<!--        <label for="title">用户名</label>-->
<!--        <el-input-->
<!--          id="title"-->
<!--          size="medium"-->
<!--          class="admin_search_input"-->
<!--          placeholder="请输入内容"-->
<!--          suffix-icon="el-icon-date"-->
<!--          v-model="username">-->
<!--        </el-input>-->
<!--        <label for="body">用户状态</label>-->
<!--        <el-select id="body" class="admin_search_input" v-model="state" slot="prepend" placeholder="请选择">-->
<!--          <el-option label="使用中" value="1"></el-option>-->
<!--          <el-option label="封禁" value="2"></el-option>-->
<!--        </el-select>-->
<!--        <label for="created">创建时间</label>-->
<!--        <el-date-picker-->
<!--          id="created"-->
<!--          v-model="date_search"-->
<!--          value-format="yyyy-MM-dd HH:mm:ss"-->
<!--          type="datetimerange"-->
<!--          :picker-options="pickerOptions"-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--          align="right">-->
<!--        </el-date-picker>-->
<!--        <el-button slot="append" icon="el-icon-search" @click="search_user"></el-button>-->
<!--      </div>-->
<!--    </el-header>-->

    <el-table :data="users" class="blocks_table" @row-click="overclick">
      <el-table-column class="col" width="200" label="用户名">
        <template slot-scope="scope">
          <el-avatar :size="large" :src="scope.row.img"></el-avatar>
          <i class="el-icon-edit"></i>
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column class="col" width="100" label="用户账号">
        <template slot-scope="scope">
          <i class="el-icon-edit"></i>
          <span>{{ scope.row.account}}</span>
        </template>
      </el-table-column>
      <el-table-column class="col" width="100" label="用户角色">
        <template slot-scope="scope">
          <i class="el-icon-edit"></i>
          <span>{{ scope.row.rule}}</span>
        </template>
      </el-table-column>
      <el-table-column class="col" width="100" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="using"
            inactive-value="abandon"
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
      <el-table-column class="col" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button
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
  name: "AdminUser",
  data(){
    return{
      users:'',
      pagesize:6,
      pageTotal:100,
      offset:0,
      select:'',
      // //搜索用用户名
      // username:'',
      // //搜索状态
      // state:'',
      // //搜索用时间
      // date_search:[],
      // pickerOptions: {
      //   shortcuts: [{
      //     text: '最近一周',
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      //       picker.$emit('pick', [start, end]);
      //     }
      //   }, {
      //     text: '最近一个月',
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      //       picker.$emit('pick', [start, end]);
      //     }
      //   }, {
      //     text: '最近三个月',
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      //       picker.$emit('pick', [start, end]);
      //     }
      //   }]
      // },
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
        url:'/api/users/changState/'+id+'/'+value
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
    //模糊搜索
    search_user(){
      this.axios({
        method:'get',
        url:'/api/users/search_user_group/'+this.username+'/'+this.state+'/'+this.date_search[0]+'/'+this.date_search[1]
      }).then((e)=>{
        this.users = e.data.users
      })

    }
  },
    mounted(){
      this.initUser(this.pagesize,this.offset)
    }
}
</script>

<style scoped>
.page{
  margin-top: 10px;
}
.admin_search_input{
  width: 10%;

}
</style>
