<template>
  <div class="password-item">
    <form class="layui-form layui-form-pane" action="">
      <div class="layui-form-item">
        <label class="layui-form-label">当前密码</label>
        <div class="layui-input-inline">
          <input type="text" name="title" autocomplete="off" class="layui-input" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">新密码</label>
        <div class="layui-input-inline">
          <input type="text" name="title" autocomplete="off" class="layui-input" />
        </div>
        <div class="layui-inline">6到16个字符</div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">城市</label>
        <div class="layui-input-inline">
          <input type="text" name="title" autocomplete="off" class="layui-input" />
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
  name: 'Password',
  data() {
    return {}
  }
}
</script>
<style scoped lang="stylus">
.password-item
  margin-top 20px
  padding 0 20px
</style>
