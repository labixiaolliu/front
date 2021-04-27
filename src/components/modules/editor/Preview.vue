<template>
  <transition name="fade">
    <div class="layui-layer layui-edit-preview" v-if="isSHow">
      <div class="layui-content layui-pane">
        <div class="layui-row layui-unselect fly-edit">
          <label class="layui-form-label title">预览</label>
          <span class="layui-icon layui-icon-close" @click="closeEvent"></span>
        </div>
        <div class="preview">
          <div v-html="contentHtml"></div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { excapeHtml } from '@/utils/excapeHtml'
export default {
  name: 'Preview',
  props: {
    isSHow: {
      type: Boolean,
      default: false
    },
    content: String
  },
  computed: {
    contentHtml() {
      if (typeof this.content === 'undefined' || this.content.trim() === '') {
        return ''
      } else {
        return excapeHtml(this.content)
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    closeEvent() {
      this.$emit('closeEvent')
    }
  }
}
</script>
<style scoped lang="stylus">
.layui-edit-preview
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 99999
  max-width 1000px
.layui-content
  width 100%
  height 100%
.layui-icon-close
  float right
  color #222222
.preview
  flex 1
  background #fff
  padding 20px 20px
  overflow-y auto
  >>>pre
    position relative
    margin 10px 0
    padding 15px
    line-height 20px
    background #f2f2f2
    color #333
    font-family 'Courier New', Courier, monospace, serif
    font-size 12px
    border none
    border-left 5px solid #ddd
.layui-content
  display flex
  flex-direction column
</style>
