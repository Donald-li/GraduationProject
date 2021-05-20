<template>
  <div>
    <h1>{{articles.title}}</h1>
    <div style="overflow: auto"><p style="text-align: right;width: 50%;float: left">作者：{{articles.user.name}} </p><el-button v-if="articles.user.id != this.$session.get('user_id')" style="float: left;margin-top: 15px;margin-left: 5px" size="mini" round>关注</el-button></div>
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
        :colors="colors">
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
  },
  mounted() {
    this.initArticle()
  }
}
</script>

<style scoped>

</style>
