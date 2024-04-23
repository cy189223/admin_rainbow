<template>
  <div class="result">
	  <div v-if="reward.score">
      <span class="small-key-text">积分:</span>
      {{reward.score.total}}
    </div>
    <div v-if="reward.redpack">
      <span class="small-key-text">红包:</span>
      {{reward.redpack.total / 100}}元
    </div>
    <div v-if="reward.level_score">
      <span class="small-key-text">成长值:</span>
      {{reward.level_score.total}}
    </div>
    <div v-if="reward.exclude_box_card">
      <span class="small-key-text">排除卡:</span>
      {{reward.exclude_box_card.total}}
    </div>
    <div v-if="reward.show_box_card">
      <span class="small-key-text">显示卡:</span>
      {{reward.show_box_card.total}}
    </div>
  </div>
</template>

<script>
const resultEnum = ['success', 'error']

export default {
  name: 'Result',
  props: {
    reward: {
		type: Object,
		default () {
			return {}
		}
	}
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
.small-key-text {
  font-size: 90%;
  color: gray;
  margin-right: 4px;
}
</style>
