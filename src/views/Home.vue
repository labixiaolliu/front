<template>
  <div>
    <gg-pannel></gg-pannel>
    <router-view></router-view>
  </div>
</template>

<script>
import Pannel from '@/components/Pannel.vue'
export default {
  name: 'Home',
  components: {
    'gg-pannel': Pannel
  }
}
</script>
<style lang="stylus" scoped></style>
