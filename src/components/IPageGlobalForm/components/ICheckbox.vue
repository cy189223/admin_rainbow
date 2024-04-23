<template>
  <a-checkbox :checked="isCheck ? true : false" @change="onChange" :size="size" />
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
			}
		},
		data () {
			return {
        isCheck: 0
			}
		},
		mounted () {
      this.isCheck = this.value
		},
		watch: {
			isCheck (val) {
				this.$emit('input', val ? 1 : 0)
			},
			value (val) {
				this.isCheck = this.value
			}
		},
		methods: {
      onChange (e) {
        this.isCheck = e.target.checked
      }
		}
	}
</script>

<style lang="scss" scoped>
.price-input {
	width: 160px;
}
</style>