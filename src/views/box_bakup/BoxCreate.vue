<template>
  <div class="form-wrap">
    <EditorProps :form.sync="form">
      <a-button type="primary" slot="footer" :loading="loading" @click="onSubmit">提交保存</a-button>
    </EditorProps>
  </div>
</template>
<script>
import EditorProps from './components/EditorProps'
import { createBox } from '@/api/box'
export default {
  name: 'BoxCreate',
  components: {
    EditorProps
  },
  data () {
    return {
      loading: false,
      form: {
        category_ids: [],
        title: '',
        tags: [],
        thumb: '',
        display_mode: 0,
        bg_image: '',
        box_3d_image: '',
        bg_color: '#EDEDED',
        unopen_box_thumb: '',
        tmail_product_id: '',
        price: '',
        box_total: 9,
        is_presell: 0,
        presell_date: undefined,
        total: '',
        detail_images: []
      }
    }
  },
  methods: {
    onSubmit  () {
      this.loading = true
      createBox({
        ...this.form,
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
