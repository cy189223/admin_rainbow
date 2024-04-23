<template>
	<div class="list">
		<div class="content-head" style="margin-bottom: 20px;">
			<div class="sort-keys">

				<div class="tab-list">
           <div class="item" @click="status = item.key" :class="{actived: status === item.key}"
             v-for="(item, index) in statusList">
             {{item.text}}
             ({{statusTotal[item.key]}})
           </div>
         </div>

				       <!-- <a-input-search placeholder="input search text" enter-button @search="onSearch" />
            <br /><br /> -->
				<a-input-search placeholder="输入关键字" enter-button  style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" @search="onSearch" />
		  <router-link to="/activity/pk/setting"
		  	style="margin: 0px 10px;">规则配置</router-link>


			</div>
			<a-button type="primary" icon="plus" @click="handleCreate" v-if="!selectMode">创建{{resourceTypeText}}</a-button>
		</div>
		<a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">

			<!-- <a-table-column title="ID" width="30px">
				<template slot-scope="row">
					<div class="title-c">
						{{row.id}}
					</div>
				</template>
			</a-table-column> -->
			<a-table-column title="标题" width="240px">
			  <template slot-scope="row">
			    <div class="title-c">
			      <img class="thumb" :src="row.thumb" />
			      <div class="right">
			        <div class="title">{{row.title}}</div>
			
			        <PriceDisplay :info="row"></PriceDisplay>
			        <!-- <div class="time"> {{$tool.formatDate(row.start_at, 'MM-dd hh:mm')}}</div>
			        <div class="time" v-if="">{{$tool.formatDate(row.end_at, 'MM-dd hh:mm')}}</div> -->
			      </div>
			    </div>
			  </template>
			</a-table-column>
			<a-table-column title="分类" width="80px">
			  <template slot-scope="row">
			    <div>{{row.type == 1 ? '全局赏' : 'PK赏'}}</div>
			  </template>
			</a-table-column>
			<a-table-column title="已开箱数" width="100px">
			  <template slot-scope="row">
			      <a href="javascript:;" @click="handleShowPackageSku(row)">
			        <span>已开{{row.rooms_count}}箱</span>
			      </a>
			  </template>
			</a-table-column>
			<a-table-column title="奖品池" width="280px">
			  <!-- <div slot="title">
			    奖品池
			  </div> -->
			  
			  <template slot-scope="row">
				  <!-- <a href="javascript:;" @click="handleShowPackageSku(row)">
				    <span>已开{{row.rooms_count}}箱</span>
				  </a> -->
			    <template>
					<!-- 全局赏 -->
					<div v-if="row.type == 1" style="margin-bottom: 4px;" v-for="(item,name) in row.sku_cate">
					  <span class="level-title" style="margin-right: 10px;">{{name == 'N' ? '全局奖品' : (name == 'A' ? '保底奖品' : '串串奖励')}}</span>
					  <a href="javascript:;" @click="handleEditSkuList(row, name)">
					    <span class="">{{item.sku_total}}种奖品</span>
					  </a>
					</div>
					<!-- pk -->
					<div v-if="row.type == 2" style="margin-bottom: 4px;" v-for="(item,name) in row.sku_cate">
					  <span class="level-title" style="margin-right: 10px;">{{name == 'N' ? '全局奖品' : (name == 'A' ? 'A阵营保底奖品' :'B阵营保底奖品')}}</span>
					  <a href="javascript:;" @click="handleEditSkuList(row, name)">
					    <span class="">{{item.sku_total}}种奖品</span>
					  </a>
					</div>
			    </template>
			  </template>
			</a-table-column>
			<a-table-column title="排序" width="80px" v-if="!selectMode">
			  <template slot-scope="row">
			    {{row.list_weight}}
			    <span @click="handleEditListWeight(row)" style="margin-left: 10px;"><a href="javascript:;">
			        <a-icon type="edit" />
			      </a></span>
			  </template>
			</a-table-column>
			<a-table-column title="上/下架" width="60px" v-if="!selectMode">
			  <template slot-scope="row">
			    <ISwitch :value="row.status" :active="1" :unactive="0" @change="listedStatusChange($event, row)" />
			  </template>
			</a-table-column>
			<a-table-column title="创建日期" width="100px">
			  <template slot-scope="row">
			    <span>{{$tool.showShortTime(row.created_at)}}</span>
			  </template>
			</a-table-column>
			<a-table-column title="操作" width="180px" v-if="!selectMode">
			  <template slot-scope="row">
			    <span>
			      <!-- <a href="javascript:;" @click="getPath(row)">预览/路径</a>
			      <a-divider type="vertical" /> -->
			      <a href="javascript:;" @click="handleEdit(row)">编辑</a>
			      <div style="margin-top: 10px;">
			        <a href="javascript:;" @click="handleDelete(row)">删除</a>
			        <!-- <a-divider type="vertical" />
			        <a href="javascript:;" style="color: red;" @click="handleTestLottery(row)">模拟测试</a> -->
			      </div>
			    </span>
			  </template>
			</a-table-column>
			<!-- <a-table-column title="价格" width="120px">
        <template slot-scope="row">
          <PriceDisplay :info="row" v-if="row.is_need_pay"></PriceDisplay>
          <div v-else>免费</div>
        </template>
      </a-table-column> -->
			<!-- <a-table-column title="开始时间" width="50px">
				<template slot-scope="row">
					<div class="title-c">{{row.created_at}}</div>
				</template>
			</a-table-column> -->
			<!-- <a-table-column title="结束时间" width="50px">
				<template slot-scope="row">
					<div class="title-c">{{row.completetime}}</div>
				</template>
			</a-table-column> -->
			<!-- <a-table-column title="状态" width="30px">
				<template slot-scope="row">
					<div class="title-c">{{row.status == 1 ? '进行中' : '已开奖'}}</div>
				</template>
			</a-table-column> -->
			<!-- <a-table-column width="280px">
				<div slot="title">
					详情
				</div>
				<template slot-scope="row">
					<div v-for="(item,index) in row.users" :key="item.uuid">
						<div style="margin-bottom: 4px; display: flex;" v-if="row.status == 2">
							<span class="level-title" style="margin-right: 10px;">{{item.type}}阵营</span>
							<span v-if="item.user" class="level-title"
								style="margin-right: 10px;">进房时间：{{item.jointime}}</span>
							<div class="user-info-content" v-if="item.user" style="margin-right: 10px;">
								<img class="headimg" :src="item.user.headimg" alt="">
								<div class="user-ame">{{ item.user.name }}</div>
							</div>
							<a href="javascript:;" @click="showUserList(item)" v-if="item.packages.length > 0">
								<span class="">{{item.packages.length}}个奖品</span>
							</a>
							<span v-if="row.status == 2 && item.packages.length == 0">未中奖</span>
						</div>
						<div style="margin-bottom: 4px; display: flex;" v-else-if="ifHasUser(row.users)">
							<span class="level-title" style="margin-right: 10px;">{{item.type}}阵营</span>
							<span v-if="item.user" class="level-title"
								style="margin-right: 10px;">进房时间：{{item.jointime}}</span>
							<div class="user-info-content" v-if="item.user" style="margin-right: 10px;">
								<img class="headimg" :src="item.user.headimg" alt="">
								<div class="user-ame">{{ item.user.name }}</div>
							</div>
							<a href="javascript:;" @click="showPlaceList(item)" v-if="item.skus.length > 0">
								<span class="">{{item.skus.length}}个奖品</span>
							</a>
							<span v-if="row.status == 2 && item.packages.length == 0">未中奖</span>
						</div>
					</div>
				</template>
			</a-table-column> -->
			<!-- <a-table-column width="80px">
	    <div slot="title">
	      进房时间
	    </div>
	    <template slot-scope="row">
	      <div v-for="(item,index) in row.users" :key="item.uuid">
	  			  <div style="margin-bottom: 4px; display: flex;">
	  				  <span class="level-title" style="margin-right: 10px;">{{item.jointime}}</span>
	  			  </div>
	      </div>
	    </template>
	  </a-table-column> -->
		</a-table>

		<a-modal :title=" resourceTypeText + '详情'" style="top: 100px;" :visible="isEdit" width="1000px"
			@cancel="isEdit = false" :footer="null">
			<Edit v-if="isEdit" :uuid="editUuid" @cancel="isEdit = false" @success="fetchData" />
		</a-modal>
		<UserList v-if="isShowUserList" :list="itemList" :uuid="editUuid" @refresh="fetchData"
			@close="isShowUserList = false"></UserList>
		<PlaceList v-if="isShowPlaceList" :list="itemList" :uuid="editUuid" @refresh="fetchData"
			@close="isShowPlaceList = false"></PlaceList>

		<!-- <EditSkuList :info="current" :currentSkuLevel="currentSkuLevel" v-if="isEditSkuList" @refresh="fetchData" @close="isEditSkuList = false"></EditSkuList> -->

		<!-- <EditSkuLevel :info="current" v-if="isEditSkuLevel" @refresh="fetchData" @close="isEditSkuLevel = false"></EditSkuLevel> -->

	<EditSkuList :info="current" :currentSkuLevel="currentSkuLevel" v-if="isEditSkuList" @refresh="fetchData" @close="isEditSkuList = false"></EditSkuList>
	<EditPackageSku :info="current" :uuid="editUuid" v-if="isEditPackageSku" @refresh="fetchData" @close="isEditPackageSku = false"></EditPackageSku>
	</div>
