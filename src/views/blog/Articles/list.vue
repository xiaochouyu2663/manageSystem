
<template>
	<List :data="data" :config="config" :showLoading="showLoading"></List>
</template>

<script>
import List from 'components/tpl/list.vue'
import http from 'assets/js/http.js'

export default {
  components: {
    List
  },
  data() {
    return {
      config: {
        baseApi: 'blog/Articles',
        jump: [
          {
            to: 'add',
            name: '添加',
            class: 'btn-link-large add-btn',
            icon: 'el-icon-plus'
          }
        ],
        excel: {
          fileName: '列表',
          tHeader: [
            'id',
            'Author',
            'Title',
            'typeName',
            'publishDate',
            'upvote'
          ],
          filterVal: [
            'id',
            'Author',
            'Title',
            'typeName',
            'publishDate',
            'upvote'
          ]
        },
        table: {
          checkbox: false,
          status: false,
          sort: {
            username: 'custom',
            create_time: 'custom'
          },
          show: {
            items: [
              'id',
              'Author',
              'Title',
              'typeName',
              'publishDate',
              'upvote'
            ],
            prop: [
              'id',
              'Author',
              'Title',
              'typeName',
              'publishDate',
              'upvote'
            ],
            width: [150, 200, 200, 250]
          }
        },
        search: {
          search_input: [
            {
              name: 'field',
              placeholder: 'fieldName'
            }
          ],
          search_select: [
            {
              name: 'status',
              placeholder: '请选择状态',
              multiple: false
            }
          ]
        },
        page: {
          limits: [5, 10, 20, 50, 100],
          layout: 'total, sizes, prev, pager, next, jumper'
        }
      },
      data: {
        received: {
          table: [],
          count: null,
          search: {
            status: [
              {
                label: '启用',
                value: '1'
              },
              {
                label: '禁用',
                value: '0'
              }
            ]
          }
        },
        exchanged: {
          search: {
            limit: 10,
            page: 1,
            orderByString: ''
          },
          multipleSelection: [],
          isDelete: 0
        }
      }
    }
  },
  created() {
    this.init()
    // 延迟绑定监听
    this.$watch('data.exchanged.search', {
      deep: true,
      handler: function() {
        router.push({ path: this.$route.path, query: this.getCondition() })
        _g.openGlobalLoading()
        this.tableData()
      }
    })
    this.$watch('data.exchanged.isDelete', {
      deep: true,
      handler: function() {
        _g.openGlobalLoading()
        this.tableData()
      }
    })
  },
  methods: {
    init() {
      // 基本数据获取
      this.tableData()
    },
    tableData() {
      // 表格数据
      const data = {
        params: this.getCondition()
      }
      // 请求地址
      let url = this.config.baseApi
      this.apiGet(url, data).then(res => {
        this.handelResponse(res, data => {
          this.data.received.table = data.list
          this.data.received.count = data.dataCount
          _g.closeGlobalLoading()
        })
      })
    },
    getCondition() {
      // 搜索优化配置
      let temp = this.data.exchanged.search
      let params = {}
      for (let key in temp) {
        if (temp[key]) {
          params[key] = temp[key]
        }
      }
      return params
    }
  },
  mixins: [http]
}
</script>

<style scoped>
.el-input,
.el-input__inner {
  width: auto;
}
</style>
