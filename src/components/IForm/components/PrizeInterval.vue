<template>
	<span>
		每
		<a-input class="money-input" placeholder="不填则为0" v-model.number="lottery_start_point"></a-input>抽 ——
		<a-input class="score-input" v-model.number="lottery_end_point" placeholder="不填则为0"></a-input>抽
	</span>
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
				type: Object
			},
			initStart: {
				type: Number
			},
			initEnd: {
				type: Number
			}
		},
		data() {
			return {
				lottery_start_point: 0,
				lottery_end_point: 0
			}
		},
		mounted() {
			this.lottery_start_point = this.initStart || 0
			this.lottery_end_point = this.initEnd || 0
		},
		computed: {},
		watch: {
			lottery_start_point(val) {
				this.$emit('startChange', val)
			},
			lottery_end_point(val) {
				this.$emit('endChange', val)
			},
			initStart(val) {
				this.lottery_start_point = this.initStart
			},
			initEnd(val) {
				this.lottery_end_point = this.initEnd
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.money-input {
		width: 110px;
		margin-right: 4px;
	}

	.score-input {
		width: 110px;
		margin-right: 4px;
	}
</style>