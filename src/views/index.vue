<template>
  <div class="layout">
    <HeaderNav />
    <el-row class="layout-main">
      <el-col :sm="6" :md="5" :lg="4" class="layui-main-left hidden-xs-only">
        <side-menu />
      </el-col>
      <el-col :xs="24" :sm="18" :md="19" :lg="20" class="layui-main-right">
        <div style="width: 100%">
          <router-view />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeaderNav from '../components/HeadNav'
import SideMenu from '../components/sideMenu'
export default {
  name: 'home',
  components: {
    HeaderNav,
    SideMenu
  }
}
</script>

<style lang="css" scoped>
.layout{
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.layout .layout-main{
  flex-grow: 1;
  overflow: hidden;
}
.layout .layout-main .layui-main-left, .layout .layout-main .layui-main-right{
  height: 100%;
  box-sizing: border-box;
}
.layout .layout-main .layui-main-left{
  overflow-y: auto;
  overflow-x: hidden;
  background: #324057;
}
.layout .layout-main .layui-main-right{
  padding: 10px;
  background: #f5f5f5;
  overflow-y: auto;
}
</style>
