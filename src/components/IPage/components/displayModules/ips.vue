<template>
	<div class="category-menu">
		<!-- <view class="item">
			<image src="/static/c1.png"></image>
			<text>ALL</text>
		</view> -->

		<div class="item" v-for="(item,index) in list" :key="index"
		 @tap="handleClick(item)">
			<div class="ip-thumb">
				<img mode="aspectFill" hover-class="hover" :src="item.thumb + '?x-oss-process=image/resize,w_250'"></img>
			</div>
			<div class="title">{{item.title}}</div>
		</div>

		<div class="item" @tap="more">
			<img src="@/assets/more-round.png" hover-class="hover"></img>
			<div class="title">更多</div>
		</div>

    <slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			refreshCount: {
				type: Number
			}
		},
		data () {
			return {
				list: []
			}
		},
		watch: {
			refreshCount () {
				this.initData()
			}
		},
		mounted () {
			this.initData()
		},
		methods: {
			initData() {
				this.$http('/ip/categories', 'GET', {
					per_page: 5
				}).then(res => {
					this.list = res.data.list
				})
			},
			handleClick(item) {
				uni.navigateTo({
					url: `/pages/search/index?type=box&category_id=${item.id}&title=${item.title}`
				})
			},
			more(e) {
				uni.navigateTo({
					url: '/pages/category/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category-menu {
		display: flex;
		justify-content: space-between;
		width: 100%;
    height: 80px;

		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.ip-thumb {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				box-shadow: 0px 14px 30px 0px rgba(226, 222, 204, 0.4);

				&.active {
					position: relative;
					&:after {
						content: "";
						position: absolute;
						top: -2px;
						left: -2px;
						width: 100%;
						height: 100%;
						border: 2px solid #ffcc00;
						border-radius: 50%;
					}
				}
			}

			img {
				width: 36px;
				height: 36px;
				border-radius: 50%;
			}

			.title {
				text-align: center;
				width: 40px;
				overflow: hidden;
				text-overflow: ellipsis;
        font-size: 60%;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}

			.text {
				margin-top: 10rpx;
				color: #333;
				font-weight: 500;
				font-size: 22rpx;
				line-height: 30rpx;
			}
		}
	}
</style>
