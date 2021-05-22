<template>
  <div>
    <Head/>
    <el-divider></el-divider>

    <h3 class="blocks_title">
      <i class="el-icon-guide"></i>
      {{ sname }}
    </h3>

    <el-table :data="index_articles" class="blocks_table" @row-click="overclick">
      <el-table-column class="col" width="300" label="作者">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.user.img"></el-avatar>
          <i class="el-icon-edit"></i>
          <span>{{ scope.row.user.name}}</span>
        </template>
      </el-table-column>
      <el-table-column class="col" width="500" label="标题">
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
  </div>
</template>

<script>
export default {
  name: "SectionPage",
  props:["sid","sname"],
  data(){
    return {
      index_articles:''
    }
  },
  methods:{
    //表格点击事件
    overclick(row){
      if(row){
        this.$router.push({
          path:'/showartilce/'+row.id,
        })
      }
    },
    //初始化版块内容
    initSection(){
      this.axios({
        method:'get',
        url:'/api/main/initSections/'+this.sid
      }).then((e)=>{
        this.index_articles = e.data
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
  },
  mounted() {
    this.initSection()
  }
}
</script>

<style scoped>
.blocks_table {
  float: left;
  width: 100%;
}

.blocks_title {
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

.blocks {
  float: left;
  width: 100%;
}
</style>
