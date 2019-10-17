<template>
  <div class="grade-out">
    <grade-component
      v-for="(data,index) in datas"
      :key="index"
      :data="data.priority"
      :selected="data.selected"
      @click="handleClick(data)"
    />
  </div>
</template>

<script>
import gradeComponent from '../Common/GradeComponent'
export default {
  components: { gradeComponent },
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      datas: [
        { priority: 1, selected: false },
        { priority: 2, selected: false },
        { priority: 3, selected: false },
        { priority: 4, selected: false },
        { priority: 5, selected: false }
      ]
    }
  },
  watch: {
    value: {
      handler(val) {
        this.datas.map(item => {
          if (val === item.priority) {
            item.selected = true
          } else {
            item.selected = false
          }
        })
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    handleClick(data) {
      this.datas.map(item => {
        item.selected = false
      })
      data.selected = true
      this.$emit('input', data.priority)
      this.$emit('change', data.priority)
    }
  }
}
</script>

<style lang="scss" scoped>
.grade-out {
  height: 28px;
  display: flex;
  align-items: center;
  & > div {
    margin-right: 5px;
    cursor: pointer;
  }
}
</style>
