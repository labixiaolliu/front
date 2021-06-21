<template>
  <div class="my-post-item">
    <div class="overflow">
      <table class="layui-table">
        <!-- <colgroup>
          <col width="150px" />
          <col width="200px" />
          <col width="200px" />
          <col width="200px" />
          <col width="200px" />
          <col width="200px" />
        </colgroup> -->
        <thead>
          <tr>
            <th>帖子标题</th>
            <th class="text-center">状态</th>
            <th class="text-center">结帖</th>
            <th class="text-center">发表时间</th>
            <th class="text-center">数据</th>
            <th class="text-center min-cell">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of posts" :key="'post' + index">
            <td>
              <div class="layui-elip link">
                {{ item.title }}
              </div>
            </td>
            <td class="text-center">{{ item.status === '0' ? '打开' : '关闭' }}</td>
            <td class="text-center" :class="{ succ: item.isEnd !== '0' }">
              {{ item.isEnd === '0' ? '未结帖' : '已结帖' }}
            </td>
            <td class="text-center">{{ item.created | moment }}</td>
            <td class="text-center">{{ item.reads }}阅/{{ item.answer }}答</td>
            <td class="text-center">
              <button
                type="button"
                class="layui-btn layui-btn-normal layui-btn-xs"
                :class="{ 'layui-btn-disabled': item.isEnd === '1' }"
                @click="goEdit(item)"
              >
                编辑</button
              ><button type="button" class="layui-btn layui-btn-danger layui-btn-xs" @click="deletePost(item)">
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <gg-page
      :total="total"
      :current="current"
      :size="size"
      :showEnd="true"
      :showTotal="true"
      @changePageIndex="changePageIndex"
      @changePageSize="changePageSize"
      v-show="posts.length > 0"
      align="left"
    ></gg-page>
  </div>
</template>
<script>
import { getPostsByUid, deletePost } from '../../../api/user'
import Pagination from '../../modules/pagination/Index'
export default {
  name: 'MyPost',
  components: {
    'gg-page': Pagination
  },
  data() {
    return {
      total: 0,
      current: 0,
      size: 10,
      posts: []
    }
  },
  methods: {
    getPosts() {
      getPostsByUid({ page: this.current, limit: this.size }).then((res) => {
        if (res.code === 200) {
          this.posts = res.data.posts
          this.total = res.data.total
        } else {
          this.$alert(this.msg)
        }
      })
    },
    changePageIndex(index) {
      // this.total++
      this.current = index
      this.getPosts()
    },
    changePageSize(pageSize, page) {
      // this.total++
      this.current = page
      this.size = pageSize
      this.getPosts()
    },
    goEdit(post) {
      if (post.isEnd === '0') {
        this.$router.push({ name: 'Edit', params: { tid: post._id, post: post } })
      }
    },
    deletePost(post) {
      this.$confirm(
        '您确定要删除该帖子么？',
        () => {
          deletePost({ tid: post._id }).then((res) => {
            if (res.code === 200) {
              this.$pop('', res.msg)
              this.posts.splice(this.posts.indexOf(post), 1)
            } else {
              this.$alert(res.msg)
            }
          })
        },
        () => {}
      )
    }
  },
  mounted() {
    this.getPosts()
  }
}
</script>
<style scoped lang="stylus">
.my-post-item
  margin-top 20px
  padding 0 20px
.overflow
  overflow-y auto
.text-center
  text-align center
  min-width 80px
.min-cell
  min-width 80px
.link
  color #01aaed
.succ
  color #5fb878
</style>
