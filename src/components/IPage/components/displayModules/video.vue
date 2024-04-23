<template>
	<div class="scope-container">
		<video :src="module.video" :poster="module.thumb" controls class="video"></video>
    <slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			module: {
			  type: Object
			},
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
  .video {
    width: 100%;
  }
</style>
