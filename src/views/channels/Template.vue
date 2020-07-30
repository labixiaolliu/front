<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-xs8 layui-col-sm8 layui-col-md8">
        <gg-list></gg-list>
      </div>
      <div class="layui-col-xs4 layui-col-sm4 layui-col-md4">
        <gg-sign></gg-sign>
        <gg-ads></gg-ads>
        <gg-links></gg-links>
      </div>
    </div>
  </div>
</template>
<script>
import List from '@/components/List.vue'
import Ads from '@/components/slider/Ads.vue'
import Sign from '@/components/slider/Sign.vue'
import Links from '@/components/slider/Links.vue'
export default {
  name: 'Template',
  data() {
    return {}
  },
  components: {
    'gg-list': List,
    'gg-links': Links,
    'gg-ads': Ads,
    'gg-sign': Sign
  }
}
</script>
<style scoped lang="stylus"></style>
