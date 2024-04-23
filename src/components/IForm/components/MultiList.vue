<template>
	<div class="container-scope">
		<div v-for="(item, index) in list" class="item" v-if="list.length">
			<div class="char-key">{{index + 1}}</div>
			<div class="body">

        <!-- <ActivityEditor v-model="list[index]"></ActivityEditor> -->

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
  // import UploadImages from '@/components/UploadImages/UploadImages'
  // import ActivityEditor from '@/components/IPage/components/editorModules/activitiesEditor.vue'
	export default {
		components: {
			// ImageView
      // UploadImages,
      // ActivityEditor
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
				],
        blockList: []
			}
		},
		mounted () {
      this.$http('/block/categories').then(res => {
        this.blockList = res.data.list
      })
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
