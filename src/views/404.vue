<template>
  <div class="not-found">
    <div class="btn-container">
      <el-button type="primary" round @click="goToHome">返回首页({{times}}s)</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      times: 5,
      timer: null
    }
  },
  created () {
    this.timer = setInterval(() => {
      this.times--;
      if (this.times < 0) {
        this.goToHome()
      }
    }, 1000)
  },
  methods: {
    goToHome() {
      this.timer = null;
      this.$router.replace('/');
    }
  }
}
</script>


<style lang="css" scoped>
  .not-found{
    width: 100%;
    height: 100%;
    position: relative;
    background: url('../assets/images/404.png') no-repeat center;
    background-size: cover;
    display: flex;
    justify-content: space-around;
  }
  .btn-container{
    height: 50px;
    position: absolute;
    bottom: 20px;
  }
</style>