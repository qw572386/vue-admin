<template>
  <header class="head-nav">
    <el-row class="head-nav-container">
      <el-col :span="12" class="logo-container">
        <img src="../assets/images/logo.png" class="logo" alt="" />
        <span class="title">在线管理系统</span>
      </el-col>
      <el-col :span="12" class="user">
        <div class="userinfo hidden-xs-only">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
          <el-dropdown @command="setDialogInfo" class="user-dropdown">
            <span class="el-dropdown-link">
              {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userinfo">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'headNav',
  data () {
    const { avatar, userName } = this.$store.getters.user
    return {
      circleUrl: avatar,
      userName
    }
  },
  methods: {
    setDialogInfo (cmdItem) {
      switch (cmdItem) {
        case 'userinfo': {
          this.showInfoList()
          break
        }
        case 'logout': {
          this.logout()
          break
        }
        default: {
          break
        }
      }
    },
    showInfoList () {
      console.log('用户信息')
    },
    logout () {
      localStorage.removeItem('token')
      this.$store.dispatch('clearCurrentState')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="css" scoped>
.head-nav{
  /* width: 100%; */
  height: 60px;
  min-width: 600px;
  padding: 6px;
  background: #324057;
  color: #ffffff;
  border-bottom: 1px solid #1f2d3d;
}
.head-nav-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user{
  display: flex;
  justify-content: flex-end;
}
.userinfo,.logo-container{
  display: flex;
  align-items: center;
}
.logo-container .logo{
  height: 60px;
  width: 94px;
}
.logo-container .title{
  font-size: 22px;
  margin-left: 10px;
  letter-spacing: 3px
}
.userinfo .user-dropdown{
  line-height: 60px;
}
.userinfo .el-dropdown-link{
  padding: 0 10px;
  color: #ffffff;
}
</style>
