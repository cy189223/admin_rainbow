<template>
  <div class="price-input-c" :style="style">
    <a-input class="price-input" :size="size" placeholder="请输入金额" v-model="priceFloat"></a-input>&nbsp元
  </div>
	<!-- <a-input class="price-input" v-model="priceFloat"></a-input>元 -->
</template>
<script>
	export default {
		components: {
			// ImageView
		},
		props: {
			size: {
				default () {
					return 'normal'
				}
			},
			value: {
				type: Number
			},
      style: {
        type: Object
      }
		},
		data () {
			return {
				priceFloat: 0
			}
		},
		mounted () {
      this.priceFloat = (this.value || 0) / 100
		},
		watch: {
			priceFloat (val) {
				this.$emit('input', val * 100)
			},
			value (val) {
				this.priceFloat = (val || 0) / 100
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
  .price-input-c {
    display: inline-block;
    // border: 1px solid red;
    // width: 80px;
    display: inline-flex;
    align-items: center;
  }
  .price-input {
    max-width: 160px;
  }
</style>

