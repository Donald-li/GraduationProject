<template>
  <div>
    <el-button icon="el-icon-edit" class="edit-btn">修改</el-button>
    <h4 class="info_h">昵称：{{UserInfo.name}}</h4>
    <h4 class="info_h">账号：{{UserInfo.account}}</h4>
    <h4 class="info_h">角色：{{UserInfo.rule}}</h4>
    <h4 class="info_h">创建时间：{{formatter(this.UserInfo.created_at,'yyyy年MM月dd日 hh:mm:ss')}}</h4>
    <h4 class="info_h">更新时间：{{formatter(this.UserInfo.updated_at,'yyyy年MM月dd日 hh:mm:ss')}}</h4>

  </div>
</template>

<script>
export default {
  name: "UserInfoDetail",
  props:['userid'],
  data(){
    return{
      UserInfo:'',
    }
  },
  methods:{
    //加载用户信息
    inloadUser(){
      this.axios({
        method:'get',
        url:'/api/users/'+this.userid
      }).then((e)=>{
        this.UserInfo = e.data
      })
    },
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
    }
  },
  mounted() {
    this.inloadUser()
  }
}
</script>

<style scoped>
.edit-btn{
  float: right;
}
</style>
