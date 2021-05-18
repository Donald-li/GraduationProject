<template>
  <div class="box">
    <el-upload
      class="avatar-uploader"
      action="/api/users/uploadfile"
      name="file"
      :show-file-list="false"
      :http-request="uploadAvatar"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon">上传头像</i>
    </el-upload>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="EditUser()">修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EditUser",
  props:['userid'],
  data(){
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        id:'',
        password: '',
        checkPass: '',
        account:'',
        name:'',
        rule:2,
        img:'',
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        // age: [
        //   { validator: checkAge, trigger: 'blur' }
        // ]
      }
    }
  },
  methods:{
    handleAvatarSuccess(res,file) {
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    initruleForm(){
      this.axios({
        method:'get',
        url:'/api/users/'+this.userid
      }).then((e)=>{
        this.ruleForm = e.data
      })
    },
    //修改行用户请求
    EditUser(){
      this.axios({
        method:'put',
        url:'/api/users/'+this.ruleForm.id,
        data:{'ruleForm':this.ruleForm}
      }).then((e)=>{
        alert(e.data.msg)
      })
    },
    //重置表单方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    uploadAvatar(item) {
      let param = new FormData(); //创建form对象
      param.append('file',item.file);//通过append向form对象添加数据
      param.append('chunk','0');//添加form表单中其他数据

      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };  //添加请求头
      this.axios.post('/api/users/uploadfile',param,config)
        .then(response=>{
          this.ruleForm.img = response.data.FileURL
        })
    }
  },
  mounted() {
    this.initruleForm()
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar{
  width: 178px;
  height: 178px;
  display: block;
}
.demo-ruleForm{
  width: 60%;
  margin-left: 20%;
}

</style>
