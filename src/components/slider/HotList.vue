<template>
  <div class="hot-item">
    <dl>
      <dt>本周热议</dt>
      <dd v-for="(item, index) of list" :key="'top' + index">
        <span>{{ item.title }}</span>
        <i class="layui-icon layui-icon-reply-fill"></i>
        <a>{{ item.answer }}</a>
      </dd>
    </dl>
  </div>
</template>
<script>
import { getTop } from '../../api/content'
export default {
  name: 'HotList',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    getTop().then((res) => {
      if (res.code === 200) {
        this.list = res.data
      }
    })
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
        // width 60%
        display block
        margin-right 10px
        ellipsis()
      >i, >a
        color #999
      >a
        margin-right 10px
</style>
