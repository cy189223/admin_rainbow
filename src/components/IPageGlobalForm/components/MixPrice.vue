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
		data () {
			return {
				priceFloat: 0,
        score: 0
			}
		},
		mounted () {
      this.priceFloat = (this.initMoney || 0) / 100 || 0
      this.score = this.initScore
		},
    computed: {
    },
		watch: {
      priceFloat (val) {
        this.$emit('moneyChange', val * 100)
      },
      score (val) {
        this.$emit('scoreChange', val)
      },
      initMoney (val) {
        this.priceFloat = this.initMoney / 100
      },
      initScore (val) {
        this.score = this.initScore
      }
		},
		methods: {
		}
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
