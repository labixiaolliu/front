<template>
  <div class="fly-header layui-container layui-bg-black">
    <div class="content">
      <a class="layui-inline">
        <img src="../assets/logo-2.png" />
      </a>
      <ul class="layui-nav layui-col-space5 layui-inline left-bar">
        <li class="layui-nav-item">
          <a href="" class="layui-col-space10"><i class="iconfont icon-contact"></i>交流</a>
        </li>
        <li class="layui-nav-item">
          <a href="" class="layui-col-space10"><i class="iconfont icon-demo"></i>案例</a>
        </li>
        <li class="layui-nav-item">
          <a href="" class="layui-col-space10"><i class="iconfont icon-grid"></i>框架</a>
        </li>
      </ul>
      <ul class="layui-nav layui-col-space10 layui-inline login-list">
        <li class="layui-nav-item login">
          <router-link tag="a" :to="{ name: 'login' }"><i class="iconfont icon-login "></i>登入</router-link>
        </li>
        <li class="layui-nav-item reg">
          <router-link tag="a" :to="{ name: 'reg' }">注册<i class="iconfont icon-reg "></i></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  mounted() {}
}
</script>
<style scoped lang="stylus">
.fly-header
  position fixed
  top 0
  width 100%
  height 60px
  display flex
  align-items center
  .content
    margin auto
    width 75%
    position relative
    height 60px
    .login-list
      position absolute
      right 0
      height 60px
  .icon-contact:before
    content '\e6b7'
  .icon-demo:before
    content '\e652'
  .icon-grid:before
    content '\e625'
  .icon-login:before
    content '\e604'
    padding-right 10px
    font-size 30px
  .icon-reg:before
    content '\e618'
    padding-left 10px
    font-size 22px
  .icon-reg:after
    content '\e617'
    padding-left 10px
    font-size 22px
  ul>li>a, ul>li>a>i
    font-size 20px
</style>
