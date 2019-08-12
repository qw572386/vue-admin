<template>
  <div class="login">
    <el-card class="form-container" shadow="hover">
      <div slot="header">
        <span class="manage-title">后台管理系统</span>
      </div>
      <el-form :model="loginData" :rules="rules" ref="loginForm">
        <el-form-item prop="email">
          <el-input type="text" v-model="loginData.email" placeholder="邮箱" autocomplete="off" clearable>
            <i slot="prefix" class="el-input__icon el-icon-message"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginData.password" placeholder="密码" autocomplete="off" show-password>
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn-container">
            <el-button class="btn login-btn" type="primary" round size="medium" @click="login('loginData')">立即登录</el-button>
          </div>
        </el-form-item>
        <el-button type="text" style="float: right" @click="goToRegister">没有账号？去注册</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'login',
  data () {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'))
      }
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        return callback(new Error('邮箱格式不正确'))
      }
      callback()
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
    return {
      loginData: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { validator: checkEmail, tigger: 'blur' }
        ],
        password: [
          { validator: validatePwd, tigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          // 发送请求
          this.$axios.post('/api/user/login', this.loginData).then(res => {
            if (res.code !== 0) throw new Error(res.msg || '登录失败')
            const { token } = res.data
            // 存储token
            localStorage.setItem('token', token)
            // 解析token
            const decode = jwtDecode(token)
            // token 信息存储vuex
            this.$store.dispatch('setAuthenticated', !this.isEmpty(decode))
            this.$store.dispatch('setUser', decode)
            this.$router.push('/')
          }).catch(err => {
            this.$message.error(err.message)
          })
        }
      })
    },
    isEmpty (value) {
      return (
        value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    },
    goToRegister () {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style lang="css" scoped>
  .login{
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
  .btn-container{
    display: flex;
  }
  .btn-container .btn{
    flex-grow: 1;
  }
</style>
