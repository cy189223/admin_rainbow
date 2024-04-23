<template>
	<span class="product-price">
		<!-- 无促销价 -->
		<span class="price" v-if="!isHasDiscountPrice">
			<template v-if="money">
				<span class="symbol">￥</span>{{formatPrice(money)}}
			</template>
			<template v-if="money && score">+</template>
			<template v-if="score">
				{{score}}<span class="symbol-text">积分</span>
			</template>
      <template v-if="!money && !score">
        <span class="symbol">￥</span>0
      </template>
		</span>
		<!-- 有促销价 -->
		<template v-else>
			<span class="price">
				<template v-if="lineMoney">
					<span class="symbol">￥</span>{{formatPrice(lineMoney)}}
				</template>
				<template v-if="lineMoney && lineScore">+</template>
				<template v-if="lineScore">
					{{lineScore}}<span class="symbol-text">积分</span>
				</template>
			</span>
			<span class="line-price" style="padding-left: 10rpx;">
				<template v-if="money">￥{{formatPrice(money)}}</template>
				<template v-if="money && score">+</template>
				<template v-if="score">{{score}}积分</template>
			</span>
		</template>
	</span>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default () {
					return {}
				}
			},
      moneyKey: {
      	type: String
      },
      scoreKey: {
      	type: String
      },
      prefix: {
        type: String,
        default () {
          return ''
        }
      },
      linePrefix: {
        type: String,
        default () {
          return 'discount_'
        }
      }
		},
		filters: {},
    methods: {
      formatPrice(price) {
      	return (price / 100).toFixed(2)
      },
    },
		computed: {
			isHasDiscountPrice () {
				return (this.lineMoney || this.lineScore)
				&& (this.lineMoney != this.money || this.lineScore != this.score)
			},
      money () {
        return this.info[this.moneyKey || (this.prefix + 'money_price')]
      },
      score () {
        return this.info[this.scoreKey || (this.prefix + 'score_price')]
      },
      lineMoney () {
        return this.info[this.linePrefix + 'money_price']
      },
      lineScore () {
        return this.info[this.linePrefix + 'score_price']
      }
		}
	}
</script>

<style lang="scss" scoped>
  .product-price {
    flex: 0 0 200px;
  }
	.price {
		// font-weight: bold;
		// color: #FF294A;
	}
  span {
    margin: 0px;
    padding: 0px;
  }
	.line-price {
		font-size: 80%;
		color: #a0a0a0;
		text-decoration: line-through;
	}
	.symbol {
		font-size: 80%;
	}
	.symbol-text {
		font-size: 70%;
	}
</style>
