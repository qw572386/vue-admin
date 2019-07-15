<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import jwtDecode from 'jwt-decode'
  export default {
    name: 'app',
    created() {
      if (localStorage.getItem('token')) {
        const decode = jwtDecode(localStorage.getItem('token'))
        // token 信息存储vuex
        this.$store.dispatch('setAuthenticated', !this.isEmpty(decode))
        this.$store.dispatch('setUser', decode)
      }
    },
    methods: {
      isEmpty(value) {
        return (
          value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) ||
          (typeof value === 'string' && value.trim().length === 0)
        )
      }
    }
  }
</script>

<style>
html, body, #app{
  height: 100%;
  width: 100%;
}
</style>
