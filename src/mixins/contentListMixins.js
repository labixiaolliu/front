import { getList } from '../api/content.js'
const contentListMixins = {
  data() {
    return {
      list: []
    }
  },
  methods: {
    _getList() {
      this.isLoad = true
      let opation = {
        page: this.page,
        limit: this.limit,
        catalog: this.catalog || '',
        sort: this.sort || '',
        status: this.status || '',
        isTop: this.isTop
      }
      getList(opation)
        .then((res) => {
          if (res.code === 200) {
            this.isLoad = false
            if (res.data.length < this.limit) {
              this.isEnd = true
            }
            if (this.list.length > 0) {
              this.list = this.list.concat(res.data)
            } else {
              this.list = res.data
            }
          } else {
            this.$alert(res.msg)
          }
        })
        .catch((err) => {
          if (err) {
            this.isLoad = false
            this.$alert(err.message)
          }
        })
    }
  },
  mounted() {
    this._getList()
  }
}

export default contentListMixins
