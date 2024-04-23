<template>
	<div class="container">

		<a-tabs default-active-key="1">
			<a-tab-pane key="1" tab="基础设置">
				<IForm :formFrame="frameBase" class="form-container" :formData.sync="form"></IForm>
			</a-tab-pane>
			<a-tab-pane key="2" tab="规则设置" force-render>
				<IForm :formFrame="frameUI" class="form-container" :formData.sync="form"></IForm>
			</a-tab-pane>
		</a-tabs>

		<!-- <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm> -->
		<div slot="action" style="display: flex; justify-content: flex-end;">
			<a-button class="btn" @click="cancel">取消</a-button>
			<a-button class="btn" type="primary" @click="submit">提交</a-button>
		</div>
		<!-- <AttrEditor :form.sync="form">
			<div slot="action">
				<a-button class="btn" @click="cancel">取消</a-button>
				<a-button class="btn" type="primary" @click="submit">提交</a-button>
			</div>
		</AttrEditor> -->

	</div>
</template>

<script>
	// import AttrEditor from "./components/AttrEditor"
	import IForm from "@/components/IForm"

	const resourceType = 'yi-fan-shangs'

	export default {
		components: {
			IForm
			// AttrEditor
		},
		data() {
			return {
				form: {},
				// type: 'lottery_egg',
				categoryList: []
			}
		},
		props: {
			uuid: {
				type: String
			},
		},
		computed: {
			categoryOptions() {
				return this.categoryList.map(item => {
					return {
						title: item.title,
						value: item.id
					}
				})
			},
			frameBase() {
				return [{
						title: '活动标题',
						key: 'title',
						newline: true,
						required: true
					},
					{
						title: '副标题',
						key: 'sub_title',
						placeholder: '例如: 直播中随机抽取10位幸运儿',
						newline: true,
						// required: true
					},
					{
						title: '分类',
						key: 'type',
						type: 'radio',
						default: 'yfs',
						required: true,
						options: [{
								title: '一番赏',
								value: 'yfs'
							},
							{
								title: '双随机',
								value: 'ssj'
							}
						],
						tips: ' <span style="color:red;">创建后不可更改</span>',
						disabled: this.uuid,
						newline: true,
					},
					{
						title: '标签',
						key: 'tags',
						type: 'tags',
						placeholder: '',
						tips: '选填， 显示在列表标题下方',
						newline: true,
						required: true,
					},
					// {
					//   title: '参与码',
					//   key: 'join_codes',
					//   tips: '选填。参与码可设置多个，可在公众号或微信群中发放给用户',
					//   type: 'tags',
					//   newline: true,
					// },
					{
						title: '封面',
						key: 'thumb',
						type: 'image',
						tips: '800*800',
						sizeLimit: 200,
						isShowImageTips: false,
						newline: true,
						required: true
					},
					// {
					// 	title: '轮播图',
					// 	key: 'images',
					// 	type: 'images',
					// 	tips: '750*360',
					// 	isShowImageTips: false,
					// 	newline: true,
					// 	required: true
					// },
					// {
					//   title: '开奖时3D蛋图/盒图',
					//   key: 'image_3d',
					//   type: 'image',
					//   isShowImageTips: false,
					//   tips: '600*900 png, 不传则使用默认',
					//   newline: true,
					//   // required: true
					// },
					// {
					//   title: '开放参与时间',
					//   key: 'start_at',
					//   type: 'date',
					//   newline: true,
					//   required: true,
					// },
					// {
					//   title: '是否需要支付',
					//   key: 'is_need_pay',
					//   type: 'radio',
					//   default: 0,
					//   options: [
					//     {
					//       title: '免费参与',
					//       value: 0
					//     },
					//     {
					//       title: '需要支付',
					//       value: 1
					//     }
					//   ],
					//   newline: true,
					// },
					{
						title: '售价',
						key_prefix: '',
						type: 'mix_price',
						newline: true,
						required: true,
					},
					{
						title: '赏品设置',
						type: 'text',
						text: '创建后在列表中设置赏品',
					},
					{
						type: 'blank',
						newline: true,
					},
					{
						title: '详情图',
						key: 'detail_images',
						type: 'images',
						isShowImageTips: false,
						tips: '1000px宽度，高度不限，长图请切成多张小图上传',
						newline: true,
					}
				]
			},
			frameUI() {
				return [{
						title: '箱子(房间)数量',
						type: 'number',
						key: 'room_total',
						tips: '<span style="color:red;">创建后不可更改</span>',
						required: true,
						disabled: this.uuid
					},
					{
						title: '购买赏种类',
						type: 'number',
						key: 'normal_sku_total',
						tips: '默认ABCDEF共6个赏 <span style="color:red;">创建后不可更改</span> 购买赏即用户可通过购买获取的赏品',
						required: true,
						default: 6,
						disabled: this.uuid,
					},
					{
						title: '赠送赏种类',
						type: 'number',
						key: 'gift_sku_total',
						tips: '默认First、Last赏共2个赏 <span style="color:red;">创建后不可更改</span> 赠送赏不可通过购买获得，赠送赏只能在指定参与用户段中自动抽取送出',
						required: true,
						default: 2,
						span: 24,
						disabled: this.uuid,
						where: {
							type: 'ssj'
						}
					},
					{
						title: '赠送赏',
						key: 'gift_sku_total1',
						type: 'radio',
						default: 1,
						required: true,
						options: [{
								title: '不赠送',
								value: 0
							},
							{
								title: '赠送1种赏',
								value: 1
							}
						],
						tips: ' <span style="color:red;">创建后不可更改</span>',
						disabled: this.uuid,
						newline: true,
						where: {
							type: 'yfs'
						}
					},
					{
						type: 'blank',
					},
					{
						title: '随机免单',
						type: 'number',
						input_width: '160px',
						key: 'free_order_total',
						placeholder: '0为无免单',
						// tips: '0为不限制',
						prefix: '每一箱中随机',
						suffix: '发免单'
					},
					{
						type: 'blank',
					},
					{
						title: '全包设置',
						type: 'number',
						input_width: '160px',
						key: 'last_stock_all_pick_enable',
						placeholder: '0为不限制',
						tips: '0为不限制',
						prefix: '最后剩',
						suffix: '发时才可全包'
					},
					{
						title: '上半场设置',
						type: 'number',
						input_width: '160px',
						key: 'half_buy_before_all_pick',
						placeholder: '0为不限制',
						tips: '0为不限制',
						prefix: '上半场抽过',
						suffix: '发的用户才允许参与全包'
					},
					{
						title: '全场设置',
						type: 'number',
						input_width: '160px',
						key: 'buy_before_all_pick',
						placeholder: '0为不限制',
						tips: '0为不限制',
						prefix: '全场抽过',
						suffix: '发的用户才允许参与全包'
					},
					{
						type: 'blank',
						newline: true,
					},
					{
						title: '用户参与次数限制',
						key: 'per_user_limit',
						prefix: '每个用户本活动中总共可抽',
						type: 'number',
						suffix: '次',
						tips: '0为不限制',
					},
					{
						title: '限制每次单发抽',
						key: 'is_limit_1',
						type: 'boolean',
						default: 0,
						tips: '开启后每次只能单发抽，其它连抽将禁用',
					},
					{
						title: '必须绑定手机',
						key: 'is_need_phone',
						type: 'boolean',
						default: 0,
						tips: '开启后会强制用户先绑定手机号',
					},
					{
						type: 'blank',
						newline: true,
					},
				]
			}
		},
		created() {},
		mounted() {
			this.uuid = this.uuid || this.$route.params.uuid

			// this.$http.get('/article/categories').then(res => {
			// 	this.categoryList = res.data.list
			// })

			this.initForm()
		},
		watch: {
			uuid() {
				this.initForm()
			}
		},
		methods: {
			initForm() {
				if (this.uuid) {
					this.$http(`/${resourceType}/${this.uuid}`).then(res => {
						this.form = res.data.info
					})
				} else {
					this.form = {
						...this.$initForm(this.frameBase),
						// ...this.$initForm(this.frameUI)
					}
				}
				console.log(this.form)
			},
			cancel() {
				this.uuid = ''
				this.$emit('cancel')
				// this.$router.back(-1)
			},
			create() {
				console.log(this.form)
				if (this.form.type == 'ssj') {
					if(this.form.gift_sku_total < 2){
						this.$message.warning('赠送商品最少为2个')
						return
					}else{
						delete this.form.gift_sku_total1
					}
				}else{
					this.$set(this.form,'gift_sku_total',this.form.gift_sku_total1)
					delete this.form.gift_sku_total1
				}
				this.$http.post(`/${resourceType}`, {
					type: this.type,
					...this.form,
				}).then(res => {
					this.$message.success('创建成功')
					this.$emit('success')
					// this.$router.push({
					// 	path: './list'
					// })
				})
			},
			update() {
				this.$http.patch(`/${resourceType}/${this.uuid}`, {
					type: 'update',
					attributes: this.form
				}).then(res => {
					this.$message.success('更新成功')
					this.$emit('success')
					// this.uuid = ''
					// this.form = {}

					// this.$router.push({
					// 	path: '../list'
					// })
				})
			},
			submit() {
				if (this.uuid)
					this.update()
				else
					this.create()
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