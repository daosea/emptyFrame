<template>
  <a :href="data" target="_blank">
    <slot/>
  </a>
</template>

<script>
export default {
  name: 'LinkComponent',
  props: {
    data: {
      type: String,
      default: ''
    }
  }
}
</script>
