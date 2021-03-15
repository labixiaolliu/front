<template>
  <div class="model" v-show="isShow">
    <div class="mask" @click="closeListMask"></div>
    <div class="info layui-layer layui-layer-page" :class="{ active: isShow }">
      <div class="layui-layer-title">
        签到活跃榜 - TOP 20
        <i class="layui-icon layui-icon-close pull-right" @click="closeListMask"></i>
      </div>
      <div class="layui-layer-content">
        <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
          <ul class="layui-tab-title">
            <li :class="{ 'layui-this': current === 0 }" @click="choseCurrent(0)">最新签到</li>
            <li :class="{ 'layui-this': current === 1 }" @click="choseCurrent(1)">今日最快</li>
            <li :class="{ 'layui-this': current === 2 }" @click="choseCurrent(2)">总签到榜</li>
          </ul>
          <div class="layui-tab-content">
            <ul>
              <li v-for="(item, index) of list" :key="'sign' + index">
                <img src="resource/avatar.jpg" />
                <template v-if="current != 2">
                  <span class="orange">{{ item.name }}</span>
                  于
                  <span class="orange">{{ item.created }}</span>
                  签到
                </template>
                <template v-else>
                  <span class="orange">{{ item.name }}</span>
                  已经连续签到
                  <span class="orange">{{ item.count }}</span>
                  天
                </template>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sign-list',
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      current: 0,
      list: [
        {
          name: 'james',
          count: 4,
          created: '2021-01-01'
        },
        {
          name: 'damon',
          count: 3,
          created: '2021-01-01'
        },
        {
          name: 'lina',
          count: 2,
          created: '2021-01-01'
        },
        {
          name: 'hannah',
          count: 1,
          created: '2021-01-01'
        }
      ]
    }
  },
  methods: {
    closeListMask() {
      this.$emit('closeListMask')
    },
    choseCurrent(val) {
      this.current = val
    }
  }
}
</script>
<style scoped lang="stylus"></style>
