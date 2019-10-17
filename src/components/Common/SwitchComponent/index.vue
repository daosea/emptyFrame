<template>
  <el-switch v-model="value" @change="handleChange" />
</template>

<script>
export default {
  name: 'SwitchComponent',
  props: {
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Number | Boolean,
      default: 0
    },
    attr: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => {}
    },
    handlers: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      value: 0
    }
  },
  watch: {
    data: {
      handler(val) {
        this.value = !!val
      },
      immediate: true
    }
  },
  methods: {
    handleChange(value) {
      this.row[this.attr] = value ? 1 : 0
      const handler = this.handlers[this.config.handler]
      handler(this.row)
    }
  }
}
</script>
