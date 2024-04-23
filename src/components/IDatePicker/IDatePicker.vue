<template>
	<a-date-picker
		:showTime="showTime"
		v-model="selectDate"
		:format="formatStr"
		:placeholder="placeholder"
		:size="size"
		@change="onChange" />
</template>
<script>
	import moment from 'moment'
	export default {
		props: {
      placeholder: {
        type: String,
        default () {
          return '请选择时间'
        }
      },
			showTime: {
				type: Boolean,
				default () {
					return false
				}
			},
			value: {
				type: String,
				default () {
					return ''
				}
			},
			size: {
				type: String,
				default () {
					return 'normal'
				}
			}
		},
		data () {
			return {
				selectDate: null
			}
		},
    computed: {
      formatStr () {
        return this.showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'
      }
    },
    mounted () {
      if (this.value)
      	this.selectDate = moment(this.value)
    },
		watch: {
			value () {
				if (this.value)
					this.selectDate = moment(this.value)
			}
		},
		methods: {
			onChange (value, dateString) {
        if (!value) {
          this.dateString = ''
        }
        else {
          this.dateString = value.format(this.formatStr)
        }
				this.$emit('input', this.dateString)
			}
		}
	}
</script>
<style lang="less" scoped>

</style>
