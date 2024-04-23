<template>
  <!-- <div> -->
    <a-input class="price-input" v-model="priceFloat"></a-input>
  <!-- </div> -->
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
					return 'default'
				}
			},
			value: {
				type: Number
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
.price-input {
	width: 160px;
}
</style>
