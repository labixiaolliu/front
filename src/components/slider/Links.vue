<template>
  <div class="tips-item">
    <dl>
      <dt>友情链接</dt>
      <dd>
        <a v-for="(item, index) of list" :key="'link' + index" :href="item.link">{{ item.title }}</a>
      </dd>
    </dl>
  </div>
</template>
<script>
import { getLinks } from '../../api/content'
export default {
  name: 'Tips',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    getLinks().then((res) => {
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

.tips-item
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
      color $blueFontColor
      cursor pointer
      margin 2px 0 5px 5px
      display flex
      flex-wrap wrap
      a
        padding 3px 5px
        margin 5px 5px
</style>
