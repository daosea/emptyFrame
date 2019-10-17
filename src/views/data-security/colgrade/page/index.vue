<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="left">
        <div class="left-top">
          <div class="left-top-text">待识别数据表</div>
          <div class="left-top-number">14</div>
        </div>
        <div class="left-middle">
          <el-input v-model="search" placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </div>
        <div>
          <el-table :show-header="false" :data="tableData">
            <el-table-column prop="databaseName" label="库名" />
            <el-table-column prop="tableName" label="表名" />
            <el-table-column prop="count" label="数据总数">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.count }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
    <el-col :span="18">
      <page-table :config="config">
        <template slot="head">
          <div class="right-top">
            <div>字段列表</div>
            <div>
              <el-button type="primary">执行识别</el-button>
              <el-button type="primary">保存</el-button>
              <el-button type="primary">提交</el-button>
            </div>
          </div>
        </template>
      </page-table>
    </el-col>
  </el-row>
</template>

<script>
import pageTable from '@/page-table'
import api from '@/api/function'
import table from './table'
import dialog from '../dialog'
export default {
  name: 'FunctionPage',
  components: {
    pageTable
  },
  data() {
    return {
      search: '',
      tableData: [
        {
          databaseName: '人口库',
          tableName: '教育信息',
          count: 12
        },
        {
          databaseName: '人口库',
          tableName: '教育信息',
          count: 12
        },
        {
          databaseName: '人口库',
          tableName: '教育信息',
          count: 12
        }
      ],
      config: {
        // 表头
        tableHeads: table,
        // 勾选
        selection: false,
        // 序号
        index: true,
        // 隐藏header
        hiddenHeader: true,
        // 获取分页方法
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
.left {
  margin-top:20px;
  padding: 10px;
  &-top {
    display: flex;
    justify-content: space-between;
    &-text{
      font-weight: bold;
    }
    &-number{
      color: red;
    }
  }
  &-middle{
    margin: 10px 0;
  }
}
.right{
  &-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
}
</style>
