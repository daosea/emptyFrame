<template>
  <el-tag v-if="data!==null" :type="config.type[data]">
    <slot />
  </el-tag>
</template>

<script>
export default {
  name: 'TagComponent',
  props: {
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Number || Boolean,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {
  }
}
</script>
