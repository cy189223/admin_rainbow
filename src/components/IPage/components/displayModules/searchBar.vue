<template>
	<div class="title-container">
		<img v-if="module.left_icon" class="icon" :src="module.left_icon"></img>
		<div class="text">
			<!-- <view class="en">
				ALL NEWS
			</view> -->
			{{title}}
		</div>
		<div class="more-btn" v-if="module.is_show_more" @tap="more" hover-class="hover">
			<span>{{moreText}}</span>
			<!-- <text class="icon new-iconfont icon-arrow-right"></text> -->
		</div>
    <slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
      module: {
        type: Object
      },
			leftIcon: {
				type: String,
				default () {
					return ''
				}
			},
			// style: {
			// 	type: String
			// },
			link: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		methods: {
			more () {
				this.$tool.toLink(this.link)
				// this.$emit('more')
			}
		},
    computed: {
      title () {
        return this.module.title
      },
      moreText () {
        return this.module.more_text || '更多'
      }
    }
	}
</script>

<style lang="scss" scoped>
	.title-container {
		// border: 1px solid red;
		// background: url('@/static/new-list-title.png');
		background-size: 402rpx auto;
		background-repeat: no-repeat;
		padding-top: 10rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;

		margin: 30rpx 0rpx 20rpx 0rpx;
		display: flex;
		align-items: center;

		.icon {
			width: 16px;
			height: 16rpx;
			margin-right: 4px;
		}

		.text {
			flex-grow: 1;
			position: relative;
			.en {
				font-size: 36rpx;
				font-weight: 800;
				color: #F9E9AD;
				position: absolute;
				top: -20rpx;
				left: 6rpx;
				z-index: 0;

				color: linear-gradient(#F9E9AD, rgba(255, 255, 255, 0.1));
			}
		}
	}

  .more-btn {
  	// width: 40px;
    padding: 0px 10px;
  	height: 20px;
  	line-height: 40px;
  	font-size: 80%;
  	background: #F27233;
  	color: white;
  	opacity: 0.9;
  	border-radius: 50px;
  	text-align: center;
  	display: flex;
  	align-items: center;
  	justify-content: center;

  	// .icon-arrow-right {
  	// 	font-size: 14px;
  	// 	margin-left: 0px;
  	// 	display: inline;
  	// 	width: 10px;
  	// }
  }
</style>
