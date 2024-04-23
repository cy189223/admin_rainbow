<template>
  <a-modal title="指编辑商品" style="top: 100px;" :visible="isShow" width="800px" @ok="handleOk" @cancel="handleCancel"
    okText="关闭">
    <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm>
    共查询到 {{itemTotal}} 个商品

    <div style="margin-top: 30px;">
      <a-button style="" type="primary" @click="editSearchKey">
        <span>修改搜索关键词</span>
      </a-button>
    </div>
  </a-modal>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import IForm from "@/components/IForm"

  import {
    createExport
  } from '@/api/orders'

  export default {
    components: {
      IForm
    },
    props: {
      isShow: {
        type: Boolean
      }
    },
    computed: {
      frame() {
        return [
          {
            title: '一级分类',
            key: 'category1_id',
            type: 'select',
            newline: true,
            required: true,
            options: this.category1List
          },
          {
            title: '二级分类',
            key: 'category2_id',
            type: 'select',
            newline: true,
            required: true,
            options: this.category2List
          },
        ]
      },
      category2List () {
        let target = this.category1List.find(item => {
          return item.id = this.form.category1_id
        })

        return target ? target.sub_categories : []
      }
    },
    data() {
      return {
        form: {
          category1_id: undefined,
          category2_id: undefined,
        },
        itemTotal: 0,
        category1List: []
      }
    },
    watch: {
      form: {
        handler(new_value, old_value) {
          this.initList()
        },
        deep: true
      }
    },
    mounted () {
      this.initList()

      this.$http('/normal/categories').then(res => {

        res.data.list.map(item => {
          item.value = item.id
          item.sub_categories.map(i => {
            i.value = i.id
            return i
          })
          return item
        })

        this.category1List = res.data.list
      })
    },
    methods: {
      editSearchKey () {
         this.$iForm.show({
           frame: [{
             title: '搜索关键词',
             type: 'textarea',
             tips: '80个字以内',
             key: 'search_key',
             span: 24,
             required: true
           }],
           success: (data) => {
             this.$http.post('/product/batch-edit', {
               options: this.form,
               type: 'update_search_key',
               ...data
             }).then(res => {
               this.$message.success('更新成功')
               this.$iForm.hide()
             })
           }
         })
      },
      initList() {
        this.$http.post('/product/batch-edit/total', this.form).then(res => {
          this.itemTotal = res.data.total
        })
      },
      handleChange({
        file,
        fileList
      }) {},
      handleOk() {
        this.$emit('hide')
      },
      handleCancel() {
        this.$emit('hide')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tips {
    color: gray;
    font-size: 80%;
  }
</style>
