<template>
	<a-modal :title="`编辑奖品`" style="top: 100px;" :visible="true" width="1000px" @cancel="handleCancel">
		<div class="tips">
			<!-- 中奖奖品会发放到用户的盒柜仓库中 -->
		</div>
		<a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="false"
			size="small">
			<a-table-column title="ID" width="20px">
				<template slot-scope="row">
					<div>
						<span>
							{{row.id }}
						</span>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="消费金额" key="amount" width="100px">
				<template slot-scope="row">
					<div>
						<span>
							{{row.amount}}
						</span>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="奖励代币" key="score" width="100px">
				<template slot-scope="row">
					<div>
						<span>
							{{row.score}}
						</span>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="奖品" key="thumb" width="80px">
				<template slot-scope="row">
					<div style="display: flex; align-items: center;">
						<img :src="row.thumb" class="thumb" style="margin-right: 10px;" />
						<div>
							{{row.title}} <br />
						</div>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="创建时间" key="number" width="100px">
				<template slot-scope="row">
					<div>
						<span>
							{{row.created_at}}
						</span>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="操作" width="80px">
				<template slot-scope="row">
					<a href="javascript:;" @click="handleEdit(row)">编辑</a>
					<a-divider type="vertical" />
					<a href="javascript:;" @click="handleDelete(row)">删除</a>
				</template>
			</a-table-column>
		</a-table>
		<template slot="footer">
			<div class="btn-c">
				<a-button type="primary" class="add" @click="handleCreate">
					新增一款
				</a-button>
				<div style="flex-grow: 1;"></div>

				<a-button key="back" @click="handleCancel">关闭</a-button>
				<!-- <a-button key="submit" type="primary" @click="handleSave">
          保存
        </a-button> -->
			</div>
		</template>
	</a-modal>
</template>
<script>
	import UploadImages from '@/components/UploadImages/UploadImages'
	import iSwitch from '@/components/ISwitch/ISwitch'
	import ISkuType from '@/components/ISkuType/ISkuType'
	export default {
		components: {
			UploadImages,
			iSwitch,
			ISkuType
		},
		props: {
			info: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				list: [],
				frame: [
					{
						title: '消费金额',
						key: 'amount',
						type: 'number',
						// tips: '总库存应该大于等于 每期抽取数量 * 期数',
						suffix: '',
						required: true
					},
					{
					  title: '奖品类型',
					  key: 'type',
					  type: 'radio',
					  default: '3',
					  required: true,
					  options: [
					    {
					      title: '积分奖励',
					      value: 1
					    },
					    {
					      title: '实物奖品',
					      value: 2
					    },
					    {
					      title: '积分奖励 + 实物奖品',
					      value: 3
					    }
					  ],
					  newline: true,
					  // tips: '如设置为多期开奖，则此处不能选择“按固定时间开奖“'
					},
					{
						title: '奖励积分',
						key: 'score',
						type: 'number',
						required: false,
						where: {
							type:1
							// type:'3'
							
						}
					},
					{
						title: '奖励积分',
						key: 'score',
						type: 'number',
						required: false,
						where: {
							type:3
							// type:'3'
							
						}
					},
					{
						title: '奖品名称',
						key: 'title',
						// placeholder: '填写编号方便在订单中对应货物'
						required:  false,
						where: {
							type:2
						}
					},
					{
						title: '奖品图片',
						key: 'thumb',
						type: 'image',
						isShowImageTips: false,
						required: false,
						tips: '建议800*800', //，发放后会显示在中奖者的物品仓库中
						where: {
							type:2
						}
					},{
						title: '奖品名称',
						key: 'title',
						// placeholder: '填写编号方便在订单中对应货物'
						required: false,
						where: {
							type:3
						}
					},
					{
						title: '奖品图片',
						key: 'thumb',
						type: 'image',
						isShowImageTips: false,
						required: false,
						tips: '建议800*800', //，发放后会显示在中奖者的物品仓库中
						where: {
							type:3
						}
					},
					// {
					//   title: '价值',
					//   key_prefix: '',
					//   type: 'mix_price',
					//   tips: '价值用于返售时作为返售原价进行折扣计算',
					//   newline: true,
					//   required: true,
					// },
					// {
					//   title: '抽中概率',
					//   key: 'odds',
					//   type: 'number',
					//   suffix: '%',
					//   // tips: '价值用于返售时作为返售原价进行折扣计算',
					//   newline: true,
					//   required: true,
					// },
					// {
					//   title: '总库存',
					//   key: 'stock',
					//   type: 'number',
					//   tips: '总库存应该大于等于 每期抽取数量 * 期数',
					//   suffix: '份',
					//   required: true
					// },
					// {
					//   title: '每期抽取',
					//   key: 'per_session_stock',
					//   type: 'number',
					//   suffix: '份',
					//   required: true
					// },
					// {
					//   title: '每个箱子数量',
					//   key: 'total_per_room',
					//   type: 'number',
					//   tips: '每个箱子内提供的奖品数量',
					//   required: true
					// },
				]
			}
		},
		watch: {
			uuid() {
				this.initList()
			},
		},
		created() {
			this.initList()
		},
		methods: {
			initList() {
				this.$http.get(`/account/skus`, {
					params: {
						activity_id: this.info.id
					}
				}).then(res => {
					this.list = res.data.list
				})
			},
			handleCreate() {
				this.$iForm.show({
					title: '新增活动奖品',
					frame: this.frame,
					success: (data) => {
						if(data.type == '1' && data.score == undefined){
							this.$message.error('请输入奖励积分');
							return
						}else if(data.type == '2' && data.title == undefined){
							this.$message.error('请输入奖品名称');
							return
						}else if(data.type == '3'){
							if(data.score == undefined){
								this.$message.error('请输入奖励积分');
								return
							}else if(data.title == undefined){
								this.$message.error('请输入奖品名称');
								return
							}
						}
						this.$http.post(`/account/skus`, {
							activity_id: this.info.id,
							...data,
						}).then(res => {
							this.initList()
							this.$iForm.hide()
						})
					},
				})
			},
			handleEdit(row) {
				this.$iForm.show({
					title: '编辑活动奖品',
					frame: this.frame,
					form: row,
					success: (data) => {
						this.$http.put(`/account/skus/${row.uuid}`, {
							type: 'update',
							attributes: data
						}).then(res => {
							this.initList()
							this.$iForm.hide()
						})
					}
				})
			},
			handleCancel() {
				this.$emit('refresh')
				this.$emit('close')
			},
			handleSave() {
				this.$emit('refresh')
				this.$emit('close')
				// this.$http.put(`/activities/${this.uuid}/skus/batch`, {
				//   list: this.list
				// }).then(res => {
				//   this.$message.success('保存成功')
				//   this.initList()
				// })
			},
			handleDelete(row) {
				this.$confirm({
					title: '提示',
					content: `确认删除吗？`,
					onOk: () => {
						this.$http.delete(`/account/skus/${row.uuid}`).then(res => {
							this.$message.success('删除成功')
							this.initList()
						})
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.thumb {
		width: 60px;
		// height: 60px;
		border-radius: 6px;
	}

	.btn-c {
		display: flex;
		// margin-top: 30px;
		padding: 0rpx 30rpx;

		.add {}

		.save {
			margin-right: 20px;
		}

		.cancel {}
	}

	.tips {
		color: gray;
		font-size: 90%;
		margin-bottom: 10px;
	}

	a-input {
		display: inline;
	}
</style>