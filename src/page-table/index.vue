<template>
  <div>
    <TablePage ref="tablePage" :config="config" @selection-change="handleSelectionChange">
      <template slot="header">
        <slot name="head" />
        <el-form v-if="!config.hiddenHeader" ref="form" label-position="left">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item>
                <el-input v-model="config.pageQuery.keywords" placeholder="关键字搜索" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" @click="handleFilter">查询</el-button>
              <el-button type="default" @click="resetForm">清空</el-button>
              <el-button type="primary" @click="handleCreate">新增</el-button>
              <el-button @click="handleBatchDelete">删除</el-button>
              <!-- <el-button @click="handleImport">导入</el-button>
              <el-button type="text" @click="handleDownload">导入模版下载</el-button>-->
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template slot="operate">
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button v-if="!config.hiddlenEditButton" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-if="!config.hiddenDeleteButton" type="text" @click="handleDelete(scope.row)">删除</el-button>
            <el-button v-for="(btn,index) in config.buttonGroup" :key="index" type="text" @click="btn.handler">{{ btn.name }}</el-button>
          </template>
        </el-table-column>
      </template>
    </TablePage>
    <component
      :is="config.dialog"
      :config="config.dialogConfig"
      :visible="dialogVisible"
      :data="tableData"
      :edit="isEdit"
      @getPage="getPage"
      @close="dialogVisible=false"
    />
    <slot />
  </div>
</template>

<script>
import TablePage from '@/components/TablePage'
import { getDictDatas } from '@/utils/dict'
export default {
  components: {
    TablePage
  },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isEdit: false,
      disabled: false,
      dialogVisible: false,
      tableData: {},
      // 单条删除处理器
      deleteHandler: null,
      // 批量删除处理器
      batchDeleteHandler: null,
      // 已选择数据
      selectdDatas: [],
      dictDatas: {}
    }
  },
  created() {
    getDictDatas(this.dictDatas)
    if (!this.config.apiHandler) {
      throw ReferenceError('apiHandler未定义')
    }
    this.deleteHandler = this.config.apiHandler.deleteObject
    this.batchDeleteHandler = this.config.apiHandler.batchDelete
  },
  methods: {
    // 获取列表之前 存储一些必填参数
    beforeGetPage() {},
    getPage(flag) {
      this.beforeGetPage()
      this.$refs['tablePage'].getPage(flag)
    },
    // 查询
    handleFilter() {
      this.config.pageQuery.page = 1
      this.getPage()
    },
    // 清空筛选条件
    resetForm() {
      for (const key in this.config.pageQuery) {
        if (key === 'page' || key === 'size') {
          continue
        }
        if (this.config.pageQuery[key] instanceof Array) {
          this.$set(this.config.pageQuery, key, [])
        } else {
          this.$set(this.config.pageQuery, key, '')
        }
      }
      this.afterResetForm()
      this.getPage()
    },
    afterResetForm() {},
    handleCreate() {
      this.disabled = false
      this.isEdit = false
      this.tableData = {}
      this.dialogVisible = true
    },
    handleEdit(item) {
      this.disabled = false
      this.isEdit = true
      this.tableData = item
      this.dialogVisible = true
    },
    handleDetail(item) {
      this.disabled = true
      this.isEdit = true
      this.tableData = item
      this.dialogVisible = true
    },
    handleBatchDelete() {
      if (!this.batchDeleteHandler) {
        throw ReferenceError('batchDeleteHandler未定义')
      }
      if (!this.selectdDatas || this.selectdDatas.length === 0) {
        this.$message.error('请先勾选数据')
      }
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const ids = []
          this.selectdDatas.forEach(element => {
            ids.push(element.id)
          })
          this.batchDeleteHandler(ids).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getPage(true)
          })
        })
        .catch(() => {})
    },
    handleDelete(item) {
      if (!this.deleteHandler) {
        throw ReferenceError('deleteHandler未定义')
      }
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteHandler(item.id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getPage(true)
          })
        })
        .catch(() => {})
    },
    handleSelectionChange(items) {
      this.selectdDatas = items
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
