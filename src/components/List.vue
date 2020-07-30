<template>
  <div class="top-list-item">
    <dl>
      <dt class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <li class="layui-this">综合</li>
          <li>未结</li>
          <li>已结</li>
          <li>精华</li>
        </ul>
        <ul class="layui-tab-title">
          <li class="layui-this">按最新</li>
          <li>按热议</li>
        </ul>
      </dt>
      <dd>
        <img src="../assets/images/avatar/0.jpg" />
        <div>
          <div class="top">
            <a class="layui-badge">动态</a>
            <a class="title">基于layui的极简社区页面模版</a>
          </div>
          <div class="bottom">
            <p class="name">贤心</p>
            <i class="iconfont icon-renzheng" title="认证信息"></i>
            <span class="layui-badge fly-badge-accept layui-hide-xs vip-level">VIP3</span>
            <span class="time grey">刚刚</span>
            <i class="iconfont icon-kiss red"></i>
            <span class="red kiss-num">60</span>
            <span class="layui-badge fly-badge-accept layui-hide-xs status">已结</span>
          </div>
        </div>
      </dd>
      <dd>
        <img src="../assets/images/avatar/0.jpg" />
        <div>
          <div class="top">
            <a class="layui-badge">动态</a>
            <a class="title">基于layui的极简社区页面模版</a>
          </div>
          <div class="bottom">
            <p class="name">贤心</p>
            <i class="iconfont icon-renzheng" title="认证信息"></i>
            <span class="layui-badge fly-badge-accept layui-hide-xs vip-level">VIP3</span>
            <span class="time grey">刚刚</span>
            <i class="iconfont icon-kiss red"></i>
            <span class="red kiss-num">60</span>
            <span class="layui-badge fly-badge-accept layui-hide-xs status">已结</span>
          </div>
        </div>
      </dd>
      <dd>
        <img src="../assets/images/avatar/0.jpg" />
        <div>
          <div class="top">
            <a class="layui-badge">动态</a>
            <a class="title">基于layui的极简社区页面模版</a>
          </div>
          <div class="bottom">
            <p class="name">贤心</p>
            <i class="iconfont icon-renzheng" title="认证信息"></i>
            <span class="layui-badge fly-badge-accept layui-hide-xs vip-level">VIP3</span>
            <span class="time grey">刚刚</span>
            <i class="iconfont icon-kiss red"></i>
            <span class="red kiss-num">60</span>
            <span class="layui-badge fly-badge-accept layui-hide-xs status">已结</span>
          </div>
        </div>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'List',
  data() {
    return {}
  }
}
</script>
<style scoped lang="stylus">
.top-list-item
  background #ffffff
  margin-top 10px
  dl
    padding-bottom 8px
    overflow hidden
    dt
      color #000000
      padding 10px 0px 10px 0px
      // margin-left 20px
      width 100%
      display flex
      flex-wrap wrap
      justify-content space-between
      &:after
        content ''
        width 100%
        height 1px
        background #e2e2e2
        // display block
        margin 6px 0 0px 0px
      .layui-tab-title
        border-bottom-width 0px
      .layui-this:after
        border-bottom-width 0px
      .layui-tab-title li
        min-width 20px
    dd
      display flex
      align-items center
      flex-wrap wrap
      &:after
        content ''
        width 100%
        height 1px
        background #e2e2e2
        // display block
        margin 6px 0 6px 0px
      >img
        height 55px
        margin 0 20px 0 20px
      >div
        display flex
        flex-direction column
        height 100%
        .top
          height 50%
          display flex
          align-items center
          a
            padding 0 2px 0 5px
          .title
            font-weight bold
            font-size 1.3em
        .bottom
          height 40%
          display flex
          align-items flex-end
          .name
            margin 0 0 0 5px
          .icon-renzheng
            margin 0 3px 0 2px
          .vip-level
            margin 0 5px 0 3px
          .time
            margin 0 5px 0 5px
          .icon-kiss
            margin 0 2px 0 5px
          .kiss-num
            margin 0 5px 0 2px
          .status
            margin 0 5px 0 5px
          .grey
            color #e3e3e3
          .red
            color red
</style>
