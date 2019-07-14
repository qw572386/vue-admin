<template>
  <div class="register">
    <el-card class="form-container" shadow="hover">
      <div slot="header">
        <span class="manage-title">后台管理系统</span>
      </div>
      <el-form :model="registerData" :rules="rules" ref="registerForm">
        <el-form-item prop="userName">
          <el-input type="text" v-model="registerData.userName" placeholder="用户名" autocomplete="off" clearable>
            <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input type="text" v-model="registerData.email" placeholder="邮箱" autocomplete="off" clearable>
            <i slot="prefix" class="el-input__icon el-icon-message"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input type="password" v-model="registerData.passWord" placeholder="密码" autocomplete="off" show-password>
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="registerData.checkPass" placeholder="确认密码" autocomplete="off" show-password>
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="identity">
          <el-select class="select-identity" v-model="registerData.identity" placeholder="请选择角色">
            <el-option label="管理员" value='manage'></el-option>
            <el-option label="普通" value='employee'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="btn-container">
            <el-button class="btn register-btn" type="primary" round size="medium" @click="register('registerData')">立即注册</el-button>
            <el-button class="btn reset-btn" round size="medium" @click="resetForm('registerData')">重置</el-button>
          </div>
        </el-form-item>
        <el-button type="text" style="float: right" @click="goToLogin">已有账号？去登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data() {
      const checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入邮箱'))
        }
        if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          return callback(new Error('邮箱格式不正确'));
        }
        callback();
      }
      const validatePwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'))
        }
        if (/^\w{6,20}$/.test(value)) {
          return callback()
        } else {
          return callback(new Error('由6到20位字母、数字和下划线组成'))
        }
      }
      const validatePwd2 = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入确认密码'))
        }
        if (value === this.registerData.passWord) {
          return callback()
        } else {
          return callback(new Error('两次输入密码不一致'))
        }
      }
      return {
        registerData: {
          userName: '',
          email: '',
          passWord: '',
          checkPass: '',
          identity: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', tigger: 'blur' },
            { min: 3, max: 20, message: '长度在3到20个字符', tigger: 'blur' },
          ],
          email: [
            { validator: checkEmail, tigger: 'blur' }
          ],
          passWord: [
            { validator: validatePwd, tigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePwd2, tigger: 'blur' }
          ],
          identity: [
            { required: true, message: '请选择角色', tigger: 'change' }
          ]
        }
      }
    },
    methods: {
      register() {
        this.$refs['registerForm'].validate(valid => {
          if (valid) {
            this.$message.success('成功')
          }
        })
      },
      resetForm() {
        this.$refs['registerForm'].resetFields();
      },
      goToLogin() {
        this.$router.push({ path: '/login' });
      }
    }
  }
</script>

<style lang="css" scoped>
  .register{
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/images/bg.jpg) no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .form-container{
    width: 370px;
    margin: auto 50px;
    background-color: rgba(255,255,255,.85);
  }
  .form-container .manage-title{
    font-size: 20px;
    font-weight: bold;
  
  }
  .select-identity{
    width: 100%;
  }
  .btn-container{
    display: flex;
  }
  .btn-container .btn{
    flex-grow: 1;
  }
</style>