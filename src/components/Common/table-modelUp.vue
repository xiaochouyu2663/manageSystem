<template>
<div>
         <el-table
            :data="tableData"
            stripe="stripe"
            :border='true'
            v-loading="loading_min"
            element-loading-text="拼命加载中"
            style="width: 100%"
            @sort-change="sortChange"
            @selection-change="selectItem"
    >
        <!-- checkbox -->
        <el-table-column type="selection" 	v-if="config.checkbox"	 width="50"></el-table-column>

        <!-- 隐藏内容 可配置是否以及内容-->
        <el-table-column type="expand" v-if="config.hidden">
            <template scope="props">
                <el-form label-position="left" inline class='demo-table-expand'>
                    <el-form-item :label="config.hidden.items[i-1]" v-for="i in config.hidden.items.length">
                        <span>{{ props.row[config.hidden.prop[i-1]] }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>

        <!-- 表格主体 -->
        <template v-for="i in config.show.items.length" >
            <el-table-column :sortable="config.sort[config.show.prop[i-1]]" :label="config.show.items[i-1]" :prop="config.show.prop[i-1]"	 :width="config.show.width[i-1]"></el-table-column>
        </template>
        <!-- 内容过长的内容 -->
            <template  v-if="config.toolong">
                <el-table-column
                        v-for="i in config.toolong.items.length" 		:label="config.toolong.items[i-1]" 	:prop="config.toolong.prop[i-1]"  :width="config.toolong.width[i-1]"
                        >
                    <template scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p v-html="scope.row[config.toolong.prop[i-1]]"></p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag>{{config.toolong.items[i-1]}}详情</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
            </template>
        <!-- 内容过长的内容 -->

        <!-- 状态 -->
        <el-table-column label="状态" width="100" v-if="config.status">
            <template scope="scope">
                <div>
                    {{ scope.row.status | status }}
                </div>
            </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" v-if="config.operate" :width="config.operate.width">
            <template scope="scope">
                <div>
                    <template v-if="config.operate.link" v-for="lin in config.operate.link">
                    <el-tooltip class="icon_button" effect="dark" :content="lin.title" placement="top">
                        <router-link :to="{ name: ''+lin.name, params: { id: scope.row.id }}" :title="lin.title">
                        <template v-if="lin.svg">
                            <icon  :class="lin.class+'-icon'" :name="lin.class"></icon>
                        </template>
                        <template v-else>
      						<i :class="lin.class"></i>
                        </template>
  						</router-link>
				    </el-tooltip>
                    </template>
                    <span  class="icon_button" v-if="config.operate.edit">
                        <a href="javascript:;" @click="edit(scope.row)" title="编辑">
                            <i  class="el-icon-edit"></i>
                        </a>
                    </span>
                    <span  class="icon_button" v-if="config.operate.del">
                        <a href="javascript:;" @click="confirmDelete(scope.row)" title="删除">
                            <i  class="el-icon-delete"></i>
                        </a>
                    </span>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <!-- 编辑 -->
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
    <!-- 编辑 -->
</div>
</template>

<script>
import http from 'assets/js/http'
export default {
  props: ['exchanged', 'tableData', 'config', 'baseApi', 'Edit'],
  data() {
    return {}
  },
  methods: {
    sortChange(column) {
      if (column.prop === null || column.order === null) {
        this.exchanged.search.orderByString = ''
      } else {
        this.exchanged.search.orderByString = column.prop + '.' + column.order
      }
    },
    selectItem(val) {
      // checkbox方法
      this.exchanged.multipleSelection = val
    },
    confirmDelete(item) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading_min = true
          this.apiDelete(this.baseApi + '/', item.id).then(res => {
            this.loading_min = false
            const that = this
            this.handelResponse(res, data => {
              _g.toastMsg('success', '删除成功')
              setTimeout(() => {
                that.exchanged.isDelete++
                this.loading_min = false
              }, 1500)
            })
          })
        })
        .catch(() => {
          // catch error
        })
    },
    edit(row) {
      this.getDefaultData(row.id)
      this.Edit.dialogFormVisible = true // 显示窗体
      console.log('row', row)
    },
    getDefaultData(id) {
      let that = this
      this.apiGet(this.baseApi + '/' + id).then(res => {
        this.handelResponse(res, data => {
          that.Edit.data.form = data
          console.log(res)
        })
      })
    },
    dateFormat(row) {
      // 日期格式化
      var date = parseInt(row.create_time + '000')
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY年MM月DD日 HH:mm:ss')
    }
  },
  created() {},
  mixins: [http]
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

