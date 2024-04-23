<template>
	<div class="container-scope">
		<div v-for="(item, index) in list" class="item" v-if="list.length">
			<div class="char-key">{{index + 1}}</div>
			<div class="body">
				<div class="item-content" v-if="options.image === true">
					<span class="key">图片: </span>
					<UploadImages size="small" :imgStyle="{}" v-model="item.image"></UploadImages>
				</div>
				<div class="item-content" v-if="options.title === true">
					<span class="key">标题: </span>
					<a-input class="input" v-model="item.title"></a-input>
				</div>
				<div class="item-content" v-if="options.text !== false">
					<span class="key">内容: </span>
					<a-textarea rows="4" class="input" v-model="item.text"></a-textarea>
				</div>
				<div class="item-content">
					<a href="javascript:;" class="delete-text" @click="handleDelete(index)">删除</a>
					<a href="javascript:;" style="margin-left: 20px;" class="delete-text" @click="handleAdd(index)">添加</a>
				</div>
			</div>
		</div>
		<div v-if="!list || !list.length">
			<a-button size="small" type="primary" @click="handleAdd(0)">添加</a-button>
		</div>
	</div>
</template>
<script>
	export default {
		components: {
			// ImageView
		},
		props: {
			size: {
				default () {
					return 'default'
				}
			},
			value: {
				type: Array
			},
			options: {
				type: Object
			}
		},
		data () {
			return {
				list: [
				]
			}
		},
		mounted () {
		},
		watch: {
			value (val) {
				this.list = val || []
			},
			list (val) {
				this.$emit('input', val)
			}
		},
		methods: {
			handleDelete (index) {
				this.list.splice(index, 1)
			},
			handleAdd (index) {
				index = index + 1
				this.list.splice(index, 0, {
					title: '',
					image: '',
					text: '',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.container-scope {
	width: 100%;
}
.list {

}
.item {
	display: flex;
	align-items: center;
	margin-top: 10px;
	border-bottom: 1px solid #e1e1e1;
	padding-bottom: 10px;
	margin-bottom: 10px;
	.char-key {
		margin-right: 10px;
		// padding: 10px;
		border-radius: 50%;
		border: 1px solid #e1e1e1;
		width: 40px;
		height: 40px;
		box-sizing: border-box;
		text-align: center;
		line-height: 40px;
		flex: 0 0 40px;
		background: #f1f1f1;
	}

	.body {
		// border: 1px solid red;
		flex-grow: 1;
	}

	.item-content {
		display: flex;
		align-items: center;
		// border: 1px solid red;
		margin-top: 10px;
		width: 100%;
		.key {
			flex: 0 0 40px;
		}
		.input {
			flex-grow: 1;
		}
	}
}
</style>
