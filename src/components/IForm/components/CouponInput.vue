<template>
  <a-select class="select" v-model="id">
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
      id: ''
    };
  },
  props: {
    value: {
      type: Array,
      default () {
        return ''
      }
    }
  },
  watch: {
    value (val) {
      this.id = val || ''
    },
    id () {
      this.$emit('input', this.id)
    }
  },
  mounted () {
    this.id = this.value || ''
    this.$http.get('/coupons').then(res => {
      this.list = res.data.list
    })
  }
};
</script>
<style lang="scss" scoped>
.list {
}
</style>