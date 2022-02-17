<template>
  <div class="msg-item">
    <div class="layui-row">
      <button type="button" class="layui-btn layui-btn-danger" @click="setAllMessageRead">清空所有消息</button>
    </div>
    <ul>
      <li v-for="(item, index) of list" :key="'comment' + index">
        <blockquote class="layui-elem-quote">
          <p>
            <span>{{ item.uid.nick }}</span
            >回答了你的帖子<span>{{ item.pid.title }}</span>
          </p>
        </blockquote>
        <div class="answer-content" v-richtext="item.content"></div>
        <div>
          <span class="time layui-font-gray">{{ item.created | moment }}</span>
          <button type="button" class="layui-btn layui-btn-danger" @click="setMessageRead(item)">删除</button>
        </div>
      </li>
    </ul>
    <gg-page
      :total="total"
      :current="current"
      :size="size"
      :showEnd="true"
      :showTotal="true"
      @changePageIndex="changePageIndex"
      @changePageSize="changePageSize"
      v-show="total > 0"
    ></gg-page>
  </div>
</template>
<script>
import Pagination from '../modules/pagination/Index'
import { getUserMsg, setMessageRead } from '../../api/user'
export default {
  name: 'UserMsg',
  components: {
    'gg-page': Pagination
  },
  data() {
    return {
      list: [],
      current: 0,
      size: 10,
      total: 0
    }
  },
  methods: {
    changePageIndex(index) {
      this.current = index
      this.getAllMsg()
    },
    changePageSize(pageSize, page) {
      this.current = page
      this.size = pageSize
      this.getAllMsg()
    },
    getAllMsg() {
      getUserMsg({ page: this.current, limit: this.size }).then((res) => {
        console.log('TCL: Data -> store', res)
        this.list = res.data
        this.total = res.total
      })
    },
    setMessageRead(comment) {
      setMessageRead({ tid: comment._id }).then((res) => {
        if (res.code === 200) {
          this.getAllMsg()
          this.$store.dispatch('message', { message: this.$store.state.count.message - 1 })
        }
      })
    },
    setAllMessageRead() {
      setMessageRead().then((res) => {
        if (res.code === 200) {
          this.list = []
          this.total = 0
          this.current = 0
          this.$store.dispatch('message', { message: 0 })
        }
      })
    }
  },
  mounted() {
    this.getAllMsg()
  }
}
</script>
<style scoped lang="stylus">
.msg-item
  margin-left 222px
  background white
  padding 20px 20px
  li
    display flex
    flex-direction column
    margin-top 10px
    p
      font-size 1.2vw
      span
        color #66aeb9
        margin 0 3px
    >div
      display flex
      justify-content space-between
      align-items center
      span
        color #c2c2c2
    &:after
      content ''
      width 100%
      margin 10px 0
      height 1px
      background #e5e5e5
</style>
