<template>
  <div class="fly-foot">
    <p>
      <a href="http://fly.layui.com/" target="_blank">Imooc社区</a> 2017 &copy;
      <a href="http://www.layui.com/" target="_blank">Imooc.com 出品</a>
    </p>
    <p>
      <a href="http://fly.layui.com/jie/3147/" target="_blank">付费计划</a>
      <a href="http://www.layui.com/template/fly/" target="_blank">获取Fly社区模版</a>
      <a href="http://fly.layui.com/jie/2461/" target="_blank">微信公众号</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style lang="stylus" scoped>
.fly-foot
  position relative
  margin-top 15px
  width 100%
  height 60px
  color #737573
  font-family Courier New
  p
    display flex
    justify-content center
    align-items center
    height 30px
    line-height 30px
    >a
      margin 0 10px 0 10px
</style>
