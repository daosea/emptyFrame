<template>
  <page-table :config="config" />
</template>

<script>
import pageTable from '@/page-table'
import api from '@/api/dataApplyfor'
import applyed from './applyed'
import dialog from '../dialog'
export default {
  name: 'ApplyedPage',
  components: {
    pageTable
  },
  data() {
    return {
      config: {
        // 表头
        tableHeads: applyed,
        // 勾选
        selection: true,
        // 序号
        index: true,
        // api方法
        apiHandler: api,
        // 查询 清空会被清除
        pageQuery: { keywords: '', approvalStatus: 1 },
        // 固定查询条件
        fixedQuery: {
          sort: 'createdAt,desc'
        },
        dialog: dialog
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
