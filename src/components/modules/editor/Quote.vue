<template>
  <transition name="fade">
    <div class="layui-layer layui-edit-img" v-show="isSHow">
      <div class="layui-form layui-pane">
        <div class="layui-form-item layui-unselect fly-edit">
          <label class="layui-form-label title">请输入引用内容</label>
          <span class="layui-layer-setwin"></span>
        </div>
        <div class="layui-form-item layui-form-pane layui-quote">
          <textarea type="text" id="quoteUrl" name="quote" v-model="quote" class="layui-textarea"></textarea>
        </div>
        <div class="layui-form-item layui-btns">
          <div class="layui-btn" @click="submit">确定</div>
          <div class="layui-btn layui-btn-primary" @click="cancel">取消</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Quote',
  props: {
    isSHow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      quote: ''
    }
  },
  methods: {
    submit() {
      if (!this.quote) {
        this.$pop('shake', '请输入引用内容！')
        document.getElementById('quoteUrl').focus()
        return
      }
      this.$emit('addQuoteEvent', `\n[quote]\n${this.quote}\n[/quote]`)
      setTimeout(() => {
        this.quote = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel() {
      this.quote = ''
      this.$emit('closeEvent')
    }
  }
}
</script>
<style scoped lang="stylus">
.layui-edit-img
  position absolute
  top 45px
  left 0
.layui-pane
  position relative
  width 400px
  border 1px solid #D9D9D9
  background-color #fff
.layui-quote
  padding 0 20px
.layui-btns
  display flex
  justify-content flex-end
  padding-right 20px
.layui-form-label
  width 120px
  text-align left
.fly-edit
  border none
</style>
