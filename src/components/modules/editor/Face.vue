<template>
  <transition name="fade">
    <div class="layui-layer layui-layer-tips layui-edit-face" v-show="isSHow">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li v-for="(value, key) in list" :key="key" @click="choseFace(key)">
            <img :src="value" />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import face from '../../../assets/js/face'
export default {
  name: 'Face',
  data() {
    return {
      list: face
    }
  },
  props: {
    isSHow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    choseFace(key) {
      this.$emit('addFaceEvent', ` face${key}`)
      this.$emit('closeEvent')
    }
  }
}
</script>
<style scoped lang="stylus">
.layui-edit-face
  position absolute
  top 45px
  left 0
</style>
