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
        <div class="layui-input-inline custom1">
          <label for="gender1" class="custom2">
            <input v-model="gender" id="gender1" type="radio" name="sex" value="0" title="男" />
            <i class="layui-icon layui-icon-circle" :class="{ 'layui-icon-radio': gender === '0' }"></i>
            男
          </label>
          <label for="gender2">
            <input v-model="gender" id="gender2" type="radio" name="sex" value="1" title="女" />
            <i class="layui-icon layui-icon-circle" :class="{ 'layui-icon-radio': gender === '1' }"></i>
            女
          </label>
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
    return {
      gender: '0'
    }
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
  .custom1
    padding-top 8px
    >.custom2
      padding-right 16px
  .layui-icon-radio
    color #56cf79
</style>
