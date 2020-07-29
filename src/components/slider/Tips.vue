<template>
  <div class="tips-item">
    <dl>
      <dt>温馨通道</dt>
      <dd>Layui的gitHub以及各方面的知识大集合以及各方面的知识大集合</dd>
      <dd>Layui的gitHub以及各方面的知识大集合</dd>
      <dd>Layui的gitHub以及各方面的知识大集合</dd>
      <dd>Layui的gitHub以及各方面的知识大集合</dd>
      <dd>Layui的gitHub以及各方面的知识大集合</dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'Tips',
  data() {
    return {}
  }
}
</script>
<style scoped lang="stylus">
@import '../../assets/styl/color.styl'
@import '../../assets/styl/mixins.styl'

.tips-item
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
      color $blueFontColor
      cursor pointer
      margin 2px 0 5px 5px
      ellipsis()
      &:hover
        color $blueBlurFontColor
      &:before
        content '●'
        margin-right 10px
        color #000000
</style>
