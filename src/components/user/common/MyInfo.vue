<template>
  <div class="info-item">
    <form class="layui-form layui-form-pane" action="">
      <div class="layui-form-item">
        <label class="layui-form-label">邮箱</label>
        <div class="layui-input-inline">
          <input type="text" name="title" autocomplete="off" class="layui-input" />
        </div>
        <div class="layui-inline">如果您在邮箱已激活的情况下，变更了邮箱，需<span>重新验证邮箱</span></div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">昵称</label>
        <div class="layui-input-inline">
          <input type="text" name="title" autocomplete="off" class="layui-input" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">城市</label>
        <div class="layui-input-inline">
          <input type="text" name="title" autocomplete="off" class="layui-input" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label layui-block sign">签名</label>
        <div class="layui-block">
          <textarea
            name=""
            required
            lay-verify="required"
            placeholder="随便写一些刷一下存在感"
            class="layui-textarea"
          ></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <button type="button" class="layui-btn">确认修改</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'MyInfo',
  data() {
    return {}
  }
}
</script>
<style scoped lang="stylus">
.info-item
  margin-top 20px
  padding 0 20px
  .sign
    width 100%
    text-align left
</style>
