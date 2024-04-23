<template>
  <div>
    <div class="list">
      <div class="item" v-if="info.id">
        <a-icon class="action-item delete-icon" type="delete" @click.stop="deleteItem(item)"></a-icon>
        <img :src="info.thumb" class="thumb" />
        <div class="type-c">{{info.type_text}}</div>
        <div class="status-c" v-if="info.status == 0">已下架</div>
        <div class="title" :title="info.title">{{info.title}}</div>
      </div>
      <div class="item add-item" v-if="!info.id" @click="isShowSelect = true">
        <a-icon class="add-icon" type="plus"></a-icon>
        <div class="title">添加</div>
      </div>
    </div>
    <!-- <a-select class="select" mode="multiple" v-model="ids">
      <a-select-option :value="option.id" v-for="option in list">
        {{option.title}}
       </a-select-option>
    </a-select> -->
    <ActivityListPopup :url="url" v-if="isShowSelect && url" mode="radio" :initIds="initIds" @change="id = $event[0]" @close="isShowSelect = false"></ActivityListPopup>
  </div>
</template>
<script>
  import ActivityListPopup from "@/components/SelectListPopup/Activity.vue"
  export default {
    components: {
      ActivityListPopup
    },
    data() {
      return {
        isShowSelect: false,
        info: {},
        id: ''
      };
    },
    props: {
      activityType: {
        type: String
      },
      value: {
        type: Number,
        default () {
          return null
        }
      }
    },
    watch: {
      value(val) {
        this.id = val
      },
      id () {
        this.$emit('input', this.id)

        this.getListInfo()
      },
      activityType () {
        this.id = null
      }
    },
    mounted() {
      this.id = this.value

      this.getListInfo()
    },
    computed: {
      url () {
        let map  = {
          yifanshang: '/yi-fan-shangs',
          lottery: '/lotteries',
          egg_lottery: '/egg-lotteries',
          seckill: '/seckills',
          box: '/boxes'
        }
        return map[this.activityType]
      },
      initIds () {
        if (this.id) {
          return [this.id]
        }
        else {
          return []
        }
      }
    },
    methods: {
      getListInfo() {
        if (this.id) {
          this.$http.get(this.url, {
            params: {
              ids: [this.id]
            }
          }).then(res => {
            this.info = res.data.list[0]
          })
        } else {
          this.info = {}
        }
      },
       deleteItem(item) {
         this.info = {}
         this.id = ''
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

      .type-c {
        position: absolute;
        left: -2px;
        top: 2px;
        // width: 100%;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        color: white;
        font-size: 6px !important;
        // scale: 0.8;
        transform: scale(0.8);
        border-radius: 100px;
        padding: 2px 10px;
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
