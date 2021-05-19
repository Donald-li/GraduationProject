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
  name: "CreateArticle",
  props:['id'],
  data: function() {
    return {
      content: '',
      article:{
        title:'',
        body:'',
        section:1,
        user_id:this.id,
      }
    }
  },
  mounted: function() {
    that = this;
    editor = new E(that.$refs.editor);
    // 配置 server 接口地址
    editor.config.uploadImgServer = '/api/articles/upload_img'
    editor.config.uploadVideoServer = '/api/articles/upload_img'
    editor.config.uploadVideoName = 'file'
    editor.config.uploadFileName = 'file'

    editor.config.onchange = function(html) {
      that.article.body=html;
      console.log('change 之后最新的 html', html)
    }
    editor.create()
  },
  methods: {
    editorSubmit() {
      this.axios({
        url:'/api/articles',
        method:'post',
        data:{'article':this.article}
      }).then((e)=>{
        alert(e.data.msg)
      })
    }
  }
}
</script>

<style scoped>

</style>
