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
      <ul class="layui-nav layui-col-space10 layui-inline login-list" v-if="!isLogin">
        <li class="layui-nav-item login">
          <router-link tag="a" :to="{ name: 'login' }"><i class="iconfont icon-login "></i>登入</router-link>
        </li>
        <li class="layui-nav-item reg">
          <router-link tag="a" :to="{ name: 'reg' }">注册<i class="iconfont icon-reg "></i></router-link>
        </li>
      </ul>
      <div
        v-else
        class="layui-nav layui-col-space10 layui-inline user-list layui-nav-item"
        @mouseover="show()"
        @mouseout="hide()"
      >
        <div class="user-info">
          <p>{{ userInfo.nick }}</p>
          <a>
            <i class="iconfont icon-renzheng" title="认证信息" v-show="userInfo.isVip > 0"></i>
            <i class="layui-badge fly-badge-vip layui-hide-xs" v-show="userInfo.isVip > 0">VIP{{ userInfo.isVip }}</i>
          </a>
          <img :src="userInfo.pic" />
        </div>
        <template v-if="isShow">
          <dl class="layui-nav-child">
            <dd><i class="layui-icon layui-icon-email"></i><span>基本设置</span></dd>
            <dd><i class="layui-icon layui-icon-set"></i><span>我的消息</span></dd>
            <dd><i class="layui-icon layui-icon-home"></i><span>我的主页</span></dd>
            <dd @click="logout">
              <span>退出</span>
            </dd>
          </dl>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      isShow: false,
      showInterval: null
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo || { username: '', isVip: 0, nick: '', pic: '' }
    },
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  methods: {
    show() {
      console.log('show')
      clearTimeout(this.showInterval)
      this.showInterval = setTimeout(() => {
        this.isShow = true
      }, 200)
    },
    hide() {
      console.log('hide')
      clearTimeout(this.showInterval)
      this.showInterval = setTimeout(() => {
        this.isShow = false
      }, 500)
    },
    logout() {
      this.$confirm(
        '确定退出么？',
        () => {
          localStorage.clear()
          this.$store.commit('setToken', '')
          this.$store.commit('setUserInfo', '')
          this.$store.commit('setIsLogin', false)
          this.$router.push({ name: 'index' })
        },
        () => {}
      )
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
    .user-list
      position absolute
      right 0
      height 60px
      .user-info
        display flex
        align-items center
        height 100%
        >img
          height 80%
          border-radius 50%
        .layui-badge
          position relative
        a, p
          padding 0 2px 0 2px
        p
          font-size 20px
      .layui-nav-child
        display block
        dd
          display flex
          justify-content center
          cursor pointer
          color #999
          i, span
            margin-right 5px
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
