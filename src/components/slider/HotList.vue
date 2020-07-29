<template>
  <div class="hot-item">
    <dl>
      <dt>本周热议</dt>
      <dd>
        <span>Layui的gitHub以及各方面的知识大集合</span>
        <i class="layui-icon layui-icon-reply-fill"></i>
        <a>16</a>
      </dd>
      <dd>
        <span>Layui的gitHub以及各方面的知识大集合</span>
        <i class="layui-icon layui-icon-reply-fill"></i>
        <a>16</a>
      </dd>
      <dd>
        <span>Layui的gitHub以及各方面的知识大集合</span>
        <i class="layui-icon layui-icon-reply-fill"></i>
        <a>16</a>
      </dd>
      <dd>
        <span>Layui的gitHub以及各方面的知识大集合</span>
        <i class="layui-icon layui-icon-reply-fill"></i>
        <a>16</a>
      </dd>
      <dd>
        <span>Layui的gitHub以及各方面的知识大集合</span>
        <i class="layui-icon layui-icon-reply-fill"></i>
        <a>16</a>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'HotList',
  data() {
    return {}
  }
}
</script>
<style scoped lang="stylus">
@import '../../assets/styl/color.styl'
@import '../../assets/styl/mixins.styl'

.hot-item
  background #ffffff
  dl
    padding-left 20px
    padding-bottom 8px
    overflow hidden
    dt
      color #000000
      padding 10px 0px
      &:after
        content ''
        width 96%
        height 1px
        background #e2e2e2
        margin-left 1%
        display block
        margin 10px 0 0px 0
    dd
      color #000000
      cursor pointer
      margin 2px 0 5px 5px
      display flex
      >span
        width 60%
        display block
        ellipsis()
      >i, >a
        color #e2e2e2
</style>
