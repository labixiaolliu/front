<template>
  <div class="panel">
    <div class="layui-tab layui-tab-brief left-panel" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <router-link tag="li" to="/">首页</router-link>
        <router-link tag="li" to="/index/ask">提问</router-link>
        <router-link tag="li" to="/index/share">分享</router-link>
        <router-link tag="li" to="/index/discuss">讨论</router-link>
        <router-link tag="li" to="/index/advise">建议</router-link>
        <router-link tag="li" to="/index/notice">公告</router-link>
        <router-link tag="li" to="/index/logs">动态</router-link>
        <li class="line"></li>
        <template v-if="isLogin">
          <li>我发表的帖</li>
          <li>我收藏的帖</li>
        </template>
      </ul>
    </div>
    <div class="right-panel layui-hide-xs">
      <span class="layui-icon layui-icon-search"></span>
      <a href="" class="layui-btn">发表新帖</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pannel',
  data() {
    return {
      isLogin: this.$store.state.isLogin
    }
  }
}
</script>
<style scoped lang="stylus">
@media (max-width: 768px)
  .panel
    height auto !important
    li
      width 33%
.panel
  height 50px
  line-height 50px
  margin-bottom 15px
  border-radius 2px
  background-color #fff
  box-shadow 0px 1px 2px 0px rgb(226, 226, 226, 0.05)
  position relative
  display flex
  justify-content space-between
  align-items center
  .left-panel
    background #ffffff
    .layui-tab-title .layui-this:after, .layui-tab-title
      border-bottom-width 0px
    .layui-tab-title li
      min-width 40px
  .right-panel
    display flex
    justify-content flex-end
    align-items center
    span
      margin 0 8px 0 2px
    a
      margin 0 8px 0 2px
</style>
