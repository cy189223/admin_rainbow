<template>
	<div class="container-scope">
    <div style="margin: 0px 0px 10px 0px;">
      邀请者每次邀请可获得<a-input-number size="small" v-model="setting.per_reward" style="margin: 0 10px;"></a-input-number>次奖励
    </div>

    <div style="margin: 0px 0px 10px 0px;">
      被邀请者可获得<a-input-number size="small" v-model="setting.invited_reward" style="margin: 0 10px;"></a-input-number>次奖励
    </div>

    <!-- <div style="margin: 0px 0px 10px 0px;">
      每个用户每天最高可获得<a-input-number size="small" v-model="setting.max_reward_per_day" style="margin: 0 10px;"></a-input-number>次奖励
    </div> -->

    <div style="margin: 0px 0px 30px 0px;">
      邀请者总共最多获得<a-input-number size="small" v-model="setting.max_reward" style="margin: 0 10px;"></a-input-number>次奖励
    </div>

		<div v-for="(item, index) in setting.added" class="item" v-if="setting.added.length">
			<div class="char-key">{{index + 1}}</div>
			<div class="body">

        邀请到 <a-input v-model="setting.added[index].total" style="width: 80px; margin: 0 2px;"  size="small"></a-input> 个用户时额外奖励
        <a-input class="score-input" style="width: 100px; margin: 0 4px;"  size="small" v-model.number="setting.added[index].reward" placeholder="不填则为0"></a-input>次
        <!-- <ActivityEditor v-model="list[index]"></ActivityEditor> -->

				<div class="item-content">
					<a href="javascript:;" class="delete-text" @click="handleDelete(index)">删除</a>
					<a href="javascript:;" style="margin-left: 20px;" class="delete-text" @click="handleAdd(index)">添加</a>
				</div>
			</div>
		</div>

		<div v-if="!setting.added || !setting.added.length">
			<a-button size="small" type="primary" @click="handleAdd(0)">添加额外奖励</a-button>
		</div>

	</div>
</template>
<script>
  import IPrice from './IPrice'
  // import UploadImages from '@/components/UploadImages/UploadImages'
  // import ActivityEditor from '@/components/IPage/components/editorModules/activitiesEditor.vue'
	export default {
		components: {
			// ImageView
      // UploadImages,
      // ActivityEditor
      IPrice
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
				setting: {
          max_reward: 0,
          per_reward: 1,
          invited_reward: 0,
          added: []
        }
			}
		},
		mounted () {
		},
		watch: {
			value (val) {
				this.setting = val || {
          max_reward: 0,
          per_reward: 1,
          added: []
        }
			},
			setting (val) {
				this.$emit('input', val)
			}
		},
		methods: {
			handleDelete (index) {
				this.setting.added.splice(index, 1)
			},
			handleAdd (index) {
				index = index + 1
				this.setting.added.splice(index, 0, {
					total: '',
					reward: '',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.container-scope {
	width: 100%;
  padding-bottom: 20px;
  // border: 1px solid #ddd;
  // padding: 20px 20px;
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
