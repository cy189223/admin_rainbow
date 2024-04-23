<template>
  <a-modal :title="`所有抽取记录(${this.total}条)`" style="top: 100px;" :visible="true" width="1000px" @cancel="handleCancel">
    <a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="pagination" size="small">
     <!-- <a-table-column title="序号" width="20px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column> -->
      <!-- <a-table-column title="图片" key="thumb" width="80px">
        <template slot-scope="row">
          <img :src="row.thumb" class="thumb" />
          {{row.title}}
        </template>
      </a-table-column> -->

      <a-table-column title="序号" key="title" width="40px">
        <template slot-scope="text, record, index">
          <span>
            第{{ total- (page-1) * perPage - index}}箱
          </span>
        </template>
      </a-table-column>
			<a-table-column title="开箱时间" width="110px">
				<template slot-scope="row">
					<div class="title-c">{{row.created_at}}</div>
				</template>
			</a-table-column>
			<a-table-column title="结束时间" width="110px">
				<template slot-scope="row">
					<div class="title-c">{{row.completetime}}</div>
				</template>
			</a-table-column>
			<a-table-column title="状态" width="40px">
				<template slot-scope="row">
					<div class="title-c">{{row.status == 1 ? '进行中' : '已开奖'}}</div>
				</template>
			</a-table-column>
			<a-table-column width="280px">
				<div slot="title">
					详情
				</div>
				<template slot-scope="row">
					<div v-for="(item,index) in row.users" :key="item.uuid">
						<div style="margin-bottom: 4px; display: flex;" v-if="row.status == 2">
							<span class="level-title" style="margin-right: 10px;">{{item.type}}{{item.type == 'A' ? item.seat_code : '阵营'}}</span>
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
							<span class="level-title" style="margin-right: 10px;">{{item.type}}{{item.type == 'A' ? item.seat_code : '阵营'}}</span>
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
			</a-table-column>
     <!-- <a-table-column title="箱内抽取序号" key="title" width="60px">
        <template slot-scope="row">
          <span>
            {{row.open_index}}
          </span>
        </template>
      </a-table-column> -->
      <!-- <a-table-column title="编号" key="title" width="20px">
        <template slot-scope="row">
          <span>
            {{row.sid}}
          </span>
        </template>
      </a-table-column> -->
      <!-- <a-table-column title="标题" key="title" width="90px">
        <template slot-scope="row">
          <a-tag color='blue' v-if="row.options.shang_type === 0">{{ row.options.shang_title }}</a-tag>
          <a-tag color='orange' v-else>{{ row.options.shang_title }}</a-tag>
          <span>
            {{row.title}}
          </span>
        </template>
      </a-table-column>
      <a-table-column title="数量" key="title" width="30px">
        <template slot-scope="row">
          <span>
            {{row.total}}
          </span>
        </template>
      </a-table-column>
      <a-table-column title="状态" key="title" width="60px">
        <template slot-scope="row">
          <span>
            {{row.union_status_text}}
          </span>
        </template>
      </a-table-column>
      <a-table-column title="用户" key="title" width="60px">
        <template slot-scope="row">
          <span v-if="row.user">
            {{row.user.name}}
          </span>
        </template>
      </a-table-column>
      <a-table-column title="开取时间" width="90px">
        <template slot-scope="row">
          <span>
            {{row.created_at}}
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
      <!-- <a-table-column title="操作" width="80px">
        <template slot-scope="row">
          <a href="javascript:;" @click="handleEditOdds(row)">编辑概率</a>
        </template>
      </a-table-column> -->
    </a-table>
    <template slot="footer">
      <div class="btn-c">
        <!-- <a-button type="primary" class="add" @click="handleCreate">
          新增一款
        </a-button> -->
        <div style="flex-grow: 1;"></div>

        <a-button key="back" @click="handleCancel">关闭</a-button>
        <!-- <a-button key="submit" type="primary" @click="handleSave">
          保存
        </a-button> -->
      </div>
    </template>
	<UserList v-if="isShowUserList" :list="itemList" :uuid="editUuid"
		@close="isShowUserList = false"></UserList>
	<PlaceList v-if="isShowPlaceList" :list="itemList" :uuid="editUuid" @close="isShowPlaceList = false"></PlaceList>
  </a-modal>
</template>
<script>
  import UploadImages from '@/components/UploadImages/UploadImages'
  import iSwitch from '@/components/ISwitch/ISwitch'
  import PlaceList from './placeList'
  import UserList from './UserList'
  // import EditOdds from './EditOddsPopup.vue'

  export default {
    components: {
      UploadImages,
      iSwitch,
	  PlaceList,
	  UserList
      // EditOdds
    },
    props: {
      uuid: {
        type: String,
        default () {
          return ''
        }
      },
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
        page: 1,
        perPage: 15,
        total: 0,
		isShowPlaceList:false,
		isShowUserList:false,
      }
    },
    watch: {
      uuid() {
        this.initList()
      }
    },
    created() {
      this.initList()
    },
    computed: {
      pagination() {
        return {
          defaultPageSize: this.perPage,
          defaultCurrent: this.page,
          total: this.total,
          onChange: (e) => {
            this.page = e
            // this.per_page = e.pageSize
            this.initList()
          }
        }
      }
    },
    methods: {
		//pk结束时，显示某个人的奖品列表
		showUserList(row) {
			this.editUuid = row.uuid
			this.itemList = row
			this.isShowUserList = true
		},
		//pk进行中时，显示某哥位置的奖品列表
		showPlaceList(row) {
			this.editUuid = row.uuid
			this.itemList = row
			this.isShowPlaceList = true
			console.log(this.itemList, this.isShowPlaceList)
		},
		ifHasUser(items) {
			for (let i = 0, leng = items.length; i < leng; i++) {
				const item = items[i]
				if (item.user) {
					return true
				}
			}
			return false
		},
      initList() {
        this.$http.get(`/pk-rooms/${this.uuid}`, {
          params: {
            page: this.page,
            per_page: this.perPage,
            // node_type: 'pk',
            // node_id: this.info.id
			// uuid:this.uuid,
          }
        }).then(res => {
          this.list = res.data.list
          this.total = res.data.item_total
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
        this.$http.delete(`/activities/${this.uuid}/skus/${row.uuid}`).then(res => {
          this.$message.success('删除成功')
          this.initList()
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .thumb {
    width: 60px;
    height: 60px;
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
