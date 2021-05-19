<template>
  <div>
    <h1>标题:{{articles.title}}</h1>
    <p>作者：{{articles.user.name}}</p>
    <div>
      {{articles.body}}
    </div>
    <div>
      {{articles.score}}
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
    }
  },
  mounted() {
    this.initArticle()
  }
}
</script>

<style scoped>

</style>
