<template>
  <div class="form-wrap">
    <EditorProps :form.sync="form">
      <a-button type="primary" slot="footer" :loading="loading" @click="onSubmit">提交保存</a-button>
    </EditorProps>
  </div>
</template>
<script>
import EditorProps from './components/EditorProps'
import { updateCoupon, getCouponInfo } from '@/api/coupons'
export default {
  name: 'CouponEdit',
  components: {
    EditorProps
  },
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      form: {
        title: '',
        total: '',
        usable_range_type: 0,
        usable_ids: undefined,
        discount_money: '',
        code: '',
        minimum_money: '',
        usable_start_at: '2020-01-01 00:00:00',
        usable_end_at: '2020-01-10 00:00:00',
      }
    }
  },
  created () {
    getCouponInfo(this.uuid).then(res => {
      const info = res.data.info
      this.form = {
        title: info.title,
        total: info.total,
        usable_range_type: info.usable_range_type,
        usable_ids: info.usable_ids || undefined,
        discount_money: info.discount_money / 100,
        code: info.code,
        minimum_money: info.minimum_money / 100,
        time_limit_type: info.time_limit_type,
        usable_start_at: info.usable_start_at,
        usable_end_at: info.usable_end_at,
      }
    })
  },
  methods: {
    onSubmit  () {
      this.loading = true
      updateCoupon(
        this.uuid,
        {
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
