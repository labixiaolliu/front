<template>
  <div class="layui-container flex">
    <img src="../assets/icon-404.png" />
    <p>当前没有页面</p>
    <router-link to="/" class="layui-btn">回到首页</router-link>
  </div>
</template>
<script>
export default {
  name: '404',
  data() {
    return {}
  }
}
</script>
<style scoped lang="stylus">
.flex
  width 100%
  min-height 400px
  display flex
  flex-direction column
  align-items center
  justify-content center
  p
    padding 10px 0 15px 0
    color #ddd
</style>
