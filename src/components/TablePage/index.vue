<template>
  <section class="app-container">
    <div>
      <slot name="header" />
    </div>
    <!-- <div class="buttons">
      <slot name="buttons"/>
    </div>-->
    <!-- @header-dragend="handleDragend"
        @expand-change="handleExpandChange"
        @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"-->
    <div>
      <el-table
        v-loading="loading"
        :data="tableDatas"
        highlight-current-row
        :stripe="stripe"
        style="width: 100%"
        empty-text="暂无数据"
        :row-key="generateRowKey"
        @header-dragend="handleDragend"
        @sort-change="handleSortChange"
        v-on="$listeners"
      >
        <slot name="expand" />
        <el-table-column v-if="config.selection" type="selection" width="34" />
        <el-table-column v-if="config.index" type="index" width="60" label="序号" />
        <el-table-column
          v-for="item in tableHeads"
          :key="item.key"
          :min-width="item.minWidth"
          :column-key="item.key"
          :label="item.value"
          :show-overflow-tooltip="true"
          :fixed="item.fixed"
          :sortable="item.sort?'custom':false"
          resizable
        >
          <template slot-scope="scope">
            <component
              :is="item.component?commonComponents[item.component]:defalutComponent"
              :attr="item.key"
              :config="item.componentConfig"
              :data="scope.row[item.key]"
              :row="scope.row"
              :handlers="config.cellHandler"
            >{{ item.preHandle?item.preHandle(scope.row[item.key],scope.row):scope.row[item.key] }}</component>
          </template>
        </el-table-column>
        <slot name="operate" />
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page.sync="pageQuery.page"
          :page-sizes="[10,20,30,40, 50]"
          :page-size="pageQuery.size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Sortable from 'sortablejs'
import defalutComponent from '@/components/Common/DefalutComponent'
import commonComponents from '@/components/Common'
export default {
  name: 'TablePage',
  components: {},
  filters: {},
  mixins: [],
  props: {
    config: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isDragging: false,
      delayedDragging: false,
      loading: false,
      // 斑马纹
      stripe: false,
      total: 0,
      tableDatas: [],
      defalutComponent: defalutComponent,
      commonComponents: commonComponents,
      pageQuery: {
        page: 1,
        size: 10
      }
    }
  },
  computed: {
    tableHeads() {
      return this.config.tableHeads.filter(node => node)
    },
    getPageHandler() {
      return this.config.apiHandler.getPage
    },
    otherParams() {
      return this.config.fixedQuery || {}
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    }
  },
  mounted() {},
  created() {
    this.getPage()
  },
  methods: {
    // flag 是否是删除
    getPage(flag) {
      if (!this.getPageHandler) {
        throw ReferenceError('getPageHandler未定义')
      }
      // 更新pageQuery
      const temp = this.config.pageQuery
      for (const key in temp) {
        this.pageQuery[key] = temp[key]
      }
      this.loading = true
      const pageParams = { ...this.pageQuery }
      pageParams.page = pageParams.page - 1
      this.getPageHandler({ ...pageParams, ...this.otherParams })
        .then(response => {
          this.loading = false
          if (
            flag &&
            this.pageQuery.page > 1 &&
            this.pageQuery.page > response.results.totalElements
          ) {
            this.pageQuery.page--
            this.config.pageQuery.page--
            this.getPage(this.pageQuery)
          } else {
            this.tableDatas = response.data.content
            this.total = response.data.totalElements
            // this.pageQuery.page = response.data.number
            this.pageQuery.size = response.data.size
            this.afterGetPage()
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 拖拽表格宽度
    handleDragend(newWidth, oldWidth, column, event) {},
    // 更改页面数据显示条数
    handleSizeChange(val) {
      this.config.pageQuery.size = val
      this.pageQuery.size = val
      this.getPage()
    },
    // 翻页
    handleCurrentChange(val) {
      this.config.pageQuery.page = val
      this.pageQuery.page = val
      this.getPage()
    },
    afterGetPage() {
      this.$emit('afterGetpage')
      this.$nextTick(() => {
        // 表格拖拽
        this.dragTable()
      })
    },
    handleSortChange(item) {
      if (!item.column) {
        this.getPage()
        return
      }
      this.config.pageQuery.sidx = item.column.columnKey
      if (item.order === 'descending') {
        this.config.pageQuery.order = 'desc'
      } else {
        this.config.pageQuery.order = 'asc'
      }
      this.getPage()
    },
    // 生成row-key
    generateRowKey(row) {
      return row.id
    },
    // 表格拖拽
    dragTable() {
      if (!this.config.dragable) return
      const el = document.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      Sortable.create(el, {
        // disabled: !this.enableDrag,
        ghostClass: 'sortable-ghost',
        onStart: (/** Event*/ evt) => {
        },
        onEnd: evt => {
          this.sortDatas(evt.oldIndex, evt.newIndex)
        }
      })
    },
    // 重新排序表格
    sortDatas(oldIndex, newIndex) {
      const temp = this.tableDatas[oldIndex][this.config.dragAttr]
      this.tableDatas[oldIndex][this.config.dragAttr] = this.tableDatas[newIndex][this.config.dragAttr]
      this.tableDatas[newIndex][this.config.dragAttr] = temp
      const datas = [this.tableDatas[newIndex], this.tableDatas[oldIndex]]
      this.config.dragFunction(datas).then(response => {
        this.getPage(true)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pagination-container {
  margin-top: 24px;
  margin: 16px 0;
  float: right;
  &::before {
    content: "";
  }
  &::after {
    clear: both;
    content: "";
  }
}

.buttons {
  margin-bottom: 22px;
  &::before {
    content: "";
  }
  &::after {
    clear: both;
    content: "";
  }
}
</style>
