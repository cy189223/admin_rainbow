<template>
  <a-row>

    <a-select class="select" v-model="id">
      <!-- <a-select-option value="">请选择</a-select-option> -->
      <a-select-option :value="option.id" v-for="option in list">
        {{option.title}}
      </a-select-option>
    </a-select>
    <a href="javascript:;" @click="handleRefresh()">刷新</a>
    <a-divider type="vertical" />
    <a href="javascript:;" @click="handleCreate()">创建</a>
  </a-row>
</template>
<script>
  export default {
    data() {
      return {
        list: [],
        id: ''
      };
    },
    props: {
      value: {
        type: Array,
        default () {
          return ''
        }
      }
    },
    watch: {
      value(val) {
        this.id = val || ''
      },
      id() {
        this.$emit('input', this.id)
      }
    },
    mounted() {
      this.id = this.value || ''
      this.$http.get('/user-groups').then(res => {
        this.list = res.data.list
      })
    },
    methods: {
      handleRefresh() {
        this.$http.get('/user-groups').then(res => {
          this.list = res.data.list
        })
      },
      handleCreate() {
        let routeUrl = this.$router.resolve({
          path: "/user/groups",
        });
        window.open(routeUrl.href, '_blank');
      }
    }
  };
</script>
<style lang="scss" scoped>
  .list {}

  .select {
    margin-right: 10px;
    width: 60%;
  }
</style>
