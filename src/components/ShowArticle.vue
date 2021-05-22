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
        show-text
        @change="onratechange">
      </el-rate>
      <el-button
        @click="thumbclick"
        class="el-icon-thumb"
        style="margin-top: 5px"
        v-html="isThumb === 2 ? '点赞'+articles.thumbs : '已点赞'+articles.thumbs">
<!--        点赞{{ articles.thumbs}}-->
      </el-button>
      <el-button
        @click="collectclick"
        class="el-icon-star-off"
        style="margin-top: 5px"
        v-html="isCollected === 2? '收藏' : '已收藏'">
        收藏
      </el-button>
    </div>
    <div class="comment" style="margin-top: 20px">
      <el-input id="new_input" v-model="commenttext" >
        <el-button slot="append" @click="createComment">评论</el-button>
      </el-input>

      <el-card v-for="(c,index) in comments" :key="index" class="ac_card" shadow="hover">
        <div style="overflow: auto">
          <el-avatar class="ac_title" :size="small" :src="c.user.img"></el-avatar>
          <p class="ac_title">{{ c.user.name }}</p>
        </div>
        <div @click="clickroute()" style="overflow: auto">
          <p style="float: left;margin-left: 50px">{{ c.body }}</p>
        </div>
        <div>
          <p style="float: right;margin-right: 50px;margin-bottom: 20px">{{formatter(c.created_at, 'yyyy年MM月dd日 hh:mm:ss')}}</p>
        </div>
      </el-card>
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
      //判断是否点赞:1-已点赞，2-未点赞
      isThumb:2,
      //判断是否收藏:1-已收藏，2-未收藏
      isCollected:2,
      //创建的评论内容
      commenttext:'',
      //评论对象
      comments:'',
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
      this.axios({
        method:'get',
        url:'/api/users/user_score_article/'+this.login_id+'/'+this.aid+'/'+rate
      }).then((e)=>{
        if(e.data.flag === 0){
          this.$message.warning(e.data.msg)
          this.initArticle()
        }else if(e.data.flag === 1){
          this.$message.info(e.data.msg)
          this.initArticle()
        }else{
          this.$message.error(e.data.msg)
          this.initArticle()
        }
      })
    },
    //点赞方法
    thumbclick(){

      if(this.isThumb == 2){
        this.axios({
          method:'get',
          url:'/api/users/user_thumb_article/'+this.login_id+'/'+this.aid
        }).then((e)=>{
          if(e.data.flag === 1){
            this.$message.info(e.data.msg)
            this.isThumb = 1
            this.initArticle()
          }else{
            this.$message.warning(e.data.msg)
          }
        })
      }else{
        this.$confirm('您已点赞，是否取消点赞？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            method:'delete',
            url:'/api/users/unthumb/'+this.login_id+'/'+this.aid
          }).then((e)=>{
            if(e.data.msg === '取消点赞成功！'){
              this.$message.info(e.data.msg)
              this.isThumb = 2
              this.initArticle()
            }else{
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
    //收藏方法
    collectclick(){

      if(this.isCollected == 2){
        this.axios({
          method:'get',
          url:'/api/users/user_collect_article/'+this.login_id+'/'+this.aid
        }).then((e)=>{
          if(e.data.flag === 1){
            this.$message.info(e.data.msg)
            this.initArticle()
            this.isCollected = 1
          }else{
            this.$message.warning(e.data.msg)
          }
        })
      }else{
        this.$confirm('您已收藏，是否取消收藏？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            method:'delete',
            url:'/api/users/uncollect/'+this.login_id+'/'+this.aid
          }).then((e)=>{
            if(e.data.msg === '取消收藏成功！'){
              this.$message.info(e.data.msg)
              this.isCollected = 2
              this.initArticle()
            }else{
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
    //判断是否收藏
    isCollect(){
      this.axios({
        method:'get',
        url:'/api/users/isCollect/'+this.login_id+'/'+this.aid
      }).then((e)=>{
        this.isCollected = e.data.flag
      })
    },
    //判断是否点赞
    isThumbed(){
      this.axios({
        method:'get',
        url:'/api/users/isThumb/'+this.login_id+'/'+this.aid
      }).then((e)=>{
        this.isThumb = e.data.flag
      })
    },
    //初始化评论
    initComments(){
      this.axios({
        method:'get',
        url:'/api/articles/get_comment/'+this.login_id+'/'+this.aid
      }).then((e)=>{
        this.comments = e.data
      })
    },
    //提交评论方法
    createComment(){
      this.axios({
        method:'post',
        url:'/api/comments',
        data:{
          uid:this.login_id,
          aid:this.aid,
          text:this.commenttext
        }
      }).then((e)=>{
        if(e.data.flag === 1){
          this.$message.info(e.data.msg)
          this.initComments()
        }else{
          this.$message.error(e.data.msg)
        }
      })
    }
  },
  mounted() {
    this.initArticle()
    this.isFocues()
    this.isCollect()
    this.isThumbed()
    this.initComments()
  }
}
</script>

<style scoped>
.comment{

}
.ac_card{
  height: auto;
  margin-top: 10px;
  overflow: auto;
}
.ac_title{
  float: left;
  margin-left: 10px;
}
</style>
