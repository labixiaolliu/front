<template>
  <div class="pic-item">
    <div class="upload-content">
      <div class="layui-form-item">
        <label class="layui-btn" for="pic">
          <i class="layui-icon layui-icon-upload-drag"></i> 上传头像
          <input type="file" id="pic" name="file" accept="image/png, image/jpg, image/gif" @change="upload" />
        </label>
      </div>
      <div class="layui-form-item">
        <label class="suggest">建议尺寸168*168，支持jpg、png、gif,最大不能超过50KB</label>
      </div>
      <div class="layui-form-item">
        <img :src="pic" class="avat" />
      </div>
    </div>
  </div>
</template>
<script>
import { uploadPic } from '@/api/content'
import { updateUserInfo } from '@/api/user'
import config from '@/config'
export default {
  name: 'PicUpload',
  data() {
    return {
      pic:
        this.$store.state.userInfo && this.$store.state.userInfo.pic
          ? this.$store.state.userInfo.pic
          : '/resource/avatar.jpg',
      formData: ''
    }
  },
  methods: {
    upload(e) {
      if (e.target.files.length > 0) {
        let formData = new FormData()
        formData.append('file', e.target.files[0])
        this.formData = formData
        // 上传照片
        uploadPic(formData).then((res) => {
          if (res.code === 200) {
            // 更新用户信息
            let basePath = process.env.NODE_ENV === 'production' ? config.baseUrl.prod : config.baseUrl.dev
            this.pic = `${basePath}/${res.data}`
            const userInfo = this.$store.state.userInfo
            userInfo.pic = this.pic
            this.$store.commit('setUserInfo', userInfo)
            updateUserInfo({ pic: this.pic }).then((res) => {
              if (res.code === 200) {
                this.$alert(res.msg)
              }
            })
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.pic-item
  margin-top 20px
  padding 0 20px
  .upload-content
    width 350px
    padding 40px 20px 20px 20px
    background #e2e2e2
    display flex
    flex-direction column
    align-items center
    .suggest
      font-size 10px
      color #999
    #pic
      display none
    .avat
      width 300px
</style>
