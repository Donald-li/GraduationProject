<template>
  <div class="blocks">
    <h3 class="blocks_title">
      <i class="el-icon-guide"></i>
      {{ title }}
    </h3>
<!--    <el-divider class="dividers"></el-divider>-->

    <el-table :data="index_articles" class="blocks_table" @row-click="overclick">
      <el-table-column class="col" width="280" prop="user" label="作者">
        <template slot-scope="scope">
          <el-avatar :size="large" :src="scope.row.user.img"></el-avatar>
          <i class="el-icon-edit"></i>
          <span>{{ scope.row.user.name}}</span>
        </template>
      </el-table-column>
      <el-table-column class="col" width="400" prop="title" label="标题">
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

    <!--    <div class="rank">-->
    <!--      <h4 class="rank_title">排行榜</h4>-->
    <!--      <el-divider class="rank_dividers"></el-divider>-->

    <!--      <el-table :data="tabledata" class="rank_table" :show-header="false">-->
    <!--        <el-table-column class="rank_col" width="100" prop="author" label="作者">-->
    <!--&lt;!&ndash;          <template slot-scope="scope">&ndash;&gt;-->
    <!--&lt;!&ndash;            <el-avatar :size="large" :src="scope.row.avatar"></el-avatar>&ndash;&gt;-->
    <!--&lt;!&ndash;            <i class="el-icon-edit"></i>&ndash;&gt;-->
    <!--&lt;!&ndash;            <span>{{scope.row.author}}</span>&ndash;&gt;-->
    <!--&lt;!&ndash;          </template>&ndash;&gt;-->
    <!--        </el-table-column>-->
    <!--        <el-table-column class="rank_col" width="1000" prop="title" label="标题">-->
    <!--          <template slot-scope="scope">-->
    <!--            <span>{{scope.row.title}}</span>-->
    <!--            <el-rate-->
    <!--              v-model="scope.row.value"-->
    <!--              disabled-->
    <!--              show-score-->
    <!--              text-color="#ff9900">-->
    <!--            </el-rate>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--      </el-table>-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "Index_block",
  props: ['title', 'titleindex'],
  data() {
    return {
      index_articles: '',
    }
  },
  methods: {
    init() {
      this.axios({
        method: 'get',
        url: '/api/main/init/'+this.titleindex,
      }).then((response) => {
        if (response.data.msg == null) {
          this.index_articles = response.data
        }
      })
    },
    //初始化的方法
    // init_user(uid){
    //   this.axios({
    //     method:'get',
    //     url:'/api/users/'+uid
    //   }).then((response)=>{
    //     return response.data
    //   })
    // }
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
    this.init()
  }
}
</script>

<style scoped>
.rank_table {
  max-height: 340px;
}

.rank_dividers {
  margin-top: 5px;
  margin-bottom: 2px;
}

.rank_title {
  color: white;
  text-align: left;
  padding-left: 20px;
}

.rank {
  float: right;
  width: 18%;
  height: 400px;
  background-color: #409EFF;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.col {
  text-align: center;
}

.dividers {
  float: left;
}

.blocks_table {
  float: left;
  width: 100%;
}

.blocks_title {
  background-color: #ECF5FF;
  height: 40px;
  width: 99%;
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
