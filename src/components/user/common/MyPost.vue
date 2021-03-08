<template>
  <div class="my-post-item">
    <table class="layui-table">
      <colgroup>
        <col width="150px" />
        <col width="200" />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>帖子标题</th>
          <th class="text-center">状态</th>
          <th class="text-center">结帖</th>
          <th class="text-center">发表时间</th>
          <th class="text-center">数据</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><div class="layui-elip">人生就像是一场修行人生就像是一场修行</div></td>
          <td class="text-center">打开</td>
          <td class="text-center">已结帖</td>
          <td class="text-center">2016-11-29</td>
          <td class="text-center">101阅/5答</td>
          <td class="text-center">
            <button type="button" class="layui-btn layui-btn-normal">编辑</button
            ><button type="button" class="layui-btn layui-btn-danger">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'MyPost',
  data() {
    return {}
  }
}
</script>
<style scoped lang="stylus">
.my-post-item
  margin-top 20px
  padding 0 20px
.text-center
  text-align center
</style>
