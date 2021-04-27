<template>
  <div>
    <ul>
      <li v-for="(item, index) of items" :key="'list' + index">
        <img :src="item.uid.pic" />
        <div class="left-item">
          <div class="top">
            <a class="layui-badge">{{ item.catalog }}</a>
            <a class="title">{{ item.title }}</a>
          </div>
          <div class="bottom">
            <p class="name">{{ item.uid.name }}</p>
            <i class="iconfont icon-renzheng" title="认证信息"></i>
            <span class="layui-badge fly-badge-accept layui-hide-xs vip-level" v-if="item.uid.isVip > 0">{{
              'VIP' + item.uid.isVip
            }}</span>
            <span class="time grey">{{ item.created | moment }}</span>
            <i class="iconfont icon-kiss red"></i>
            <span class="red kiss-num">{{ item.fav }}</span>
            <span class="layui-badge fly-badge-accept layui-hide-xs status" v-if="item.isEnd !== '0'">已结</span>
          </div>
        </div>
        <div class="right-item">
          <div class="bar">
            <div class="type">
              <a class="layui-badge" v-for="(tag, subIndex) of item.tags" :key="'tag' + subIndex" :class="tag.class">{{
                tag.name
              }}</a>
            </div>
            <div class="count">
              <i class="layui-icon layui-icon-dialogue"></i>
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </li>
      <!-- <li>
        <img src="../assets/images/avatar/0.jpg" />
        <div class="left-item">
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
        <div class="right-item">
          <div class="bar">
            <div class="type">
              <a class="layui-badge">精品</a>
              <a class="layui-badge">etc</a>
            </div>
            <div class="count">
              <i class="layui-icon layui-icon-dialogue"></i>
              <p>66</p>
            </div>
          </div>
        </div>
      </li> -->
    </ul>
    <div class="more-bar">
      <button class="more" @click.prevent="more" v-if="!isEnd">查看更多</button>
      <p class="nomore" v-else>没有更多了</p>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
// import moment from 'moment'
// import 'moment/locale/zh-cn'
import moment from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
moment.extend(relativeTime)
export default {
  name: 'ListItem',
  props: {
    list: Array,
    isEnd: Boolean
  },
  data() {
    return {}
  },
  computed: {
    items() {
      _.map(this.list, (item) => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '讨论'
            break
        }
      })
      return this.list
    }
  },
  filters: {
    moment(date) {
      // 七天前，显示具体时间
      if (moment(date).isBefore(moment().subtract(7, 'days'))) {
        return moment(date).format('YYYY-MM-DD')
      } else {
        return moment(date)
          .locale('zh-cn')
          .from(moment())
      }
    }
  },
  methods: {
    more() {
      this.$emit('nextPage')
    }
  }
}
</script>
<style scoped lang="stylus">
@import '../assets/styl/color.styl'
@import '../assets/styl/mixins.styl'

li
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
    width 55px
    margin 0 15px 0 20px
  >.left-item
    display flex
    flex-direction column
    height 100%
    max-width 80%
    .top
      height 50%
      display flex
      align-items center
      .layui-badge
        flex 0 0 auto
      a
        padding 0 2px 0 5px
      .title
        font-weight bold
        font-size 1em
        ellipsis()
        display block
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
        color #999999
      .red
        color red
  .right-item
    flex 1
    display flex
    justify-content flex-end
    height 55px
    .bar
      display flex
      flex-direction column
      justify-content flex-start
      align-items flex-end
      padding-right 10px
      .type
        display flex
        align-items center
        height 50%
        >a
          margin 0 5px
      .count
        display flex
        height 50%
        align-items center
        >i, >p
          margin 0 2px
.more-bar
  display flex
  justify-content center
  align-items center
  .more
    padding 8px 5px
    background #ffffff
    color $greenFontColor
    border 1px solid $greenFontColor
    border-radius 2px
    cursor pointer
  .nomore
    width 100%
    display flex
    justify-content center
    align-items center
    padding 8px 5px
    color #999999
    font-size 1em
</style>
