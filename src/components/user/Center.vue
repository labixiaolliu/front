<template>
  <div class="center-item fly-user-main">
    <div class="layui-cintrainer">
      <div class="layui-row title">
        <p>Hi,Admin,你已经是我们的会员了</p>
      </div>
      <div class="layui-row user-msg">
        <div class="left-msg">
          <p>我的会员信息</p>
          <div>
            <p>积分经验：{{ userInfo.favs }}</p>
            <p>您当前为：{{ userInfo.isVip === '0' ? '非VIP' : `VIP${userInfo.isVip}` }}</p>
          </div>
        </div>
        <div class="right-sign">
          <sign></sign>
        </div>
      </div>
      <div class="short-cut layui-row">
        <p>快捷方式</p>
        <div>
          <div class="layui-col-xs4 layui-col-sm3 line">
            <a><i class="layui-icon layui-icon-light"></i></a>
            <p>我的</p>
          </div>
          <div class="layui-col-xs4 layui-col-sm3 line">
            <a><i class="layui-icon layui-icon-light"></i></a>
            <p>我的</p>
          </div>
          <div class="layui-col-xs4 layui-col-sm3 line">
            <a><i class="layui-icon layui-icon-light"></i></a>
            <p>我的</p>
          </div>
          <div class="layui-col-xs4 layui-col-sm3 line">
            <a><i class="layui-icon layui-icon-light"></i></a>
            <p>我的</p>
          </div>
          <div class="layui-col-xs4 layui-col-sm3 line">
            <a><i class="layui-icon layui-icon-light"></i></a>
            <p>我的</p>
          </div>
          <div class="layui-col-xs4 layui-col-sm3 line">
            <a><i class="layui-icon layui-icon-light"></i></a>
            <p>我的</p>
          </div>
          <div class="layui-col-xs4 layui-col-sm3 line">
            <a><i class="layui-icon layui-icon-light"></i></a>
            <p>我的</p>
          </div>
          <div class="layui-col-xs4 layui-col-sm3 line">
            <a><i class="layui-icon layui-icon-light"></i></a>
            <p>我的</p>
          </div>
          <div class="layui-col-xs4 layui-col-sm3 line">
            <a><i class="layui-icon layui-icon-light"></i></a>
            <p>我的</p>
          </div>
          <div class="layui-col-xs4 layui-col-sm3 line">
            <a><i class="layui-icon layui-icon-light"></i></a>
            <p>我的</p>
          </div>
          <div class="layui-col-xs4 layui-col-sm3 line">
            <a><i class="layui-icon layui-icon-light"></i></a>
            <p>我的</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sign from '../slider/Sign'
import { getUserInfo } from '../../api/user'
export default {
  name: 'UserCenter',
  components: {
    Sign
  },
  data() {
    return {}
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    getUserInfo() {
      const userInfo = this.$store.state.userInfo
      getUserInfo({ uid: userInfo._id }).then((res) => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', res.data)
        } else {
          this.$pop('', res.msg)
        }
      })
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>
<style scoped lang="stylus">
@import '../../assets/styl/color.styl'

@media (max-width: 768px)
  .center-item
    margin-left 0px !important
  .left-msg
    width 100% !important
  .user-msg
    flex-wrap wrap !important
  .right-sign
    width 100% !important
.center-item
  margin-left 222px
  background white
  padding-bottom 10px
  .title
    padding 20px 0px
    >p
      margin 0px 15px
      padding 0 10px
      background #f9f9f9
      height 40px
      line-height 40px
      color #666
  .user-msg
    display flex
    padding 0px 0px 10px 0px
    justify-content space-between
    .left-msg
      width 47%
      border 1px solid #e2e2e2
      border-radius 2px
      display flex
      flex-direction column
      >p
        padding 0 10px
        color #666
        border-bottom 1px dashed #e2e2e2
        height 50px
        line-height 50px
      >div
        padding 0 10px
        display flex
        flex-direction column
        justify-content center
        flex 1
        >p
          color #999
    .right-sign
      width 47%
      border 1px solid #e2e2e2
      border-radius 2px
  .short-cut
    margin 0 16px
    border 1px solid #e2e2e2
    border-radius 2px
    padding 0 10px 10px 0px
    >p
      color #999
      height 50px
      line-height 50px
      padding 0 10px
    .line
      display flex
      flex-direction column
      a
        flex 1
        background $blueFontColor
        padding 30px 10px
        display flex
        justify-content center
        align-items center
        margin 10px 10px
        i
          font-size 30px
          color #fff
      p
        height 30px
        line-height 30px
        text-align center
</style>
