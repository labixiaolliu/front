<template>
  <div class="layui-layer layui-edit-img">
    <div class="layui-form layui-pane">
      <div class="layui-form-item layui-unselect fly-edit">
        <label class="layui-form-label title">回答问题</label>
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
        <p v-for="(subitem, subindex) of item.endAnswer" :key="'subAns' + subindex">
          {{ subitem.index }}.{{ subitem.answer }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { getAnswer } from '../api/content'
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
      getAnswer({ questions: this.questions }).then((res) => {
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
</style>
