<template>
  <div class="top-list-item" v-if="list.length > 0">
    <div class="item">
      <div class="title">置顶</div>
      <list-item :list="list" :isEnd="true"></list-item>
    </div>
  </div>
</template>
<script>
import ListItem from './ListItem'
import contentListMixins from '../mixins/contentListMixins'
export default {
  name: 'TopList',
  mixins: [contentListMixins],
  data() {
    return {
      isTop: 1,
      page: 0,
      limit: 5
    }
  },
  components: {
    ListItem
  }
}
</script>
<style scoped lang="stylus">
.top-list-item
  background #ffffff
  .item
    // padding-left 20px
    padding-bottom 8px
    overflow hidden
    .title
      color #000000
      padding 10px 0px 10px 0px
      margin-left 20px
      width 100%
      &:after
        content ''
        width 100%
        height 1px
        background #e2e2e2
        display block
        margin 6px 0 10px -20px
</style>
