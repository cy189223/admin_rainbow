<template>
  <div>
    <a-select placeholder="请选择" @search="fetchList" style="width: 400px;" v-model="productId" allowClear>
      <a-select-option :value="item.id" v-for="item in list" :key="item.id">
        <img :src="item.thumb" class="thumb" />
        {{ item.title }}
      </a-select-option>
    </a-select>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        list: [],
        productId: ''
      }
    },
    props: {
      value: {
        type: Number
      }
    },
    watch: {
      value () {
        this.productId = this.value
      },
      productId() {
        this.$emit('input', this.productId)
      }
    },
    mounted() {
      this.productId = this.value

      this.$http.get('/shop/products').then(res => {
        this.list = res.data.list
      })
    },
    methods: {
      fetchList() {

      }
    },
  }
</script>

<style lang="scss" scoped>
  .thumb {
    width: 30px;
    height: 30px;
    margin-right: 6px;
  }
</style>
