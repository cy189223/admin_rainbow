<template>
  <div class="container">

    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="基础设置">
        <IForm :formFrame="frameBase" class="form-container" :formData.sync="form"></IForm>
      </a-tab-pane>
      <a-tab-pane key="2" tab="页面装修" force-render>
        <IForm :formFrame="frameUI" class="form-container" :formData.sync="form"></IForm>
      </a-tab-pane>
    </a-tabs>

    <!-- <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm> -->
    <div slot="action" style="display: flex; justify-content: flex-end;">
      <a-button class="btn" @click="cancel">取消</a-button>
      <a-button class="btn" type="primary" @click="submit">提交</a-button>
    </div>
    <!-- <AttrEditor :form.sync="form">
			<div slot="action">
				<a-button class="btn" @click="cancel">取消</a-button>
				<a-button class="btn" type="primary" @click="submit">提交</a-button>
			</div>
		</AttrEditor> -->

  </div>
</template>

<script>
  // import AttrEditor from "./components/AttrEditor"
  import IForm from "@/components/IForm"

  const resourceType = 'boxes'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        form: {
          sku_ratio_type: 1
        },
        categoryList: [],
        imageTagList: []
      }
    },
    props: {
      uuid: {
        type: String
      }
    },
    computed: {
      categoryOptions() {
        return this.categoryList.map(item => {
          return {
            title: item.title,
            value: item.id
          }
        })
      },
      imageTagOptions() {
        return this.imageTagList.map(item => {
          return {
            title: item.title,
            value: item.id
          }
        })
      },
      frameBase() {
        return [{
            title: '标题',
            key: 'title',
            newline: true,
            required: true,
          },
          {
            title: '角标',
            key: 'image_tag_id',
            type: 'select',
            span: 12,
            options: this.imageTagOptions
          },
          {
            title: '标签',
            key: 'tags',
            type: 'tags',
            tips:  '会显示在盲盒列表封面图下方，建议填写。如“热卖新品”等短语',
            newline: true,
            required: true,
          },
          {
            title: '所属IP',
            key: 'category_ids',
            newline: true,
            required: true,
            type: 'multi_select',
            options: this.categoryOptions
          },
          {
            title: '列表封面',
            key: 'thumb',
            type: 'image',
            sizeLimit: 250,
            tips:  '600*600',
            required: true,
            newline: true,
          },
          {
            type: 'blank'
          },
          // {
          //   title: '赠送抽奖码',
          //   key: 'lottery_id',
          //   type: 'activity_id',
          //   activity_type: 'lottery',
          //   // sizeLimit: 250,
          //   tips: '绑定抽奖活动后，用户每抽1个小盒都会<span style="color:red">免费获得</span>一个此抽奖活动的抽奖码',
          //   // required: true,
          //   newline: true,
          // },
          // {
          //   type: 'blank'
          // },
          // {
          //   title: '绑定天猫商品',
          //   key: 'tmail_product_id',
          //   placeholder: '商品ID， 如: 647668379446',
          //   tips: '绑定淘宝/天猫上创建的开盒次数商品。 无天猫/淘宝小程序不需要填此处',
          //   newline: true,
          //   span: 16,
          //   // required: true,
          // },
          // {
          //   title: '大盒顶部图(扁平风)',
          //   key: 'box_top_image',
          //   type: 'image',
          //   newline: true,
          //   tips: '800*450 png （用于扁平风格时9宫格顶部的图片）'
          // },
          // {
          //   title: '小盒未售出时图片（扁平风）',
          //   key: 'sku_thumb',
          //   type: 'image',
          //   newline: true,
          //   tips: '200*200'
          // },
          // {
          //   title: '小盒3D图片',
          //   key: 'sku_3d_image',
          //   required: true,
          //   type: 'image',
          //   newline: true,
          //   tips: '600*900 png'
          // },
          {
            type: 'blank',
            newline: true
          },
          {
            title: '售价',
            key_prefix: '',
            type: 'mix_price',
            newline: true
          },
          // {
          //   title: '售价(积分)',
          //   key: 'score_price',
          //   type: 'number',
          //   placeholder: '可选',
          //   tips: '积分和人民币同时填写代表需同时支付两者才可下单',
          //   newline: true
          // },
          {
            title: '每个房间小盒数',
            key: 'sku_total',
            type: 'radio',
            newline: true,
            required: true,
            disabled: this.uuid ? true : false,
            default: 9,
            tips: '创建后不可更改，请谨慎选择',
            options: [
              {
                title: 4,
                value: 4
              },
              {
                title: 5,
                value: 5
              },
              {
                title: 6,
                value: 6
              },
              {
                title: 7,
                value: 7
              },
              {
                title: 8,
                value: 8
              },
              {
                title: 9,
                value: 9
              },
              {
                title: 10,
                value: 10
              },
              {
                title: 11,
                value: 11
              },
              {
                title: 12,
                value: 12
              }
            ]
          },
          {
            title: '单个房间中奖品模式',
            key: 'sku_ratio_type',
            type: 'radio',
            default: 1,
            span: 24,
            tips: '不允许重复时同一房间中奖品位置永久固定，允许重复则同一房间的奖品位置及种类每次不固定 <a target="_blank" href="https://www.yuque.com/u1307645/mwy3k3/mp3y14">详见文档</a>',
            options: [{
                title: '不可出现重复奖品',
                value: 1
              },
              {
                title: '允许出现重复奖品',
                value: 2
              }
            ],
            newline: true
          },
          // {
          //   title: '开小盒算法',
          //   key: 'open_box_strategy',
          //   type: 'radio',
          //   default: 1,
          //   span: 24,
          //   tips: '库存配比非1:1的情况下，开下一个小盒子时的优先算法',
          //   options: [{
          //       title: '按库存比例随机开SKU',
          //       value: 1
          //     },
          //     {
          //       title: '优先开该房间中未开出过的SKU',
          //       value: 2
          //     }
          //   ],
          //   where: {
          //     sku_ratio_type: 2
          //   },
          //   newline: true
          // },
          {
            type: 'blank',
            newline: true
          },
          // {
          // 	title: '前端展示模式',
          // 	key: 'display_type',
          // 	type: 'radio',
          //   default: 1,
          //   span: 24,
          //   options: [
          //     {
          //       title: '抽盒机',
          //       value: 1
          //     },
          //     {
          //       title: '扭蛋机',
          //       value: 2
          //     }
          //   ],
          // 	newline: true
          // },
          {
            title: '可切换房间数',
            key: 'room_total',
            type: 'number',
            tips: '最大30。 假如奖品库存允许创建1000个房间，一开始时并不会直接创建1000个房间。而是先创建此数量的房间，当其中一个房间抽完下架后自动创建一个新房间来保持这个可切换房间数。',
            default: 10,
            // disabled: this.uuid ? true : false,
            required: true,
            newline: true
          },
          {
            title: '是否预售',
            key: 'is_presell',
            type: 'boolean',
            // span: 12,
            // tips: '预售模式分为',
            newline: true
          },
          {
            title: '开售时间',
            key: 'presell_date',
            type: 'date',
            span: 24,
            newline: true,
            where: {
              is_presell: 1
            }
          },
          {
            title: '预售期间允许购买',
            key: 'presell_mode',
            type: 'boolean',
            span: 24,
            tips: '默认为关闭，即倒计时结束前仅可浏览信息，不可购买。',
            newline: true,
            where: {
              is_presell: 1
            }
          },
          {
            title: '是否包邮',
            key: 'is_free_carriage',
            type: 'boolean',
            tips: '不包邮将使用统一运费设置, 见“系统设置 -> 订单设置”',
            newline: true
          },
          // {
          //   title: '开盒方式',
          //   key: 'open_mode',
          //   type: 'radio',
          //   newline: true,
          //   span: 24,
          //   default: 1,
          //   tips: '”线下开盒“模式将隐藏透视卡、排除卡，订单中不显示开出的具体款式',
          //   options: [{
          //       title: '在线开盒',
          //       value: 1
          //     },
          //     {
          //       title: '线下开盒',
          //       value: 2
          //     }
          //   ]
          // },
          {
            title: '开盒提示',
            key: 'tips',
            type: 'input',
            newline: true,
            span: 18,
            placeholder: '不填则默认显示 "官方正品，非质量问题不支持退换"',
            tips: '显示在九宫格房间页 及 开盒页中'
          },
          {
            type: 'blank',
            newline: true,
          },
          {
            title: '每人每日限制使用排除卡次数',
            key: 'exclude_card_per_day',
            type: 'number',
            newline: true,
            span: 12,
            tips: '不限制请填0'
          },
          {
            title: '每人每日限制使用透视卡次数',
            key: 'show_card_per_day',
            type: 'number',
            newline: true,
            span: 12,
            tips: '不限制请填0'
          },
          // {
          //   title: '摇一摇次数',
          //   key: 'free_tips_limit',
          //   type: 'number',
          //   newline: true,
          //   span: 12,
          //   // default: 1,
          //   tips: '默认为2次，填0则隐藏摇一摇提示',
          // },
          // {
          //   title: '透视卡',
          //   key: 'is_show_box',
          //   type: 'boolean',
          //   newline: true,
          //   span: 6,
          //   default: 1,
          //   tips: '是否显示',
          // },
          // {
          //   title: '排除卡',
          //   key: 'is_exclude_box',
          //   type: 'boolean',
          //   // newline: true,
          //   span: 6,
          //   default: 1,
          //   tips: '是否显示',
          // },
          // {
          //   title: '隐藏款榜单',
          //   key: 'is_hidden_sku_rank',
          //   type: 'boolean',
          //   // newline: true,
          //   span: 6,
          //   default: 0,
          //   tips: '是否显示',
          // },
          // {
          //   type: 'blank',
          //   newline: true,
          // },
          {
            title: '商品预览图',
            key: 'detail_images',
            span: 20,
            sizeLimit: 400,
            type: 'images',
            tips: '宽度1024以下，长图建议切成多张小图上传',
            required: true,
            newline: true
          },
          {
            type: 'blank',
            newline: true,
          },
          {
            title: '开启邀请送次数',
            key: 'is_invite_enabled',
            type: 'boolean',
            newline: true,
            tips: '开启后下方邀请规则才会生效'
          },
          {
            title: '邀请规则',
            key: 'invite_rule',
            type: 'invite_rule_input',
            newline: true,
            tips: '邀请新用户注册为一次有效邀请，一次奖励为赠送一次抽奖机会',
            where: {
              // is_invite_enable: 1
            }
          },
        ]
      },
      frameUI() {
        return [
          {
            title: '房间背景图',
            key: 'room_bg_image',
            type: 'image',
            sizeLimit: 200,
            isShowImageTips: false,
            newline: true,
            tips: '参考图片规格包中尺寸规范，不设置则使用装修模块的设置'
          },
          {
            title: '背景图色调',
            key: 'bg_color_mode',
            type: 'radio',
            newline: true,
            default: 1,
            options: [
              {
                title: '亮色调',
                value: 1
              },
              {
                title: '暗色调',
                value: 2
              }
            ],
            span: 12,
            // default: 1,
            tips: '默认为亮色调。选择暗色调后部分按钮字体会切换成白色',
          },
          {
            title: '大盒顶部图(扁平风)',
            key: 'box_top_image',
            type: 'image',
            required: true,
            sizeLimit: 300,
            isShowImageTips: false,
            newline: true,
            tips: '800*450 png （用于扁平风格时9宫格顶部的图片）'
          },
          {
            title: '小盒未售出时图片（扁平风）',
            key: 'sku_thumb',
            type: 'image',
            required: true,
            sizeLimit: 150,
            isShowImageTips: false,
            newline: true,
            tips: '200*200'
          },
          {
            title: '大箱子后挡板(3D版)',
            key: 'big_box_bottom',
            type: 'image',
            sizeLimit: 300,
            isShowImageTips: false,
            newline: true,
            tips: '参考图片规格包中尺寸规范，不设置则使用装修模块的设置'
          },
          {
            title: '大箱子前挡板(3D版)',
            key: 'big_box_top',
            type: 'image',
            sizeLimit: 300,
            isShowImageTips: false,
            newline: true,
            tips: '参考图片规格包中尺寸规范，不设置则使用装修模块的设置'
          },
          {
            title: '小盒子立体图(3D版)',
            key: 'small_box_image',
            type: 'image',
            sizeLimit: 200,
            isShowImageTips: false,
            newline: true,
            tips: '参考图片规格包中尺寸规范，不设置则使用装修模块的设置'
          },
          {
            title: '开盒页3D立体盒子',
            key: 'sku_3d_image',
            isShowImageTips: false,
            // required: true,
            sizeLimit: 300,
            type: 'image',
            span: 24,
            newline: true,
            tips: '600*900 png, 不传则使用默认',
          },
          {
            type: 'blank',
            newline: true
          },
          {
            title: '盒子展示风格',
            key: 'theme_mode',
            type: 'radio',
            newline: true,
            default: 1,
            options: [
              {
                title: '可切换 (3D优先)',
                value: 1
              },
              {
                title: '可切换 (扁平风优先)',
                value: 2
              },
              {
                title: '仅3D',
                value: 3
              },
              {
                title: '仅扁平风',
                value: 4
              }
            ],
            span: 24,
            // default: 1,
            tips: '默认展示3D版',
          },
          {
            title: '摇一摇次数',
            key: 'free_tips_limit',
            type: 'number',
            newline: true,
            span: 12,
            // default: 1,
            tips: '默认为2次，填0则隐藏摇一摇提示',
          },
          {
            title: '透视卡',
            key: 'is_show_box',
            type: 'boolean',
            newline: true,
            span: 6,
            default: 1,
            tips: '是否显示',
          },
          {
            title: '排除卡',
            key: 'is_exclude_box',
            type: 'boolean',
            // newline: true,
            span: 6,
            default: 1,
            tips: '是否显示',
          },
          {
            title: '隐藏款榜单',
            key: 'is_hidden_sku_rank',
            type: 'boolean',
            // newline: true,
            span: 6,
            default: 0,
            tips: '是否显示',
          },
          // {
          //   type: 'blank',
          //   newline: true,
          // },
          // {
          //   title: '商品预览图',
          //   key: 'detail_images',
          //   span: 20,
          //   type: 'images',
          //   tips: '宽度1024以下，长图建议切成多张小图上传',
          //   required: true,
          //   newline: true
          // },
        ]
      }
    },
    created() {},
    mounted() {
      this.uuid = this.uuid || this.$route.params.uuid

      this.$http.get('/ip/categories').then(res => {
        this.categoryList = res.data.list
      })

      this.$http.get('/image-tags').then(res => {
        this.imageTagList = res.data.list
      })

      this.initForm()
    },
    watch: {
      uuid() {
        this.initForm()
      }
    },
    methods: {
      initForm() {
        if (this.uuid) {
          this.$http(`/${resourceType}/${this.uuid}`).then(res => {
            this.form = res.data.info
          })
        } else {
          this.form = {
            ...this.$initForm(this.frameBase),
            ...this.$initForm(this.frameUI)
          }
        }
      },
      cancel() {
        this.$emit('cancel')
        // this.$router.back(-1)
      },
      create() {
        this.$http.post(`/${resourceType}`, {
          ...this.form
        }).then(res => {
          this.$message.success('创建成功')
          this.$emit('success')
          this.uuid = ''
          this.form = {}
          // this.$router.push({
          // 	path: './list'
          // })
        })
      },
      update() {
        this.$http.patch(`/${resourceType}/${this.uuid}`, {
          type: 'update',
          attributes: {
            ...this.form,
            image_tag_id: this.form.image_tag_id || ''
          }
        }).then(res => {
          this.$message.success('更新成功')
          this.$emit('success')
          this.uuid = ''
          this.form = {}

          // this.$router.push({
          // 	path: '../list'
          // })
        })
      },
      submit() {
        if (this.uuid)
          this.update()
        else
          this.create()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-container {
    padding-bottom: 120px;
  }

  .container {
    .btn {
      margin-right: 30px;
    }
  }
</style>
