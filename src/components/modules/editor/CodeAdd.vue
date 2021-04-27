<template>
  <transition name="fade">
    <div class="layui-layer layui-edit-img" v-show="isSHow">
      <div class="layui-form layui-pane">
        <div class="layui-form-item layui-unselect fly-edit">
          <label class="layui-form-label title">请输入代码内容</label>
          <span class="layui-layer-setwin"></span>
        </div>
        <div class="layui-form-item layui-form-pane layui-code0">
          <textarea type="text" id="codeUrl" name="code" v-model="code" class="layui-textarea"></textarea>
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
  name: 'CodeAdd',
  props: {
    isSHow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      code: ''
    }
  },
  methods: {
    submit() {
      if (!this.code) {
        this.$pop('shake', '请输入代码内容！')
        document.getElementById('codeUrl').focus()
        return
      }
      this.$emit('addCodeEvent', `\n[pre]\n${this.code}\n[/pre]`)
      setTimeout(() => {
        this.code = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel() {
      this.code = ''
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
  width 800px
  border 1px solid #D9D9D9
  background-color #fff
.layui-code0
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
