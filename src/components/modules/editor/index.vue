<template>
  <div class="edit-wrap" :class="{ 'pre-hide': isHide }">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit">
          <div ref="icons">
            <span><i class="layui-icon layui-icon-face-smile" @click="chooseIcon(0)"></i></span>
            <span><i class="layui-icon layui-icon-picture" @click="chooseIcon(1)"></i></span>
            <span><i class="layui-icon layui-icon-link" @click="chooseIcon(2)"></i></span>
            <span @click="chooseIcon(3)">”</span>
            <span @click="chooseIcon(4)"><i class="layui-icon layui-icon-fonts-code"></i></span>
            <span @click="addHr">hr</span>
            <span @click="chooseIcon(5)"><i class="layui-icon layui-icon-layouts"></i></span>
          </div>
        </div>
        <textarea
          id="edit"
          name="desc"
          placeholder="详细描述"
          class="layui-textarea desc"
          v-model="desc"
          @focus="focusEvent"
          @blur="blurEvent"
        ></textarea>
      </div>
    </div>
    <div ref="content">
      <face :isSHow="currentIndex === 0" @closeEvent="closeModule" @addFaceEvent="addEvent"></face>
      <img-upload :isSHow="currentIndex === 1" @closeEvent="closeModule" @addImgEvent="addEvent"></img-upload>
      <link-add :isSHow="currentIndex === 2" @closeEvent="closeModule" @addLinkEvent="addEvent"></link-add>
      <quote :isSHow="currentIndex === 3" @closeEvent="closeModule" @addQuoteEvent="addEvent"></quote>
      <code-add :isSHow="currentIndex === 4" @closeEvent="closeModule" @addCodeEvent="addEvent"></code-add>
      <preview :isSHow="currentIndex === 5" @closeEvent="closeModule" :content="desc"></preview>
    </div>
  </div>
</template>
<script>
import Face from './Face'
import ImgUpload from './ImgUpload'
import LinkAdd from './LinkAdd'
import Quote from './Quote'
import CodeAdd from './CodeAdd'
import Preview from './Preview'
export default {
  name: 'Editor',
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    Quote,
    CodeAdd,
    Preview
  },
  props: ['initContent'],
  computed: {
    isHide() {
      return this.$store.state.isHide
    }
  },
  data() {
    return {
      desc: '',
      currentIndex: '',
      pos: 0
    }
  },
  watch: {
    currentIndex(newVal, oldVal) {
      console.log(oldVal)
      if (newVal === 5) {
        this.$store.commit('setIsHide', true)
      } else {
        this.$store.commit('setIsHide', false)
      }
    },
    initContent(newVal) {
      // alert(newVal)
      // console.log('old' + oldVal)
      // console.log('new' + newVal)
      this.desc = newVal
    }
  },
  methods: {
    chooseIcon(index) {
      if (index === this.currentIndex) {
        this.currentIndex = ''
      } else {
        this.currentIndex = index
      }
    },
    closeModule() {
      this.currentIndex = ''
    },
    addEvent(content) {
      this.insert(content)
      this.pos += content.length
    },
    focusEvent() {
      this.getPos()
    },
    blurEvent() {
      this.getPos()
    },
    getPos() {
      let cursorPos = 0
      let elem = document.getElementById('edit')
      if (document.selection) {
        // IE
        let selectRange = document.selection.createRange()
        selectRange.moveStart('character', -elem.value.length)
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.selectionStart === '0') {
        cursorPos = elem.selectionStart
      }
      this.pos = cursorPos
    },
    insert(content) {
      if (typeof content === 'undefined') {
        return
      }
      let temp = this.desc.split('')
      temp.splice(this.pos, 0, content)
      this.desc = temp.join('')
    },
    openOrCloseImg() {
      this.showImg = !this.showImg
    },
    closeImg() {
      this.showImg = false
    },
    addHr() {
      let content = `\n[hr]`
      this.insert(content)
      this.pos += content.length
    },
    handleBodyClick(e) {
      e.stopPropagation()
      if (!(this.$refs.icons.contains(e.target) || this.$refs.content.contains(e.target))) {
        this.closeModule()
      }
    }
  },
  updated() {
    this.$emit('changeContent', this.desc)
  },
  mounted() {
    // alert(this.initContent)
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  beforeDestroy() {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>
<style scoped lang="stylus">
@keyframes bounceIn
  0%
    opacity 0
    transform scale(0.5)
  100%
    opacity 1
    transform scale(1)
@keyframes bounceOut
  0%
    transform scale(1)
  30%
    transform scale(1.05)
  100%
    opacity 0
    transform scale(0.7)
.fade-leave-active
  animation bounceOut 0.3s
.fade-enter-to, .fade-enter-active
  animation bounceIn 0.3s
.edit-wrap
  position relative
.layui-input-block
  margin-left 0
.desc
  height 260px
</style>
