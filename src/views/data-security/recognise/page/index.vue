<template>
  <page-table :config="config" />
</template>

<script>
import pageTable from '@/page-table'
import api from '@/api/recognise'
import table from './table'
import dialog from '../dialog'
export default {
  name: 'GradePage',
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
        // api方法
        apiHandler: api,
        // 查询 清空会被清除
        pageQuery: { keywords: '' },
        // 固定查询条件
        fixedQuery: {
          sort: 'createdAt,desc'
        },
        cellHandler: {
          enabledHandler: this.updateStatus
        },
        dialog: dialog
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