</template>
<script>
	import moment from 'moment'
	import ISwitch from '@/components/ISwitch/ISwitch'

	import Edit from "./Edit.vue"
	import UserList from './components/UserList'
	import PlaceList from './components/placeList'


	import EditSkuList from './components/EditSkuListPopup.vue'
	// import EditSkuLevel from './components/EditSkuLevelPopup.vue'
	import  EditPackageSku from './components/EditPackageSkuPopup.vue'

	const resourceType = 'pks'
	const resourceTypeText = '拳击'

	export default {
		components: {
			ISwitch,
			Edit,
			UserList,
			PlaceList,
			EditSkuList,
			EditPackageSku
			
			
			// EditSkuList,
			// EditSkuLevel
		},
		props: {
			selectMode: {
				type: Boolean
			},
			params: {
				type: Object
			},
			size: {
				type: String,
				default: 'default'
			},
			type: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				itemList: [],
				isEdit: false,
				editUuid: '',
				current: {},
				isEditSkuLevel: false,
				isEditSkuList: false,
				currentSkuLevel: 1,
				resourceTypeText,
				exportOptions: {
					status: 'all',
					startTime: '',
					endTime: '',
					type: 'normal'
				},
				status: 'unexpired',
				list: [],
				page: 1,
				per_page: 10,
				total: 0,
				key: '',
				category_id: undefined,
				statusList: [{
						text: '上架中',
						key: 'on_stock'
					},
					{
						text: '已下架',
						key: 'off_stock'
					},
					{
						text: '售罄',
						key: 'sell_out'
					}
				],
				status: 'on_stock',
				statusTotal: {
					on_stock: 0,
					off_stock: 0,
					sell_out: 0,
					marked: 0
				},
				isShowUserList: false,
				isShowPlaceList: false,
				
				
				isEditPackageSku: false,

			}
		},
		watch: {
			params() {
				this.refreshData()
			},
			category_id() {
				this.refreshData()
			},
			type() {
				this.refreshData()
			},
			status() {
				this.page = 1
				this.refreshData()
			}
		},
		computed: {
			pagination() {
				return {
					defaultPageSize: this.per_page,
					defaultCurrent: this.page,
					total: this.total,
					onChange: (e) => {
						this.page = e
						// this.per_page = e.pageSize
						this.fetchData()
					}
				}
			}
		},
		filters: {},
		created() {
			this.fetchData()
			// this.getCategoryList()
		},
		methods: {
			// 展示所有抽奖记录
			handleShowPackageSku(row) {
			  this.editUuid = row.uuid
			  this.current = row
			  this.isEditPackageSku = true
			},
			//pk进行中时，显示某哥位置的奖品列表
			showPlaceList(row) {
				this.editUuid = row.uuid
				this.itemList = row
				this.isShowPlaceList = true
				console.log(this.itemList, this.isShowPlaceList)
			},
			//pk结束时，显示某个人的奖品列表
			showUserList(row) {
				this.editUuid = row.uuid
				this.itemList = row
				this.isShowUserList = true
			},
			handleEdit(row) {
				console.log(row)
				this.editUuid = row.uuid
				this.isEdit = true
				this.$http(`/pks/${row.uuid}`).then((res) => {
					console.log(res)
				})
			},
			fetchTotalData() {
				this.$http('/status-total/activity/pk').then((res) => {
					this.statusTotal = res.data.total
				})
			},
			handleEditSkuList(row, level) {
				this.current = row
				this.currentSkuLevel = level
				this.isEditSkuList = true
			},
			getPath(row) {
				this.$getPathPopup.show({
					page: '/pages/fudai/detail',
					param: 'uuid=' + row.uuid
				})
			},
			handleDelete(row) {
				this.$confirm({
					title: '提示',
					content: `确认删除吗？`,
					onOk: () => {
						this.$http.delete(`/${resourceType}/${row.uuid}`).then(res => {
							this.fetchData()
						})
					}
				})
			},
			updateItem(row, data) {
				return this.$http.patch(`/${resourceType}/${row.uuid}`, {
					type: 'update',
					attributes: {
						...data
					}
				})
			},
			listedStatusChange(e, row) {
				this.updateItem(row, {
					status: e
				}).then(res => {
					this.fetchData()
				})
			},
			handleEditSkuLevel(row) {
				this.current = row
				this.isEditSkuLevel = true
			},
			handleEditListWeight(row) {
				this.$globalForm.show({
					title: '编辑排序',
					items: [{
						type: 'number',
						key: 'list_weight',
						title: '排序',
						default: row.list_weight,
						required: true
					}, ],
					success: (data) => {
						this.updateItem(row, {
							...data
						}).then(res => {
							this.$message.success('保存成功');
							this.$globalForm.hide()
							this.fetchData()
						})
					}
				})
			},
			handleCreate() {
				this.editUuid = ""
				this.isEdit = true
			},

			refreshData() {
				this.page = 1
				this.key = ''
				this.fetchData()
			},
			onSearch(e) {
				this.page = 1
				this.fetchData()
				// clearTimeout(this.timeout)
				// this.timeout = setTimeout(() => {
				//   this.fetchData()
				// }, 300)
			},
			fetchData() {
				this.isEdit = false
				this.$http.get(`/${resourceType}`, {
					params: {
						// type: activityType,
						status: this.status,
						...this.params,
						page: this.page,
						per_page: this.per_page,
						// type: this.type,
						key: this.key,
						category_id: this.category_id
					}
				}).then(res => {
					this.list = res.data.list
					this.total = res.data.item_total
				}).finally(() => {
					this.fetchTotalData()
					this.loading = false
				})
			},
			getCategoryList() {
				this.$api.emit('category.list', 'article').then(res => {
					this.category = res.data.list
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.content-head {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.level-title {
		// font-size: 100%;
		font-weight: 500;
	}

	.sort-keys {
		display: flex;
		align-items: center;

		.tab-list {
			display: flex;
			margin-top: 6px;
			border-bottom: 1px solid #e1e1e1;
			margin-right: 50px;

			.item {
				margin-right: 30px;
				padding: 0px 10px 4px 10px;
				cursor: pointer;
				font-weight: 500;

				&.actived {
					color: #1890FF;
					border-bottom: 3px solid #1890FF;
				}

				&:hover {
					color: #1890FF;
				}
			}
		}

	}

	.table {

		.title-c {
			display: flex;
			align-items: center;

			.thumb {
				margin-right: 10px;
				height: 60px;
				border-radius: 6px;
			}

			.title {
				font-weight: 500;
				min-height: 30px;
			}

			.time {
				color: gray;
				font-size: 80%;
			}
		}
	}

	.add-blood-row {
		background: #f1f1f1;
		padding: 10px 10px;
		position: relative;
		left: -10px;
	}

	.user-info-content {
		display: flex;
		align-items: center;

		img {
			width: 20px;
			height: 20px;
			border-radius: 50%;
			margin-right: 5px;
		}

		.address {
			margin-left: 15px;
		}
	}
</style>