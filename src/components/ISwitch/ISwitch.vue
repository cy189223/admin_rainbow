<template>
  <a-switch v-model="check" @change="handleChange"/>
</template>
<script>
export default {
  name: 'ISwitch',
  props: {
    value: {
      type: [String, Number, Boolean],
      default () {
        return false
      }
    },
    active: {
      type: [String, Number, Boolean],
      default () {
        return true
      }
    },
    unactive: {
      type: [String, Number, Boolean],
      default () {
        return false
      }
    }
  },
  data () {
    return {
      check: false
    }
  },
  watch: {
    value: {
      handler (value) {
        if (value === this.active) {
          this.check = true
        } else {
          this.check = false
        }
      },
      immediate: true
    }
  },
  methods: {
    handleChange (e) {
      this.$emit('input', e ? this.active : this.unactive)
      this.$emit('change', e ? this.active : this.unactive)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
