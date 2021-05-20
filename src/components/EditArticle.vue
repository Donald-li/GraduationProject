<template>
  <div class="ArticleDetail">
    <div>
      <label for="title">文章标题:</label>
      <el-input id="title" name="title" v-model="article.title" style="width: 90%;height: 40px;margin: 10px" maxlength="10"
                show-word-limit />
    </div>
    <label for="section">文章版块:</label>
    <el-radio-group id="section" v-model="article.section" style="width: 90%;height: 30px;margin: 10px" maxlength="10">
      <el-radio :label="1">电影</el-radio>
      <el-radio :label="2">游戏</el-radio>
      <el-radio :label="3">音乐</el-radio>
      <el-radio :label="4">舞蹈</el-radio>
      <el-radio :label="5">美食</el-radio>
      <el-radio :label="6">动漫</el-radio>
    </el-radio-group>
    <div ref="editor" style="text-align:left"></div>
    <div class="padding-top-xs text-right">
      <el-button @click="editorSubmit" style="margin: 10px">发布<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
var editor;
var that;
export default {
  name: "EditArticle",
  props:['uid','aid'],
  data(){
    return {
      content: '',
      article:{
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
    }
  },
  methods: {
    editorSubmit() {
      this.axios({
        url:'/api/articles/'+this.article.id,
        method:'put',
        data:{'article':{
          'id':this.article.id,
          'title':this.article.title,
          'body':this.article.body,
          'score':this.article.score,
          'thumbs':this.article.thumbs,
          'user_id':this.article.user.id,
          'section':this.article.section,
          }}
      }).then((e)=>{
        this.$message.info(e.data.msg)
      })
    },
    //初始化文章
    initArticle(aid){
      this.axios({
        method:'get',
        url:'/api/articles/'+aid
      }).then((e)=>{
        // this.article.body = e.data.body
        // this.article.title = e.data.title
        // this.article.section = e.data.section

        this.article = e.data
        // alert(this.article.body)
        editor.txt.html(this.article.body)
      })
    }
  },
  mounted(){
    this.initArticle(this.aid)

    that = this;
    editor = new E(that.$refs.editor);
    // 配置 server 接口地址
    editor.config.uploadImgServer = '/api/articles/upload_img'
    editor.config.uploadVideoServer = '/api/articles/upload_img'
    editor.config.uploadVideoName = 'file'
    editor.config.uploadFileName = 'file'

    editor.config.onchange = function(html) {
      that.article.body=html;
      // console.log('change 之后最新的 html', html)
    }
    editor.create()
    // alert(this.article.body)
    editor.txt.html(this.article.body) // 重新设置编辑器内容
  }
}
</script>

<style scoped>

</style>
