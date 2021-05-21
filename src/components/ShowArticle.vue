<template>
  <div>
    <h1>{{articles.title}}</h1>
    <div style="overflow: auto">
      <p style="text-align: right;width: 50%;float: left">作者：{{articles.user.name}} </p>
      <el-button class="focues_btn"
                 @click="focues(articles.user.id,login_id)"
                 v-if="articles.user.id != login_id"
                 style="float: left;margin-top: 15px;margin-left: 5px" size="mini"
                 v-html="isFouces === 1? '已关注' : '关注'"
                 round>

      </el-button></div>
    <div v-html="articles.body">
<!--      {{articles.body}}-->
    </div>
    <div  style="overflow: auto">
      <p style="float: right">
        文章发表于:{{formatter(articles.created_at, 'yyyy年MM月dd日 hh:mm:ss')}}
      </p>
    </div>
    <div>
      <el-rate
        v-model="articles.score"
        :colors="colors"
        show-score
        @change="onratechange">
      </el-rate>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowArticle",
  props:['aid'],
  data(){
    return{
      login_id:this.$session.get("user_id"),
      //判断是否已关注
      isFouces:2,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      articles:[
        {
          id:'',
          title:'',
          body:'',
          score:'',
          section:'',
          thumbs:'',
          user:{
            id:'',
            account:'',
            name:'',
            img:'',
            rule:''
          }
        }
      ]
    }
  },
  methods:{
    //文章初始化方法
    initArticle(){
      this.axios({
        url:'/api/articles/'+this.aid,
        method:'get'
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
    //关注方法
    focues(uid,fid){
      if(this.isFouces==2){
        this.axios({
          method:'get',
          url:'/api/users/focues_user/'+uid+'/'+fid
        }).then((e)=>{
          if(e.data.msg == '关注成功！'){
            this.$message.success(e.data.msg)
            this.isFouces = 1
          }else {
            this.$message.warning(e.data.msg)
          }
        })
      }else{
        this.$confirm('已关注, 是否取消关注?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            method:'delete',
            url:'/api/users/unfocues/'+this.articles.user.id+'/'+this.login_id
          }).then((e)=>{
            if(e.data.msg == '取关成功！'){
              this.$message.success(e.data.msg)
              this.isFouces = 2
            }else {
              this.$message.warning(e.data.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    //判断是否已关注用户
    isFocues(){
      this.axios({
        method:'get',
        url:'/api/users/isFocues/'+this.aid+'/'+this.login_id
      }).then((e)=>{
        this.isFouces = e.data.msg
      })
    },
    //评分方法
    onratechange(rate){
      this.$message.info(rate.toString())
    }
  },
  mounted() {
    this.initArticle()
    this.isFocues()
  }
}
</script>

<style scoped>

</style>
