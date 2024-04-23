<template>
	<div class="no-data" :style="styleStr">
		<img src="@/assets/empty.png"></img>
		<div class="text">{{title}}</div>
	</div>
</template>

<script>
	export default {
		name: "NoData",
		props: {
			title: {
				type: String,
				default ()  {
					return ''
				}
			},
      styleStr: {
        type: String,
        default () {
          return ''
        }
      }
		}
	}
</script>

<style lang="scss" scoped>
	.no-data {
		overflow: hidden;
    width: 100%;
		img {
			width: 206px;
			height: 116px;
			display: block;
			margin: 100px auto 100px auto;
		}
		.text {
			text-align: center;
			font-size: 26px;
			color: #888;
		}
	}
</style>
