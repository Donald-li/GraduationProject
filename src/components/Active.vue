<template>
  <div>
    <el-card class="ac_card" v-for="(a,index) in articles" :key="index" shadow="hover">
      <div style="overflow: auto">
        <el-avatar class="ac_title" :size="small" :src="a.user.img"></el-avatar>
        <p class="ac_title">{{a.user.name}}</p>
      </div>
      <div @click="clickroute(a.id)" style="overflow: auto">
        <h4>{{a.title}}</h4>
        <p style="float: left;margin-left: 80px">{{a.body.substring(0,200)}}...</p>
      </div>
      <div style="float: right">
        <el-rate
          v-model="a.score"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
        <p>{{formatter(a.created_at,"yyyy年MM月dd日 hh:mm:ss")}}</p>
      </div>
    </el-card>
    <p style="margin-top: 90px;color: #a0cfff">总得有个底吧。。。</p>
  </div>
</template>

<script>
export default {
  name: "Active",
  data(){
    return{
      articles:[
        {
          id:1,
          title:'这是第一篇文章',
          body:'这里是文章主体',
          created_at:'2021年5月22日',
          user:{
            id:1,
            name:'Donald superme'
          }
        },
        {
          id:2,
          title:'这是第二篇文章',
          body:'这里是文章主体',
          created_at:'2021年5月22日',
          user:{
            id:1,
            name:'Donald superme'
          }
        }
      ]
    }
  },
  methods:{
    //动态初始化方法
    initActive(){
      this.axios({
        method:'get',
        url:'/api/users/active_user/'+this.$session.get('user_id')
      }).then((e)=>{
        this.articles = e.data
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
    //点击跳转方法
    clickroute(aid){
      this.$router.push('/showartilce/'+aid)
    }
  },
  mounted() {
    this.initActive()
  }
}
</script>

<style scoped>
.ac_card{
  margin-top: 10px;
  overflow: auto;
}
.ac_title{
  float: left;
  margin-left: 10px;
}
</style>
