<template>
  <div class="top-list-item">
    <div class="item">
      <div class="layui-tab layui-tab-brief title" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <li
            v-for="(item, index) of tabList"
            :key="'tab' + index"
            :class="currentTabIndex === index ? 'layui-this' : ''"
            @click="selectTab(index)"
          >
            {{ item.name }}
          </li>
        </ul>
        <ul class="layui-tab-title">
          <li
            v-for="(item, index) of sortList"
            :key="'sort' + index"
            :class="currentSortIndex === index ? 'layui-this' : ''"
            @click="selectSort(index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <list-item @nextPage="nextPage" :list="list" :isEnd="isEnd"></list-item>
    </div>
  </div>
</template>
<script>
import ListItem from './ListItem'
import contentListMixins from '../mixins/contentListMixins'
export default {
  name: 'List',
  mixins: [contentListMixins],
  data() {
    return {
      isEnd: false,
      isLoad: false,
      currentTabIndex: 0,
      currentSortIndex: 0,
      tabList: [
        {
          name: '综合',
          value: ''
        },
        {
          name: '未结',
          value: ''
        },
        {
          name: '已结',
          value: ''
        },
        {
          name: '精华',
          value: ''
        }
      ],
      sortList: [
        {
          name: '按最新',
          value: 'created'
        },
        {
          name: '按热议',
          value: 'hot'
        }
      ],
      page: 0,
      limit: 20,
      catalog: '',
      sort: 'created',
      status: 0,
      isTop: 0
    }
  },
  components: {
    ListItem
  },
  methods: {
    selectTab(index) {
      this.currentTabIndex = index
    },
    selectSort(index) {
      this.currentSortIndex = index
    },
    nextPage() {
      if (this.isEnd) return
      if (this.isLoad) return
      this.page++
      this._getList()
    },
    init() {
      this.page = 0
      this.list = []
      this._getList()
    }
  },
  watch: {
    currentTabIndex(newValue, oldValue) {
      console.log('tab hange from ' + oldValue + ' to ' + newValue)
      this.status = newValue
      this.init()
    },
    currentSortIndex(newValue, oldValue) {
      console.log('sort hange from ' + oldValue + ' to ' + newValue)
      this.sort = this.sortList[newValue].value
      this.init()
    },
    $route(newValue) {
      this.catalog = newValue.params.catalog
      this.init()
    }
  }
}
</script>
<style scoped lang="stylus">
.top-list-item
  background #ffffff
  // margin-top 10px
  .item
    padding-bottom 8px
    overflow hidden
    .title
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
</style>
