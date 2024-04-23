<template>
  <a-select class="select" mode="multiple" v-model="ids">
    <!-- <a-select-option value="">请选择</a-select-option> -->
    <a-select-option :value="option.id" v-for="option in list">
      {{option.title}}
     </a-select-option>
  </a-select>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      ids: []
    };
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    value (val) {
      this.ids = val || []
    },
    ids () {
      this.$emit('input', this.ids)
    }
  },
  mounted () {
    this.ids = this.value || []
    this.$http.get('/vip-skus').then(res => {
      this.list = res.data.list
    })
  }
};
</script>
<style lang="scss" scoped>
.list {
}
</style>