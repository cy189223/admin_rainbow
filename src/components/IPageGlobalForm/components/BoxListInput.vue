<template>
  <div>
    <div class="list">
      <div class="item" v-for="(item, index) in list">
        <a-icon class="action-item delete-icon" type="delete" @click.stop="deleteItem(item)"></a-icon>
        <img :src="item.thumb" class="thumb" />
        <div class="status-c" v-if="item.status == 0">已下架</div>
        <div class="title" :title="item.title">{{item.title}}</div>
      </div>
      <div class="item add-item" @click="isShowSelect = true">
        <a-icon class="add-icon" type="plus"></a-icon>
        <div class="title">添加</div>
      </div>
    </div>
    <!-- <a-select class="select" mode="multiple" v-model="ids">
      <a-select-option :value="option.id" v-for="option in list">
        {{option.title}}
       </a-select-option>
    </a-select> -->
    <BoxListPopup v-if="isShowSelect" :initIds="ids" @change="ids = $event" @close="isShowSelect = false"></BoxListPopup>
  </div>
</template>
<script>
  import BoxListPopup from "@/components/SelectListPopup/Box.vue"
  export default {
    components: {
      BoxListPopup
    },
    data() {
      return {
        isShowSelect: false,
        list: [],
        ids: []
      };
    },
    props: {
      value: {
        type: Array,
        default () {
          return []
        }
      }
    },
    watch: {
      value(val) {
        this.ids = val || []
      },
      ids() {
        this.$emit('input', this.ids)

        this.getListInfo()
      }
    },
    mounted() {
      this.ids = this.value || []

      this.getListInfo()
    },
    methods: {
      getListInfo() {
        if (this.ids.length) {
          this.$http.get('/boxes', {
            params: {
              ids: this.ids
            }
          }).then(res => {
            this.list = res.data.list
          })
        } else {
          this.list = []
        }
      },
      deleteItem(item) {
        this.ids.splice(this.ids.indexOf(item.id), 1)
      }
    }
  };
</script>
<style lang="scss" scoped>
  .list {
    display: flex;
    flex-wrap: wrap;

    .item {
      margin-right: 10px;
      margin-bottom: 10px;
      border: 1px solid #bbb;
      border-radius: 6px;
      overflow: hidden;
      width: 80px;
      height: 120px;
      position: relative;

      .thumb {
        width: 80px;
        height: 80px;
      }

      .status-c {
        position: absolute;
        left: 0px;
        top: 64px;
        width: 100%;
        background: rgba(255, 0, 0, 0.5);
        text-align: center;
        color: white;
        font-size: 8px;
        font-weight: 500;
      }

      .title {
        width: 80px;
        font-size: 12px;
        font-weight: 500;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      &.add-item {
        border: 1px dashed #bbb;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        color: gray;
        .add-icon {
          font-size: 20px;
        }
        cursor: pointer;
        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }


    .delete-icon {
      position: absolute;
      right: 2px;
      top: 2px;

      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5);
      padding: 6px 6px;
      cursor: pointer;
      color: white;
      font-size: 13px;
      font-weight: 500;
      &:hover {
        background: rgba(255, 0, 0, 0.8);
      }
    }

</style>
