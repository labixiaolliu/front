<template>
  <div class="model" v-show="isShow">
    <div class="mask" @click="closeMask"></div>
    <div class="info layui-layer layui-layer-page" :class="{ active: isShow }">
      <div class="layui-layer-title">
        签到说明
        <i class="layui-icon layui-icon-close pull-right" @click="closeMask"></i>
      </div>
      <div class="layui-layer-content">
        <div class="layui-text">
          <blockquote class="layui-elem-quote">"签到可获得的社区积分，规则如下"</blockquote>
          <table class="layui-table">
            <thead>
              <tr>
                <td>连续签到天数</td>
                <td>每天可获积分</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&lt;=5</td>
                <td>5</td>
              </tr>
              <tr>
                <td>&gt;=5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>&gt;=15</td>
                <td>15</td>
              </tr>
              <tr>
                <td>&gt;=30</td>
                <td>20</td>
              </tr>
              <tr>
                <td>&gt;=100</td>
                <td>30</td>
              </tr>
              <tr>
                <td>&gt;=365</td>
                <td>50</td>
              </tr>
            </tbody>
          </table>
          <div>
            <p>中间若有间隔，则连续天数重新计算</p>
            <p class="orange">不可复用程序自动签到，否则积分清零</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sign-info',
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {}
  },
  methods: {
    closeMask() {
      this.$emit('closeMask')
    }
  }
}
</script>
<style scoped lang="stylus"></style>
