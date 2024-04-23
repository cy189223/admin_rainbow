<template>
	<div class="container">
		<div class="btn-c" style="margin-bottom: 10px;">
			<a-button type="primary" class="add" @click="handleCreate">
				新增全局奖品
			</a-button>
			<a-button v-if="list_A.length == 0" style="margin-left:20px" type="primary" class="add" @click="handleCreate('A')">
				A阵营保底奖品
			</a-button>
			<a-button v-else style="margin-left:20px" type="primary" class="add" @click="handleEdit(list_A[0])">
				编辑A阵营保底奖品
			</a-button>
			<a-button v-if="list_B.length == 0" style="margin-left:20px" type="primary" class="add" @click="handleCreate('B')">
				B阵营保底奖品
			</a-button>
			<a-button v-else style="margin-left:20px" type="primary" class="add"  @click="handleEdit(list_B[0])">
				编辑B阵营保底奖品
			</a-button>
			<div style="flex-grow: 1;"></div>
		</div>
		<div class="tips">
			中奖奖品会发放到用户的盒柜仓库中
		</div>
		<!-- <a-table class="product-table" :rowKey="row => row.id" :dataSource="list_A" bordered :pagination="false"
			size="small">
			<a-table-column title="序号" width="20px">
				<template slot-scope="text, record, index">
					<div>{{ index+1 }}</div>
				</template>
			</a-table-column>
			<a-table-column title="图片" key="thumb" width="80px">
				<template slot-scope="row">
					<div style="display: flex; align-items: center;">
						<img :src="row.thumb" class="thumb" style="margin-right: 10px;" />
						<div>
							{{row.title}} <br />
							{{row.number}}
						</div>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="类型" key="number" width="100px">
				<template slot-scope="row">
					<div>{{ row.prize_type == 'A' ? 'A阵营保底' : (row.prize_type == 'B' ? 'B阵营保底' : '全局') }}</div>
				</template>
			</a-table-column>
			<a-table-column title="价值" key="number" width="100px">
				<template slot-scope="row">
					<div>
						<PriceDisplay :info="row"></PriceDisplay>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="总库存" width="50px">
				<template slot-scope="row">
					<span>
						{{row.stock}}件
					</span>
				</template>
			</a-table-column>
			<a-table-column title="SKU类型" width="80px">
				<template slot-scope="row">
					<ISkuType :info="row"></ISkuType>
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
		<a-table class="product-table" :rowKey="row => row.id" :dataSource="list_B" bordered :pagination="false"
			size="small">
			<a-table-column title="" width="20px">
				<template slot-scope="text, record, index">
					<div>{{ index+1 }}</div>
				</template>
			</a-table-column>
			<a-table-column title="" key="thumb" width="80px">
				<template slot-scope="row">
					<div style="display: flex; align-items: center;">
						<img :src="row.thumb" class="thumb" style="margin-right: 10px;" />
						<div>
							{{row.title}} <br />
							{{row.number}}
						</div>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="类型" key="number" width="100px">
				<template slot-scope="row">
					<div>{{ row.prize_type == 'A' ? 'A阵营保底' : (row.prize_type == 'B' ? 'B阵营保底' : '全局') }}</div>
				</template>
			</a-table-column>
			<a-table-column title="价值" key="number" width="100px">
				<template slot-scope="row">
					<div>
						<PriceDisplay :info="row"></PriceDisplay>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="总库存" width="50px">
				<template slot-scope="row">
					<span>
						{{row.stock}}件
					</span>
				</template>
			</a-table-column>
			<a-table-column title="SKU类型" width="80px">
				<template slot-scope="row">
					<ISkuType :info="row"></ISkuType>
				</template>
			</a-table-column>
			<a-table-column title="操作" width="80px">
				<template slot-scope="row">
					<a href="javascript:;" @click="handleEdit(row)">编辑</a>
					<a-divider type="vertical" />
					<a href="javascript:;" @click="handleDelete(row)">删除</a>
				</template>
			</a-table-column>
		</a-table> -->
		<a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="false"
			size="small">
			<a-table-column title="序号" width="20px">
				<template slot-scope="text, record, index">
					<div>{{ index+1 }}</div>
				</template>
			</a-table-column>
			<a-table-column title="图片" key="thumb" width="80px">
				<template slot-scope="row">
					<div style="display: flex; align-items: center;">
						<img :src="row.thumb" class="thumb" style="margin-right: 10px;" />
						<div>
							{{row.title}} <br />
							{{row.number}}
						</div>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="类型" key="number" width="100px">
				<template slot-scope="row">
					<div  :style="{color: (row.prize_type == 'A' || row.prize_type == 'B') ? '#F04646' : ''}">{{ row.prize_type == 'A' ? 'A阵营保底' : (row.prize_type == 'B' ? 'B阵营保底' : '全局奖品') }}</div>
				</template>
			</a-table-column>
			<a-table-column title="价值" key="number" width="100px">
				<template slot-scope="row">
					<div>
						<PriceDisplay :info="row"></PriceDisplay>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="总库存" width="50px">
				<template slot-scope="row">
					<span>
						{{row.stock}}件
					</span>
				</template>
			</a-table-column>
			<a-table-column title="SKU类型" width="80px">
				<template slot-scope="row">
					<ISkuType :info="row"></ISkuType>
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
	</div>
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
					return {

					}
				}
			}
		},
		data() {
			return {
				list_A: [],
				list_B: [],
				list: [],
				frame: [{
						title: '奖品类型',
						type: 'text',
						key: 'prize_type',
						text: this.text,
					},
					{
						title: 'SKU类型',
						key: 'sku_type',
						type: 'radio',
						default: 1,
						required: true,
						options: [{
								title: '无绑定',
								value: 1
							},
							{
								title: '绑定商城中的商品',
								value: 2
							},
							{
								title: '平台虚拟资产',
								value: 3
							}
						],
						tips: ''
					},
					{
						title: '绑定商品',
						key: 'product_id',
						type: 'product_id',
						auto_fill_fields: {
							'title': 'title',
							'thumb': 'thumb',
							'number': 'number',
							'money_price': 'money_price',
							'score_price': 'score_price'
						},
						where: {
							sku_type: 2
						}
					},
					{
						title: '绑定虚拟资产',
						key: 'assets',
						type: 'assets',
						where: {
							sku_type: 3
						}
					},
					{
						title: '奖品名称',
						key: 'title',
						required: true,
						placeholder: '如"积分礼包1"'
					},
					{
						title: '编号',
						key: 'number',
						placeholder: '填写编号方便在订单中对应货物'
						// required: true,
					},
					// {
					//   title: '赏标题',
					//   key: 'shang_title',
					//   placeholder: '例如 A赏 B赏'
					//   // required: true,
					// },
					{
						title: '封面',
						key: 'thumb',
						type: 'image',
						isShowImageTips: false,
						required: true,
						tips: '建议800*800，发放后会显示在中奖者的物品仓库中',
					},
					{
						title: '价值',
						key_prefix: '',
						type: 'mix_price',
						tips: '价值用于返售时作为返售原价进行折扣计算',
						newline: true,
						required: true,
					},
					// {
					//   title: '抽中概率',
					//   key: 'odds',
					//   type: 'number',
					//   suffix: '%',
					//   // tips: '价值用于返售时作为返售原价进行折扣计算',
					//   newline: true,
					//   required: true,
					// },
					{
						title: '总库存',
						key: 'stock',
						type: 'number',
						tips: '总库存应该大于等于 每期抽取数量 * 期数',
						suffix: '份',
						required: true
					},
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
				this.my_initList('A')
				this.my_initList('B')
				this.my_initList()
			},
			my_initList(type) {
				let params = {}
				if(type){
					params = {
						prize_type: type
					}
				}else{
					params = {}
				}
				this.$http.get(`/pk/skus`, {
					params
				}).then(res => {
					if(type){
						this['list_' + type] = res.data.list
					}else{
						this.list = res.data.list
					}
				})
			},
			handleCreate(prize_type) {
				let myData = {}
				if (prize_type == 'A') {
					this.$set(this.frame[0], 'text', 'A阵营保底奖品')
					myData = {
						title: '创建A阵营保底奖品',
						frame: this.frame,
						prize_type: 'A'
					}
				} else if (prize_type == 'B') {
					this.$set(this.frame[0], 'text', 'B阵营保底奖品')
					myData = {
						title: '创建B阵营保底奖品',
						frame: this.frame,
						prize_type: 'B'
					}
				} else {
					this.$set(this.frame[0], 'text', '全局奖品')
					myData = {
						title: '新增活动奖品',
						frame: this.frame,
					}
				}
				this.$iForm.show({
					...myData,
					success: (data) => {
						let add_prize_type = {}
						if (prize_type == 'A') {
							add_prize_type = {
								prize_type: 'A'
							}
						} else if (prize_type == 'B') {
							add_prize_type = {
								prize_type: 'B'
							}
						} else {
							add_prize_type = {
								prize_type: 'N'
							}
						}
						this.$http.post(`/pk/skus`, {
							...data,
							...add_prize_type
						}).then(res => {
							this.initList()
							this.$iForm.hide()
						})
					},
				})
			},
			handleEdit(row) {
				let prize_type = row.prize_type
				let myData = {}
				if (prize_type == 'A') {
					this.$set(this.frame[0], 'text', 'A阵营保底奖品')
					myData = {
						title: '编辑A阵营保底奖品',
						frame: this.frame,
						prize_type: 'A'
					}
				} else if (prize_type == 'B') {
					this.$set(this.frame[0], 'text', 'B阵营保底奖品')
					myData = {
						title: '编辑B阵营保底奖品',
						frame: this.frame,
						prize_type: 'B'
					}
				} else {
					this.$set(this.frame[0], 'text', '全局奖品')
					myData = {
						title: '编辑全局奖品',
						frame: this.frame,
					}
				}
				this.$iForm.show({
					// title: '编辑活动奖品',
					// frame: this.frame,
					...myData,
					form: row,
					success: (data) => {
						this.$http.put(`/pk/skus/${row.uuid}`, {
							type: 'update',
							attributes: data
						}).then(res => {
							this.initList()
							this.$iForm.hide()
						})
					},
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
						this.$http.delete(`/pk/skus/${row.uuid}`).then(res => {
							this.$message.success('删除成功')
							this.initList()
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-container {
		padding-bottom: 120px;
	}

	.container {
		.btn {
			margin-right: 30px;
		}
	}
</style>
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