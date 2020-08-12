<template>
  <div class="account-item">
    <div class="qq-msg">
      <i class="iconfont icon-qq"></i>
      <p>已成功绑定，您可以使用QQ账号直接登录Imooc社区，当然您也可以</p>
      <a>解除绑定</a>
    </div>
    <div class="weibo-msg">
      <i class="iconfont icon-weibo"></i>
      <a>立即绑定，</a>
      <p>即可使用微博账号登陆Imooc社区</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Account',
  data() {
    return {}
  }
}
</script>
<style scoped lang="stylus">
@import '../../../assets/styl/color.styl'

.account-item
  margin-top 20px
  padding 0 20px
  >div
    background #f4f4f4
    padding 5px 10px
    margin 10px 5px
    display flex
    align-items center
    border-radius 2px
    a
      color $blueFontColor
      cursor pointer
      padding 0 4px
      &:hover
        color $blueBlurFontColor
  .qq-msg
    color #666
    i
      color $blueFontColor
  .weibo-msg
    color #999
</style>
