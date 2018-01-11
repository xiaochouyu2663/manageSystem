<template>
<div>
			<!-- 头部 -->
		<div class="m-b-20 ovf-hd">
			<!-- 页面跳转 -->
			<div class="fl">
        <el-button type="primary" icon="document" @click="Add" >新增</el-button>
			</div>
			<!-- 导出Excel表格 -->
			<downExcel :baseApi="config.baseApi" :config="config.excel" :tableData="data.received.table" :conditions="data.exchanged.search"></downExcel>
			<div>
				<!-- 搜索 -->
				<search-model :config="config.search" :data="data"></search-model>
			</div>
		</div>
		<!-- 头部 -->

		<!-- 内容 -->
		<transition name="fade" mode="out-in" appear>
			<table-model v-loading="showLoading" :Edit="Edit" :tableData="data.received.table" :config="config.table" :exchanged="data.exchanged" :baseApi="config.baseApi"></table-model>
    </transition>
		<!-- 内容 -->

		<!-- 底部 -->
		<div class="pos-rel p-t-20">
			<!-- 批量操作 -->
			<btnGroup  v-if="!config.table.noGroup"  :selectedData="data.exchanged.multipleSelection" :baseApi="config.baseApi" :config="config.btnGroup" :exchanged="data.exchange"></btnGroup>
			<!-- 翻页操作 -->
			<page-model :data="data" :config="config.page" :dataCount="data.received.count" :limit="data.exchanged.search.limit" :currentPage="data.exchanged.search.page"></page-model>
		</div>
		 <!--底部 -->
        <!-- 新增 -->
    <el-dialog :title="Edit.config.title" :visible.sync="Edit.dialogFormVisible">
      <el-form ref="form" :model="Edit.data.form" :rules="Edit.config.rules" label-width="130px">
				
        <!-- 普通输入类型 -->
        <el-form-item :label="item.label" :prop="item.prop" v-for="item in Edit.config.form.input">
          <el-input v-model.trim="Edit.data.form[item.prop]" class="h-40 w-200" :maxlength=12 ></el-input>
        </el-form-item>

        <el-form-item :label="item.label" :prop="item.prop" v-for="item in Edit.config.form.select">
          <el-select v-model="Edit.data.form[item.prop]" :placeholder="item.placeholder" class="w-200">
            <el-option v-for="option in Edit.data.selectData[item.prop]" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="item.label" :prop="item.prop" v-for="item in Edit.config.form.multipleSelect">
          <el-select v-model="Edit.data.form[item.prop]" :placeholder="item.placeholder" class="w-200" multiple>
            <el-option v-for="option in Edit.data.selectData[item.prop]" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
			</el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增 -->

</div>
</template>

<script>
import http from 'assets/js/http.js'
import btnGroup from 'components/Common/btn-group.vue'
import downExcel from 'components/Common/down-excel.vue'
import tableModel from 'components/Common/table-modelUp.vue'
import searchModel from 'components/Common/search-model.vue'
import pageModel from 'components/Common/page-model.vue'

export default {
  components: {
    btnGroup,
    downExcel,
    tableModel,
    searchModel,
    pageModel
  },
  data() {
    return {
      Edit: {
        dialogFormVisible: false,
        data: {
          primary: '',
          form: {
            id: null,
            Author: null,
            Title: null,
            type: null,
            publishDate: null,
            upvote: null
          },
          selectData: {
            id: null,
            Author: null,
            Title: null,
            type: null,
            publishDate: null,
            upvote: null
          } // 这里是可选项字段
        },
        config: {
          title: '新增',
          form: {
            input: [
              { prop: 'id', label: 'id' },
              { prop: 'Author', label: 'Author' },
              { prop: 'Title', label: 'Title' },
              { prop: 'type', label: 'type' },
              { prop: 'publishDate', label: 'publishDate' },
              { prop: 'upvote', label: 'upvote' }
            ],
            select: [
              { prop: 'id', label: 'id' },
              { prop: 'Author', label: 'Author' },
              { prop: 'Title', label: 'Title' },
              { prop: 'type', label: 'type' },
              { prop: 'publishDate', label: 'publishDate' },
              { prop: 'upvote', label: 'upvote' }
            ]
          },
          rules: {
            goodsName: [{ required: true, message: '请输入商品名称' }] // 这里是添加内容时的限制条件
          }
        }
      },
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
          tHeader: ['id', 'Author', 'Title', 'type', 'publishDate', 'upvote'],
          filterVal: ['id', 'Author', 'Title', 'type', 'publishDate', 'upvote']
        },
        table: {
          noGroup: true,
          checkbox: false,
          status: false,
          sort: {
            field: 'custom' // 可排序字段
          },
          show: {
            items: ['id', 'Author', 'Title', 'type', 'publishDate', 'upvote'],
            prop: ['id', 'Author', 'Title', 'type', 'publishDate', 'upvote'],
            width: [150, 200, 200, 250]
          },
          operate: {
            del: true,
            edit: true
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
    Add() {
      this.Edit.dialogFormVisible = true // 显示窗体
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
