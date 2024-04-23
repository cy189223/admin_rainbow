<template>
  <div class="form-wrap">
    <EditorProps :form.sync="form">
      <a-button type="primary" slot="footer" :loading="loading" @click="onSubmit">提交保存</a-button>
    </EditorProps>
  </div>
</template>
<script>
import EditorProps from './components/EditorProps'
import { createCoupon } from '@/api/coupons'
export default {
  name: 'CouponCreate',
  components: {
    EditorProps
  },
  data () {
    return {
      loading: false,
      form: {
        title: '',
        total: '',
        usable_range_type: 2,
        usable_ids: undefined,
        discount_money: '',
        time_limit_type: 0,
        usable_start_at: '2020-01-01 00:00:00',
        usable_end_at: '2020-01-10 00:00:00',
        code: ''
      }
    }
  },
  methods: {
    onSubmit  () {
      this.loading = true
      createCoupon({
        ...this.form,
        discount_money: this.form.discount_money * 100,
        minimum_money: this.form.minimum_money && (this.form.minimum_money * 100)
      }).then(res => {
        this.$message.success('已提交保存')
        this.$router.push({
          name: 'Coupons'
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
