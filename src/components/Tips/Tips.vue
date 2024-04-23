<template>
  <a-tooltip placement="topLeft">
    <template slot="title">
      <slot></slot>
    </template>
    <a-icon type="question-circle" />
  </a-tooltip>
</template>
<script>
export default {
  name: 'ISwitch',
  props: {
    text: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>

</style>
