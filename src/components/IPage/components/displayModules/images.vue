<template>
	<div class="list" :class="module.grid">
		<div class="image-c" :class="'per-row-' + perRow" v-for="(item, index) in list" :style="'width: ' + imageWidth + 'px; margin-left:' + (module.spacing / 2.5) + 'px;'">
			<img mode="widthFix" :src="item.image" hover-class="hover"  @tap="$tool.toLink(item.link)"></img>
			<div class="text" v-if="item.text">{{item.text}}</div>
		</div>
    <slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			module: {
				type: Object,
				default () {
					return {

					}
				}
			}
		},
		data() {
			return {}
		},
		computed: {
			list() {
				return this.module.list || []
			},
			style() {
				return this.module.style || {}
			},
      perRow() {
        return {
					'grid1': 1,
					'grid2': 2,
					'grid3': 3,
					'grid4': 4,
					'grid5': 5,
					'scroll': 1
				}[this.module.grid]
      },
			imageWidth() {
				return (276 - (this.style.margin || 0) / 2.5  * 2 - (this.module.spacing || 0) / 2.5 * (this.perRow - 1)) / this.perRow
			}
		},
		mounted() {
		},
		watch: {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.hover {
		opacity: 0.1;
	}
	.list {
		display: flex;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		flex-wrap: wrap;
		box-sizing: border-box;
		// border: 1px solid red;

		.image-c {
			// margin-bottom: 8px;

			&:first-child {
				margin-left: 0px !important;
			}

      &.per-row-2:nth-child(2n + 1)  {
        margin-left: 0px !important;
      }

      &.per-row-3:nth-child(3n + 1)  {
        margin-left: 0px !important;
      }
      
      &.per-row-4:nth-child(4n + 1)  {
        margin-left: 0px !important;
      }
      
      &.per-row-5:nth-child(5n + 1)  {
        margin-left: 0px !important;
      }

			text-align: center;

			img {
				width: 100%;
				display: block;
			}

			.text {
				font-size: 80%;
				font-weight: bold;
				color: #333333;

				margin-top: 1px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}
	}
</style>
