<template>
  <a-modal :title="title" style="top: 100px;" :visible.sync="isShow" width="1000px" @ok="handleSubmit"
    @cancel="handleCancel">
    <div>
      <div class="content-head" style="margin-bottom: 20px;">
        <div class="sort-keys">
          <a-input placeholder="输入关键字" style="width: 180px;margin-right:10px;" v-model="key" allowClear/>
          <a-button type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button>

         <a-radio-group v-model="type" buttonStyle="solid" style="margin-right:10px;">
           <a-radio-button value="all">全部({{total}})</a-radio-button>
           <a-radio-button value="selected">已选({{ids.length}})</a-radio-button>
         </a-radio-group>

        </div>
      </div>
      <!-- {{ids}} -->
      <a-table class="table" :row-selection="selection" borded :rowKey="row => row.id" :dataSource="list"
        :pagination="pagination" size="small">
        <a-table-column title="封面" width="80px">
          <template slot-scope="row">
            <img class="thumb" :src="row.thumb">
          </template>
        </a-table-column>
        <a-table-column title="上下架" width="40px">
          <template slot-scope="row">
            <a-tag color="red" size="small" v-if="row.status == 0">已下架</a-tag>
            <a-tag color="blue" size="small" v-if="row.status == 1">上架中</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="标题" width="330px">
          <template slot-scope="row">
            <div>{{row.title}}</div>
          </template>
        </a-table-column>
        <a-table-column title="售价" width="200px">
          <template slot-scope="row">
            <PriceDisplay :info="row"></PriceDisplay>
          </template>
        </a-table-column>
        <a-table-column title="创建时间" width="200px">
          <template slot-scope="row">
            <span>{{row.created_at}}</span>
          </template>
        </a-table-column>
      </a-table>
      <div>已选: {{ids.length}} 项</div>
    </div>
  </a-modal>
</template>

<script>
  const resourceType = 'boxes'

  export default {
    name: 'Popup',
    components: {},
    props: {
      initIds: {
        type: Array
      },
      mode: {
        type: String,
        default () {
          return 'checkbox'
        }
      }
    },
    data() {
      return {
        title: '选择盲盒',
        isShow: true,
        key: '',
        list: [],
        ids: [],
        per_page: 10,
        page: 1,
        total: 0,
        type: 'all'
      }
    },
    computed: {
      selection() {
        return {
          type: this.mode,
          selectedRowKeys: this.ids,
          onChange: (ids) => {
            this.ids = ids
          }
        }
      },
      pagination() {
        return {
          defaultPageSize: this.per_page,
          defaultCurrent: this.page,
          total: this.total,
          onChange: (e) => {
            this.page = e
            // this.page = e.current
            // this.per_page = e.pageSize
            this.fetchData()
          }
        }
      }
    },
    mounted() {
      this.ids = this.initIds
      this.fetchData()
    },
    watch: {
      key() {
        this.page = 1
        this.fetchData()
      },
      type () {
        this.page = 1
        this.fetchData()
      }
    },
    methods: {
      refreshData () {
        this.page = 1
        this.fetchData()
      },
      handleSubmit() {
        this.$emit('change', this.ids)
        this.$emit('close')
      },
      handleCancel() {
        this.$emit('close')
      },
      fetchData() {
        this.$http.get(`/${resourceType}`, {
          params: {
            page: this.page,
            per_page: this.per_page,
            key: this.key,
            ids: this.type == 'all' ? [] : this.ids
          }
        }).then(res => {
          this.list = res.data.list
          this.total = res.data.item_total
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .table {

    .thumb {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }

    .right {
      margin-left: 10px;
    }

    .title {
      // min-height: 30px;
      min-width: 100px;
      font-weight: 500;
    }

  }
</style>
