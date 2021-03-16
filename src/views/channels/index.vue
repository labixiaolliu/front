<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-xs12 layui-col-sm12 layui-col-md8">
        <gg-top></gg-top>
        <gg-list></gg-list>
      </div>
      <div class="layui-col-xs12 layui-col-sm12 layui-col-md4">
        <gg-tips></gg-tips>
        <gg-sign></gg-sign>
        <gg-hot></gg-hot>
        <gg-ads></gg-ads>
        <gg-links></gg-links>
      </div>
    </div>
  </div>
</template>
<script>
import List from '@/components/List.vue'
import TopList from '@/components/TopList.vue'
import Tips from '@/components/slider/Tips.vue'
import Ads from '@/components/slider/Ads.vue'
import HotList from '@/components/slider/HotList.vue'
import Sign from '@/components/slider/Sign.vue'
import Links from '@/components/slider/Links.vue'
export default {
  name: 'index',
  data() {
    return {}
  },
  components: {
    'gg-list': List,
    'gg-top': TopList,
    'gg-tips': Tips,
    'gg-links': Links,
    'gg-ads': Ads,
    'gg-hot': HotList,
    'gg-sign': Sign
  }
}
</script>
<style scoped lang="stylus"></style>
