<template>
  <a :href="data" target="_blank">
    <img :src="data" :width="config.width" :height="config.height">
  </a>
</template>

<script>
export default {
  name: 'ImgComponent',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          width: '50px',
          height: '50px'
        }
      }
    },
    data: {
      type: String,
      default: ''
    }
  }
}
</script>
