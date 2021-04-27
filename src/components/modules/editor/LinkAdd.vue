<template>
  <transition name="fade">
    <div class="layui-layer layui-edit-img" v-show="isSHow">
      <div class="layui-form layui-pane">
        <div class="layui-form-item layui-unselect fly-edit">
          <label class="layui-form-label title">请输入合法链接</label>
          <span class="layui-layer-setwin"></span>
        </div>
        <div class="layui-form-item layui-form-pane layui-link">
          <input
            type="text"
            id="linkUrl"
            name="link"
            v-model="link"
            placeholder="请输入链接"
            autocomplete="off"
            class="layui-input"
          />
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
  name: 'LinkAdd',
  props: {
    isSHow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      link: ''
    }
  },
  methods: {
    submit() {
      if (!this.link) {
        this.$pop('shake', '请输入合法链接！')
        document.getElementById('linkUrl').focus()
        return
      }
      this.$emit('addLinkEvent', ` a(${this.link})[${this.link}]`)
      setTimeout(() => {
        this.link = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel() {
      this.link = ''
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
.layui-link
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
