<template>
  <div class="form-wrap">
    <EditorProps :form.sync="form" :disabled="true">
      <a-button type="primary" slot="footer" :loading="loading" @click="onSubmit">提交保存</a-button>
    </EditorProps>
  </div>
</template>
<script>
  import EditorProps from './components/EditorProps'
  import {
    updateBox,
    getBoxInfo
  } from '@/api/box'
  import moment from 'moment'
  export default {
    name: 'BoxEdit',
    components: {
      EditorProps
    },
    props: {
      uuid: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        loading: false,
        form: {
          category_ids: [],
          display_mode: 0,
          title: '',
          tags: [],
          thumb: '',
          bg_image: '',
          box_3d_image: '',
          bg_color: '#EDEDED',
          unopen_box_thumb: '',
          price: '',
          box_total: 9,
          is_presell: 0,
          presell_date: undefined,
          tmail_product_id: '',
          total: '',
          detail_images: []
        }
      }
    },
    created() {
      getBoxInfo(this.uuid).then(res => {
        const info = res.data.info
        this.form = {
          category_ids: info.category_ids,
          title: info.title,
          tags: info.tags,
          display_mode: info.display_mode,
          thumb: info.thumb,
          bg_image: info.bg_image,
          box_3d_image: info.box_3d_image,
          bg_color: info.bg_color,
          unopen_box_thumb: info.unopen_box_thumb,
          tmail_product_id: info.tmail_product_id,
          price: info.price,
          box_total: info.box_total,
          is_presell: info.is_presell,
          presell_date: info.presell_date ? moment(info.presell_date) : '',
          total: info.total,
          detail_images: info.detail_images || []
        }
      })
    },
    methods: {
      onSubmit() {
        this.loading = true
        updateBox(
          this.uuid, {
            ...this.form,
            price: this.form.price * 100,
            presell_date: this.form.presell_date ? this.form.presell_date.format('YYYY-MM-DD HH:mm:ss') : ''
          }).then(res => {
          this.$message.success('已提交保存')
          this.$router.push({
            name: 'Box'
          })
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 20px;
    background-color: #fff;
  }
</style>
