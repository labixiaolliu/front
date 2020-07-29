<template>
  <div>
    <gg-pannel></gg-pannel>
    <div class="layui-container">
      <div class="layui-row">
        <div class="layui-col-xs8 layui-col-sm8 layui-col-md8">
          列表
        </div>
        <div class="layui-col-xs4 layui-col-sm4 layui-col-md4">
          <gg-tips></gg-tips>
          <gg-sign></gg-sign>
          <gg-hot></gg-hot>
          <gg-ads></gg-ads>
          <gg-links></gg-links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pannel from '@/components/Pannel.vue'
import Tips from '@/components/slider/Tips.vue'
import Ads from '@/components/slider/Ads.vue'
import HotList from '@/components/slider/HotList.vue'
import Sign from '@/components/slider/Sign.vue'
import Links from '@/components/slider/Links.vue'
export default {
  name: 'Home',
  components: {
    'gg-pannel': Pannel,
    'gg-tips': Tips,
    'gg-links': Links,
    'gg-ads': Ads,
    'gg-hot': HotList,
    'gg-sign': Sign
  }
}
</script>
<style lang="stylus" scoped></style>
