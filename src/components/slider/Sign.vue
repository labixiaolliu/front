<template>
  <div class="sign-item">
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <li :class="index === 0 ? 'layui-this' : ''" @click="selectIndex(0)">签到</li>
        <li class="ui-line"></li>
        <li :class="index === 1 ? 'layui-this' : ''" @click="showMask">说明</li>
        <li class="ui-line"></li>
        <li :class="index === 2 ? 'layui-this' : ''" @click="showListMask">
          活跃榜<span class="layui-badge-dot"></span>
        </li>
        <li class="other">
          您已连续签到<span>{{ count }}</span
          >天
        </li>
      </ul>
      <div class="layui-tab-content">
        <template v-if="!isSign">
          <div class="layui-tab-item sign layui-show">
            <button type="button" class="layui-btn layui-btn-danger" @click="sign">今日签到</button>
            <label
              >可获得<span>{{ fav }}</span
              >飞吻</label
            >
          </div>
        </template>
        <template v-else>
          <div class="layui-tab-item sign layui-show">
            <button type="button" class="layui-btn layui-btn-disabled">已签到,还差{{ nextTime }}可再次签到</button>
            <label
              >已获得<span>{{ fav }}</span
              >飞吻</label
            >
          </div>
        </template>
      </div>
    </div>
    <sign-info :isShow="isShow" @closeMask="closeMask"></sign-info>
    <sign-list :isShow="isListShow" @closeListMask="closeListMask"></sign-list>
  </div>
</template>
<script>
import SignInfo from './SignInfo'
import SignList from './SignList'
import { userSign } from '../../api/user'
import moment from 'moment'
export default {
  name: 'Sign',
  components: {
    SignInfo,
    SignList
  },
  data() {
    return {
      index: 0,
      isShow: false,
      isListShow: false,
      // isSign: this.$store.state.userInfo.isSign ? this.$store.state.userInfo.isSign : false,
      isLogin: this.$store.state.isLogin,
      // nextTime: '00:00:08',
      seconds: 0,
      secondInterval: null
    }
  },
  computed: {
    isSign() {
      return this.$store.state.userInfo.isSign ? this.$store.state.userInfo.isSign : false
    },
    count() {
      if (this.isLogin) {
        // 已经登陆
        const user = this.$store.state.userInfo
        if (!user.isSign && !user.isLastSign) {
          // 今日未签到，且之前没有连续签到，取0
          return 0
        } else {
          // 今日已经签到，直接取user.count
          // 今日未签到，且之前是连续签到的，取count为user.count
          return user.count
        }
      } else {
        // 未登录
        return 0
      }
    },
    fav() {
      let count = this.count
      const user = this.$store.state.userInfo
      if (!user.isSign && user.isLastSign) {
        count++
      }
      // 今日未签到，且之前连续签到，count+1
      // const user = this.$store.state.userInfo
      // if (this.isLogin && user.isLastSign &&)
      if (count < 5) {
        return 5
      } else if (count >= 5 && count < 15) {
        return 10
      } else if (count >= 15 && count < 30) {
        return 15
      } else if (count >= 30 && count < 100) {
        return 20
      } else if (count >= 100 && count < 365) {
        return 30
      } else {
        return 50
      }
    },
    nextTime() {
      if (this.seconds === -1) {
        clearInterval(this.secondInterval)
        const user = this.$store.state.userInfo
        user.isSign = false
        this.$store.commit('setUserInfo', user)
        return ''
      } else {
        return this.formatLastTime(this.seconds)
      }
    }
  },
  methods: {
    formatLastTime(seconds) {
      let dur = moment.duration(seconds, 'seconds')
      let hour = (dur.hours() + '').padStart(2, '0')
      let minute = (dur.minutes() + '').padStart(2, '0')
      let second = (dur.seconds() + '').padStart(2, '0')
      return `${hour}:${minute}:${second}`
    },
    selectIndex(index) {
      this.index = index
    },
    showMask() {
      this.isShow = true
    },
    closeMask() {
      this.isShow = false
    },
    showListMask() {
      this.isListShow = true
    },
    closeListMask() {
      this.isListShow = false
    },
    sign() {
      if (this.isLogin) {
        userSign().then((res) => {
          const user = this.$store.state.userInfo
          if (res.code === 200) {
            user.isSign = true
            user.favs = res.fav
            user.count = res.count
            this.$pop('', '签到成功！')
            // const newUser = this.$store.state.userInfo
          }
          user.lastSign = res.lastSign
          this.$store.commit('setUserInfo', user)
        })
      } else {
        console.log(this)
        console.log(this.$alert)
        console.log(this.$pop)
        this.$pop('shake', '请先登录')
      }
    }
  },
  mounted() {
    // 当已签到的时候，去判断当前日期和签到日期是否有时间差，有的话说明又可以签到了
    const userInfo = this.$store.state.userInfo
    if (userInfo.lastSign && moment().diff(moment(userInfo.lastSign), 'days') > 0) {
      // 又过一天了，可以再次签到了
      this.userInfo.isSign = true
      this.$store.commit('setUserInfo', userInfo)
    } else {
      let tomorrowStr = moment()
        .add(1, 'day')
        .format('YYYY-MM-DD 00:00:00')
      let tomorrow = moment(tomorrowStr)
      this.seconds = tomorrow.diff(moment(), 'seconds')
      // this.seconds = 5
      this.secondInterval = setInterval(() => {
        this.seconds--
      }, 1000)
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/styl/color.styl'

@keyframes bounceIn
  0%
    opacity 0
    transform scale(0.5)
  100%
    opacity 1
    transform scale(1)
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
  .mask
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background #000000
    opacity 0.8
    z-index 20000
  .info
    background #ffffff
    position fixed
    width 300px
    height 480px
    top 50%
    left 50%
    margin-left -150px
    margin-top -240px
    z-index 20001
    color #333
    &.active
      animation-duration 0.2s
      animation-fill-mode both
      animation-name bounceIn
    .layui-layer-title
      padding 10px 20px
    .layui-table
      padding 0 10px
    .layui-tab-content
      padding 0 !important
      ul
        width 100%
        height 350px
        overflow-y auto
        li
          width 100%
          height 64px
          line-height 64px
          border-bottom 1px solid #eeeeee
          &:last-child
            border-bottom none
          img
            height 50px
            padding 0 10px
</style>
