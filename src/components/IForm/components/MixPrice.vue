<template>
	<span>
		<a-input class="money-input" :size="size" placeholder="不填则为" v-model="priceFloat"></a-input>元 +
		<a-input class="score-input" v-model.number="score" placeholder="不填则为0" :size="size"></a-input>积分
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
			initMoney: {
				type: Number
			},
			initScore: {
				type: Number
			}
		},
		data() {
			return {
				priceFloat: 0,
				score: 0
			}
		},
		mounted() {
			// console.log(this.priceFloat ,1)
			this.priceFloat = (this.initMoney || 0) / 100 || 0
			this.score = this.initScore
			// console.log(this.priceFloat ,2)
		},
		computed: {},
		watch: {
			priceFloat(val) {
				// console.log(val,3)
				this.$emit('moneyChange', val * 100)
			},
			score(val) {
				this.$emit('scoreChange', val)
			},
			initMoney(val) {
				// console.log(val,5)
				this.priceFloat = this.initMoney / 100
				// console.log(this.priceFloat,5)
			},
			initScore(val) {
				this.score = this.initScore
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