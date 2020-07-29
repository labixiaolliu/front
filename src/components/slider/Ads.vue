<template>
  <div class="ad-item">
    <dl>
      <dt>广告区域</dt>
      <dd>
        <button type="button" class="layui-btn">LayIM3.0 - layUI 旗舰之作</button>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'Ads',
  data() {
    return {}
  }
}
</script>
<style scoped lang="stylus">
@import '../../assets/styl/color.styl'
@import '../../assets/styl/mixins.styl'

.ad-item
  background #ffffff
  margin-top 10px
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
      color #ffffff
      cursor pointer
      display flex
      justify-content center
      align-items center
      width 100%
      height 100%
      button
        width 90%
        height 90%
        background #8bc34a
</style>
