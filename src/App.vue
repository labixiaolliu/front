<template>
  <div id="app">
    <gg-header></gg-header>
    <router-view></router-view>
    <gg-footer></gg-footer>
  </div>
</template>
<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'app',
  components: {
    'gg-header': Header,
    'gg-footer': Footer
  }
}
</script>

<style lang="stylus">
@import 'assets/layui/css/layui.css'
// @import 'assets/css/iconfont.css'
@import 'assets/css/global.css'
@import 'assets/layui/css/modules/layer/default/layer.css'
</style>
