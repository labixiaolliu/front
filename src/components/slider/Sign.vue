<template>
  <div class="sign-item">
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <li :class="index === 0 ? 'layui-this' : ''" @click="selectIndex(0)">签到</li>
        <li class="ui-line"></li>
        <li :class="index === 1 ? 'layui-this' : ''" @click="selectIndex(1)">说明</li>
        <li class="ui-line"></li>
        <li :class="index === 2 ? 'layui-this' : ''" @click="selectIndex(2)">
          活跃榜<span class="layui-badge-dot"></span>
        </li>
        <li class="other">您已连续签到<span>16</span>天</li>
      </ul>
      <div class="layui-tab-content">
        <div class="layui-tab-item sign" :class="index === 0 ? 'layui-show' : ''">
          <button type="button" class="layui-btn layui-btn-danger">今日签到</button>
          <label>可获得<span>5</span>飞吻</label>
        </div>
        <div class="layui-tab-item" :class="index === 1 ? 'layui-show' : ''">2</div>
        <div class="layui-tab-item" :class="index === 2 ? 'layui-show' : ''">3</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sign',
  data() {
    return {
      index: 0
    }
  },
  methods: {
    selectIndex(index) {
      this.index = index
    }
  }
}
</script>
<style scoped lang="stylus">
@import '../../assets/styl/color.styl'

.sign-item
  background #ffffff
  .layui-tab-title
    border-bottom-width 0px
    &:after
      content ''
      display block
      width 96%
      margin-left 2%
      height 1px
      background #e2e2e2
    li
      min-width 0px
      color $blueFontColor
      font-size 13px
      span
        color $orangeFontColor
        margin 0 2px
      .layui-badge-dot
        left 1px
        top -4px
    .layui-this, .other
      color #000000
    .layui-this:after
      border-bottom 0px solid #5FB878
    .ui-line
      padding 0
      margin 0
      width 1px
      height 10px
      background #e2e2e2
  .layui-tab-content .sign
    display flex !important
    justify-content center
    align-items center
    >div
      margin 10px 10px
    >label
      margin 10px 10px
      span
        color $orangeFontColor
        margin 0 5px
</style>
