<template>
  <div class="pic-item">
    <div class="upload-content">
      <div class="layui-form-item">
        <button type="button" class="layui-btn"><i class="layui-icon layui-icon-upload-drag"></i> 上传头像</button>
      </div>
      <div class="layui-form-item">
        <label>建议尺寸168*168，支持jpg、png、gif,最大不能超过50KB</label>
      </div>
      <div class="layui-form-item">
        <img src="../../../assets/qr.jpeg" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PicUpload',
  data() {
    return {}
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
    label
      font-size 10px
      color #999
</style>
