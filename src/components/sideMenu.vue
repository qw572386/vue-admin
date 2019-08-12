<template>
  <el-menu
    default-active="2"
    class="side-menu"
    @select="onSelect"
    background-color="#324057"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/article">
      <i class="el-icon-menu"></i>
      <span slot="title">文章管理</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-user"></i>
      <span slot="title">个人中心</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    onSelect(index) {
      this.$router.push(index)
    }
  }
};
</script>

<style lang="css" scoped>
.side-menu{
  border: none;
}
</style>