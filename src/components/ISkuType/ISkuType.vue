<template>
  <div>
    <span v-if="info.sku_type === 1">-</span>
    <div v-else-if="info.sku_type === 2">
      商城商品
      <div v-if="info.product">
        【{{info.product.title}}】
      </div>
    </div>
    <span v-else-if="info.sku_type === 3">虚拟资产</span>
  </div>
</template>
<script>
export default {
  name: 'ISwitch',
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    },
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
