<template>
  <div class="layui-layer layui-edit-img">
    <div class="layui-form layui-pane">
      <div class="layui-form-item layui-unselect fly-edit">
        <label class="layui-form-label title">考试回答问题</label>
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
    <div v-if="answers.length > 0" class="answer-body">
      <div v-for="(item, index) of answers" :key="'answer' + index">
        <div>
          <span>{{ index + 1 }}.</span>{{ item.title }}【{{ item.tktype_name }}】
        </div>
        <p>
          <span v-for="(subitem, subindex) of item.answer" :key="'subAns' + subindex">{{ subitem }},</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { getRealAnswer } from '../api/content'
export default {
  name: '',
  data() {
    return {
      questions: '',
      answers: []
    }
  },
  methods: {
    submit() {
      getRealAnswer({ questions: this.questions }).then((res) => {
        if (res.code === 200) {
          this.$pop('', 'Success')
          // this.questions = ''
          this.answers = res.questions
        } else {
          this.$alert(res.msg)
        }
      })
    },
    cancel() {}
  }
}
</script>
<style scoped lang="stylus">
.answer-body
  margin-left 30px
  >div
    margin 20px 0 20px 0
    >p
      margin-left 20px
  span
    color red
    font-size 30px
</style>
