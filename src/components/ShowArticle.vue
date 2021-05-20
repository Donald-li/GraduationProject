<template>
  <div>
    <h1>{{articles.title}}</h1>
    <p>作者：{{articles.user.name}}</p>
    <div v-html="articles.body">
<!--      {{articles.body}}-->
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
    }
  },
  mounted() {
    this.initArticle()
  }
}
</script>

<style scoped>

</style>
