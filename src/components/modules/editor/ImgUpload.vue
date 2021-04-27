<template>
  <transition name="fade">
    <div class="layui-layer layui-edit-img" v-show="isSHow">
      <div class="layui-form layui-pane">
        <div class="layui-form-item layui-unselect fly-edit">
          <label class="layui-form-label title">插入图片</label>
          <span class="layui-layer-setwin"></span>
        </div>
        <div class="layui-form-item layui-form-pane">
          <label class="layui-form-label">URL</label>
          <div class="layui-input-inline pic-input">
            <input
              type="text"
              id="picUrl"
              name="pic"
              v-model="pic"
              placeholder="请输入图片链接"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="layui-input-inline">
            <label class="layui-btn layui-btn-primary" for="pic">
              <i class="layui-icon layui-icon-upload-drag"></i> 上传头像
              <input type="file" id="pic" name="file" accept="image/png, image/jpg, image/gif" @change="upload" />
            </label>
          </div>
        </div>
        <div class="layui-form-item submit-btn">
          <div class="layui-btn" @click="submit">确定</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { uploadPic } from '@/api/content'
import config from '@/config'
export default {
  name: 'ImgUpload',
  props: {
    isSHow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pic: '',
      formData: ''
    }
  },
  methods: {
    upload(e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      this.formData = formData
      uploadPic(this.formData).then((res) => {
        if (res.code === 200) {
          let basePath = process.env.NODE_ENV === 'production' ? config.baseUrl.prod : config.baseUrl.dev
          this.pic = `${basePath}/${res.data}`
        }
      })
    },
    submit() {
      if (!this.pic) {
        document.getElementById('picUrl').focus()
        this.$pop('shake', '图片路径为空！')
        return
      }
      this.$emit('addImgEvent', ` img[${this.pic}]`)
      setTimeout(() => {
        this.pic = ''
        this.formData = ''
        this.$emit('closeEvent')
      }, 0)
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
  width 678px
  border 1px solid #D9D9D9
  background-color #fff
.title
  text-align left
#pic
  display none
.layui-form-item .layui-input-inline
  width 120px
.layui-form-item .pic-input
  width 400px
.submit-btn
  display flex
  justify-content center
.layui-form-pane
  padding 0 10px 0 20px
.fly-edit
  border none
</style>
