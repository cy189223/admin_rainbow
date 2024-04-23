<template>
  <a-select class="select" :size="size" style="width: 80px; margin: 0px 10px;" v-model="inputValue">
    <!-- <a-select-option value="">请选择</a-select-option> -->
    <a-select-option value=">">大于</a-select-option>
    <a-select-option value="=">等于</a-select-option>
    <a-select-option value="<">小于</a-select-option>
  </a-select>
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
        inputValue: '>'
			}
		},
		mounted () {
      this.inputValue = this.value
		},
		watch: {
      inputValue (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.inputValue = val
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
