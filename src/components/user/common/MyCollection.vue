<template>
  <div>
    <div class="overflow">
      <table class="layui-table">
        <thead>
          <tr>
            <th>帖子标题</th>
            <th class="text-center max-cell">收藏时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of collections" :key="'post' + index">
            <td>
              <router-link class="layui-elip link" :to="{ name: 'Detail', params: { tid: item.tid } }">{{
                item.title
              }}</router-link>
            </td>
            <td class="text-center">{{ item.created | moment }}</td>
          </tr>
        </tbody>
      </table>
      <gg-page
        :total="total"
        :current="current"
        :size="size"
        :showEnd="true"
        :showTotal="true"
        @changePageIndex="changePageIndex"
        @changePageSize="changePageSize"
        v-show="collections.length > 0"
        align="left"
      ></gg-page>
    </div>
  </div>
</template>
<script>
import Pagination from '../../modules/pagination/Index'
import { getCollectionByUid } from '../../../api/user'
export default {
  name: 'MyCollection',
  components: {
    'gg-page': Pagination
  },
  data() {
    return {
      total: 0,
      current: 0,
      size: 10,
      collections: []
    }
  },
  methods: {
    getCollections() {
      getCollectionByUid({ page: this.current, limit: this.size }).then((res) => {
        if (res.code === 200) {
          this.collections = res.data.collections
          this.total = res.data.total
        } else {
          this.$alert(res.msg)
        }
      })
    },
    changePageIndex(index) {
      // this.total++
      this.current = index
      this.getCollections()
    },
    changePageSize(pageSize, page) {
      // this.total++
      this.current = page
      this.size = pageSize
      this.getCollections()
    }
  },
  mounted() {
    this.getCollections()
  }
}
</script>
<style scoped lang="stylus">
.max-cell
  width 100px
  text-align center
.link
  color #01aaed
</style>
