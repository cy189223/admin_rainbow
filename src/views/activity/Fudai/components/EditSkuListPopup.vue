<template>
	<a-modal :title="title" style="top: 100px;" :visible="true" width="1100px" @cancel="handleCancel">
		<div class="tips">
		</div>
		<a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="false"
			size="small">
			<a-table-column title="序号" width="20px">
				<template slot-scope="text, record, index">
					<div>{{ index+1 }}</div>
				</template>
			</a-table-column>
			<a-table-column title="图片" key="thumb" width="120px">
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
			<!-- <a-table-column title="标题" key="title" width="60px">
        <template slot-scope="row">
          <span>
            {{row.title}}
          </span>
        </template>
      </a-table-column> -->
			<a-table-column title="概率" key="number" width="50px">
				<template slot-scope="row">
					<div>
						{{row.odds || '-'}} %
						<!-- <a-input v-model="row.number" placeholder="请输入" style="width:160px;" /> -->
					</div>
				</template>
			</a-table-column>
			<a-table-column title="出奖区间" width="130px">
				<template slot-scope="row">
					<div>
						每
						{{row.lottery_start_point}}抽 ~ {{row.lottery_end_point}}抽
						<!-- <a-input v-model="row.number" placeholder="请输入" style="width:160px;" /> -->
					</div>
				</template>
			</a-table-column>
			<a-table-column title="回收价" width="100px">
				<template slot-scope="row">
					<div>
						<PriceDisplay :info="row"></PriceDisplay>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="显示零售价" width="100px">
				<template slot-scope="row">
					<div>
						<PriceDisplay :info="row" prefix="display_"></PriceDisplay>
					</div>
				</template>
			</a-table-column>
			<a-table-column title="库存" width="80px">
				<template slot-scope="row">
					<div>
						{{row.stock}}
					</div>
				</template>
			</a-table-column>
			<a-table-column title="销量" width="80px">
				<template slot-scope="row">
					<div>
						{{row.sales}}
					</div>
				</template>
			</a-table-column>
			<a-table-column title="SKU类型" width="120px">
				<template slot-scope="row">
					<ISkuType :info="row"></ISkuType>
				</template>
			</a-table-column>
			<a-table-column title="消耗欧气值" width="80px">
				<template slot-scope="row">
					<div>
						{{row.use_lucky_score || 0}}
					</div>
				</template>
			</a-table-column>
			<!-- <a-table-column title="已领取/已抽出" width="60px">
        <template slot-scope="row">
          <span>
            {{row.sales}}次 / {{row.allot_total}}次
          </span>
        </template>
      </a-table-column> -->
			<!-- <a-table-column title="上下架" width="80px">
        <template slot-scope="row">
          <span>
            <i-switch :active="row.status || 1" v-model="row.status" size="small"></i-switch>
          </span>
        </template>
      </a-table-column> -->
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
			},
			currentSkuLevel: {
				type: Number,
				default () {
					return 1
				}
			}
		},
		data() {
			return {
				list: [],
				frame: [{
						title: 'SKU类型',
						key: 'sku_type',
						type: 'radio',
						default: 1,
						required: true,
						span: 24,
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
							'score_price': 'score_price',
							'lottery_start_point': 'lottery_start_point',
							'lottery_end_point': 'lottery_end_point'
						},
						// where: {
						//   sku_type: 2
						// }
					},
					// {
					//   title: '',
					//   key: 'product_id',
					//   type: 'product_id',
					//   auto_fill_fields: {
					//  'lottery_start_point':'lottery_start_point',
					//  'lottery_end_point':'lottery_end_point'
					//   },
					// },
					// {
					//   title: '操作',
					//   type: 'button',
					//   text: '点击获取商品信息',
					//   where: {
					//     sku_type: 2
					//   }
					// },
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
						placeholder: '可填写编号方便在订单中对应货物'
						// required: true,
					},
					{
						title: '封面',
						key: 'thumb',
						type: 'image'
					},
					{
						title: '库存',
						key: 'stock',
						type: 'number',
						suffix: '',
						tips: '',
						newline: true,
						required: true,
					},
					{
						title: '开奖概率',
						key: 'odds',
						type: 'number',
						suffix: '%',
						tips: '概率之和可不等于100%。此处为概率权重。<br/>比如160权重的奖品比80权重的奖品开出概率高1倍',
						newline: true,
						required: true,
					},
					{
						title: '前端展示的开奖概率',
						key: 'front_odds',
						type: 'number',
						suffix: '%',
						tips: '仅用于前端展示，不用于实际计算',
						newline: true,
						required: true,
					},
					{
						title: '出奖区间',
						key_prefix: '',
						type: 'prize_interval',
						tips: '0为不使用开奖区间，一旦使用开奖区间，开奖概率仅为前台展示用，奖品在设置的开奖区间内随机出。',
						suffix: '出1个',
						newline: true,
						required: false,
					},
					{
						title: '回收价',
						key_prefix: '',
						type: 'mix_price',
						tips: '价值用于返售时作为返售原价进行折扣计算',
						newline: true,
						required: true,
					},
					{
						title: '显示零售价',
						key: 'display_money_price',
						type: 'price',
						tips: '仅用于显示',
						newline: true,
						required: true,
					},
					{
						title: '消耗欧气值',
						key: 'use_lucky_score',
						type: 'number',
						tips: '抽到此奖品额外扣除的欧气值',
						newline: true,
						// required: true,
						where: {
							level: 6
						}
					},
					{
						title: '奖品详情图',
						key: 'detail_images',
						type: 'images',
						newline: true,
						sizeLimit: 400,
						tips: '显示在用户的物品详情中。 不上传则不显示。 <br/> 长图请切成多张小图上传'
						// tips: '不设置则没有连'
						// required: true
					},
					{
						title: '发数',
						key: 'target_index',
						type: 'number',
						suffix: '',
						tips: '',
						newline: true,
						required: true,
					},
					{
						title: '手机号',
						key: 'target_phone',
						type: '',
						suffix: '',
						tips: '',
						newline: true,
						required: true,
					},
				]
			}
		},
		computed: {
			title() {
				if (this.currentSkuLevel === 6) {
					return '编辑<回血池>奖品'
				}

				return '编辑<' + this.info.sku_level[this.currentSkuLevel - 1].title + '> 奖品'
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
				this.$http.get(`/fudais/${this.info.uuid}/skus`, {
					params: {
						level: this.currentSkuLevel,
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
						this.$http.post(`/fudais/${this.info.uuid}/skus`, {
							...data,
							lottery_start_point:data.lottery_start_point || 0,
							lottery_end_point:data.lottery_end_point || 0,
							level: this.currentSkuLevel,
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
						this.$http.put(`/fudai/skus/${row.uuid}`, {
							type: 'update',
							attributes: {
								...data,
								lottery_start_point:data.lottery_start_point || 0,
								lottery_end_point:data.lottery_end_point || 0,
							}
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

						this.$http.delete(`/fudai/skus/${row.uuid}`).then(res => {
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
		font-size: 80%;
		margin-bottom: 10px;
	}

	a-input {
		display: inline;
	}
</style>