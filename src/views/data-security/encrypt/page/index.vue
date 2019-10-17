<template>
  <page-table :config="config" />
</template>

<script>
import pageTable from '@/page-table'
import api from '@/api/encrypt'
import table from './table'
import dialog from '../dialog'
export default {
  name: 'EncryptPage',
  components: {
    pageTable
  },
  data() {
    return {
      config: {
        // 表头
        tableHeads: table,
        // 勾选
        selection: true,
        // 序号
        index: true,
        // 获取分页方法
        getPageHandler: api.getPage,
        // 查询 清空会被清除
        pageQuery: { keywords: '' },
        // 固定查询条件
        fixedQuery: {
          // sort: 'priority,desc'
        },
        deleteHandler: api.deleteObject,
        batchDeleteHandler: api.batchDelete,
        dialog: dialog,
        cellHandler: {
          enabledHandler: this.updateStatus
        }
      }
    }
  },
  methods: {
    updateStatus(object) {
      api.updateStatus(object).then(response => {
        this.$message({
          message: '成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
