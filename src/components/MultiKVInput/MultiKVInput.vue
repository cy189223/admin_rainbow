<template>
  <div class="multi-k-v-input">
    <div class="k-v-item" v-for="(item,index) in listdata" :key="index">
      <a-input class="input" placeholder="属性" v-model="item[options.name ? options.name : 'name']" @change="updateValue"></a-input>
      <a-input class="input" placeholder="值" v-model="item[options.value ? options.value : 'value']" @change="updateValue"></a-input>
      <a-button class="button" size="small" icon="plus" @click="handlePlus(index)"></a-button>
      <a-button class="button" size="small" icon="delete" @click="handleDelete(index)"></a-button>
    </div>
    <a-button icon="plus" @click="handlePlus(listdata.length - 1)">添加一行</a-button>
  </div>
</template>
<script>
export default {
  name: 'MultiKVInput',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {
          name: 'name',
          value: 'value'
        }
      }
    }
  },
  data () {
    return {
      listdata: []
    }
  },
  watch: {
    value: {
      handler (value) {
        if (value) {
          this.listdata = JSON.parse(JSON.stringify(value))
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    updateValue () {
      this.$emit('input', this.listdata)
    },
    handlePlus (index) {
      const item = {}
      item[this.options.name ? this.options.name : 'name'] = ''
      item[this.options.value ? this.options.value : 'name'] = ''
      this.listdata.splice(index + 1, 0, item)
    },
    handleDelete (index) {
      this.listdata.splice(index, 1)
      this.updateValue()
    }
  }
}
</script>
<style lang="less" scoped>
.multi-k-v-input {
  font-size: 20px;
  max-width: 600px;
  .k-v-item {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    .input {
      width: 180px;
      margin-right: 20px;
    }
    .button {
      height: 32px;
      margin-right: 10px;
    }
  }
}
</style>
