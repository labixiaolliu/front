<template>
  <div class="layui-layer layui-edit-img">
    <div class="layui-form layui-pane">
      <div class="layui-form-item layui-unselect fly-edit">
        <label class="layui-form-label title">添加问题</label>
        <span class="layui-layer-setwin"></span>
      </div>
      <div class="layui-form-item layui-form-pane layui-code0">
        <textarea type="text" id="questions" name="questions" v-model="questions" class="layui-textarea"></textarea>
      </div>
      <div class="layui-form-item layui-btns">
        <div class="layui-btn" @click="submit">确定</div>
        <div class="layui-btn layui-btn-primary" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import { addQuestions } from '../api/content'
export default {
  name: '',
  data() {
    return {
      questions: ''
    }
  },
  methods: {
    submit() {
      addQuestions({ questions: this.questions }).then((res) => {
        if (res.code === 200) {
          this.$pop('', 'Success')
          this.questions = ''
        } else {
          this.$alert(res.msg)
        }
      })
    },
    cancel() {}
  }
}
</script>
<style scoped lang="stylus"></style>
