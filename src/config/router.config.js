// eslint-disable-next-line
import {
	UserLayout,
	BasicLayout,
	RouteView,
	BlankLayout,
	PageView
} from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [{
		path: '/',
		name: 'index',
		component: BasicLayout,
		meta: {
			title: '首页'
		},
		redirect: '/box',
		children: [
			// home
			// {
			//   path: '/',
			//   name: 'home',
			//   component: RouteView,
			//   meta: { title: '首页', keepAlive: true, icon: 'home' },
			//   hideChildrenInMenu: true,
			//   redirect: '/',
			//   children: [
			//     {
			//       path: '/',
			//       name: 'Home',
			//       component: () => import('@/views/home/Index'),
			//       meta: { title: '首页', keepAlive: true }
			//     }
			//   ]
			// },
			// 抽奖盒子
			{
				path: '/ip',
				name: 'IP',
				component: PageView,
				hideChildrenInMenu: false,
				meta: {
					title: 'IP/分类、版块、角标',
					keepAlive: true,
					icon: 'robot'
				},
				redirect: '/ip',
				children: [{
						path: '/ip',
						name: 'IPList',
						component: () => import('@/views/category/List'),
						props: {
							isShowThumb: true,
							type: 'ip',
							title: 'IP'
						},
						meta: {
							title: 'IP管理',
							keepAlive: true
						}
					},
					{
						path: '/category',
						name: 'CategoryList',
						component: () => import('@/views/category/List'),
						props: {
							isShowThumb: true,
							type: 'normal',
							subCategory: true
						},
						meta: {
							title: '分类管理',
							keepAlive: true
						}
					},
					{
						path: '/block',
						name: 'BlockCategoryList',
						component: () => import('@/views/category/List'),
						props: {
							isShowThumb: false,
							type: 'block',
							subCategory: false,
							title: '版块',
							tips: '可创建不同的版块（例如：首页商品列表、 商城页推荐列表）并将商品或活动绑定到该版块中'
						},
						meta: {
							title: '版块管理',
							keepAlive: true
						}
					},
					{
						path: '/image-tag',
						name: 'ImageTagList',
						component: () => import('@/views/category/ImageTagList'),
						props: {
							isShowThumb: true,
							type: 'normal',
							subCategory: true
						},
						meta: {
							title: '角标管理',
							keepAlive: true
						}
					},
					{
						path: '/image/history/tag',
						name: 'CategoryList',
						component: () => import('@/views/category/List'),
						hidden: true,
						props: {
							isShowThumb: false,
							type: 'image',
							subCategory: false
						},
						meta: {
							title: '图片分类列表',
							keepAlive: true
						}
					},
				]
			},
			// {
			//   path: '/box',
			//   name: 'Box',
			//   redirect: '/box',
			//   component: PageView,
			//   meta: {
			//     title: '盲盒管理',
			//     keepAlive: true,
			//     icon: 'gift'
			//   },
			//   hideChildrenInMenu: true,
			//   children: [
			//     {
			//       path: '/box',
			//       name: 'Box',
			//       component: () => import('@/views/box/BoxList'),
			//       meta: {
			//         title: '盲盒列表',
			//         keepAlive: true
			//       }
			//     },
			//     {
			//       path: '/box/setting',
			//       name: 'BoxSetting',
			//       component: () => import('@/views/box/Setting'),
			//       hidden: true,
			//       meta: {
			//         title: '盲盒全局设置',
			//         keepAlive: false
			//       }
			//     },
			//     {
			//       path: '/rank/list',
			//       name: 'Box',
			//       component: () => import('@/views/rank/RankList'),
			//       meta: {
			//         title: '隐藏款排行榜模拟数据列表',
			//         keepAlive: true
			//       }
			//     },
			//     {
			//       path: '/rank/edit',
			//       name: 'Box',
			//       component: () => import('@/views/rank/EditRank'),
			//       meta: {
			//         title: '隐藏款排行榜模拟数据更新',
			//         keepAlive: true
			//       }
			//     }
			//   ]
			// },
			// 商城
			// {
			//   path: '/topic-tag/list',
			//   name: 'TopicTag',
			//   component: () => import('@/views/topic/TagList'),
			//   meta: {
			//     title: '话题管理',
			//     keepAlive: false
			//   }
			// }
			// {
			// 	path: '/notice',
			// 	name: 'visitors',
			// 	component: PageView,
			// 	meta: {
			// 		title: '公告',
			// 		keepAlive: true,
			// 		icon: 'solution'
			// 	},
			// 	hideChildrenInMenu: true,
			// 	redirect: '/notice',
			// 	children: [{
			// 		path: '/notice',
			// 		name: 'notice',
			// 		component: () => import('@/views/notice/NoticeList'),
			// 		hidden: false,
			// 		meta: {
			// 			title: '公告',
			// 			keepAlive: false
			// 		}
			// 	}, ]
			// },
			{
				path: '/shop',
				name: 'shop',
				redirect: '/shop/productList',
				component: PageView,
				meta: {
					title: '商城管理',
					keepAlive: true,
					icon: 'shopping'
				},
				hideChildrenInMenu: true,
				children: [{
						path: '/shop/productList',
						name: 'productList',
						component: () => import('@/views/shop/ProductList'),
						meta: {
							title: '商品列表',
							keepAlive: false
						}
					},
					{
						path: '/product/release',
						name: 'releaseProduct',
						// hidden: true,
						component: () => import('@/views/shop/ReleaseProduct'),
						meta: {
							title: '发布商品',
							keepAlive: true
						}
					},
					{
						path: '/products/edit/:uuid',
						name: 'EditProduct',
						hidden: true,
						component: () => import('@/views/shop/EditProduct'),
						meta: {
							title: '编辑商品',
							// keepAlive: true
						}
					},
					{
						path: '/products/category',
						name: 'Category',
						component: () => import('@/views/shop/Category'),
						meta: {
							title: '分类管理',
							keepAlive: true
						}
					}
				]
			},
			// orders
			{
				path: '/orders',
				name: 'orders',
				component: PageView,
				meta: {
					title: '订单管理',
					keepAlive: true,
					icon: 'profile'
				},
				hideChildrenInMenu: true,
				redirect: '/orders',
				children: [{
					path: '/orders',
					name: 'OrderList',
					component: () => import('@/views/orders/List'),
					props: {
						type: 'box'
					},
					meta: {
						title: '订单管理',
						keepAlive: true
					}
				}]
			},
			// 盒柜仓库
			{
				path: '/package-sku',
				name: 'PackageSku',
				component: PageView,
				meta: {
					title: '盒柜仓库',
					keepAlive: true,
					icon: 'container'
				},
				hideChildrenInMenu: true,
				redirect: '/package-sku/list',
				children: [{
					path: '/package-sku/list',
					name: 'PackageSkuList',
					component: () => import('@/views/packageSku/list'),
					meta: {
						title: '盒柜仓库',
						keepAlive: true
					}
				}]
			},
			// 交易市场
			{
				path: '/market',
				name: 'Market',
				component: PageView,
				meta: {
					title: '挂售管理',
					keepAlive: true,
					icon: 'container'
				},
				// hideChildrenInMenu: true,
				redirect: '/market/resale/list',
				children: [{
						path: '/market/setting',
						name: 'MarketSetting',
						component: () => import('@/views/market/Setting'),
						hidden: false,
						meta: {
							title: '基础设置',
							keepAlive: false
						}
					},
					{
						path: '/market/tenant/list',
						name: 'TenantList',
						component: () => import('@/views/market/tenantList'),
						meta: {
							title: '商户列表',
							keepAlive: true
						}
					},
					{
						path: '/market/resale/list',
						name: 'MarketList',
						component: () => import('@/views/market/resaleList'),
						meta: {
							title: '挂售商品(自定价)',
							keepAlive: true
						},
						props: {
							isAutoMatch: false
						},
					},
					{
						path: '/market/resale/list/2',
						name: 'MarketList2',
						component: () => import('@/views/market/resaleList'),
						meta: {
							title: '挂售商品(建议价)',
							keepAlive: true
						},
						props: {
							isAutoMatch: true
						},
					},
				]
			},
			// 置换管理
			{
				path: '/exchange',
				name: 'Exchange',
				component: PageView,
				meta: {
					title: '置换管理',
					keepAlive: true,
					icon: 'container'
				},
				// hideChildrenInMenu: true,
				redirect: '/exchange/setting',
				children: [{
						path: '/exchange/setting',
						name: 'ExchangeSetting',
						component: () => import('@/views/exchange/Setting'),
						hidden: false,
						meta: {
							title: '基础设置',
							keepAlive: false
						}
					},
					{
						path: '/exchange/list',
						name: 'ExchangeList',
						component: () => import('@/views/exchange/List'),
						meta: {
							title: '置换记录',
							keepAlive: true
						},
						props: {
							isAutoMatch: true
						},
					},
				]
			},
			{
				path: '/activity',
				name: 'activity',
				redirect: '/activity/list',
				component: PageView,
				meta: {
					title: '活动管理',
					keepAlive: true,
					icon: 'link'
				},
				hideChildrenInMenu: false,
				children: [{
						path: '/box',
						name: 'Box',
						component: () => import('@/views/box/BoxList'),
						meta: {
							title: '盲盒活动',
							keepAlive: true
						}
					},
					{
						path: '/box/setting',
						name: 'BoxSetting',
						component: () => import('@/views/box/Setting'),
						hidden: true,
						meta: {
							title: '盲盒全局设置',
							keepAlive: false
						}
					},

					
					{
						path: '/scratchCard',
						name: 'ScratchCard',
						component: () => import('@/views/scratchCard/BoxList'),
						meta: {
							title: '刮刮卡',
							keepAlive: true
						}
					},
					
					{
						path: '/scratchCard/setting',
						name: 'ScratchCardSetting',
						component: () => import('@/views/scratchCard/Setting'),
						hidden: true,
						meta: {
							title: '刮刮卡全局设置',
							keepAlive: false
						}
					},
					// {
					//   path: '/rank/list',
					//   name: 'Box',
					//   component: () => import('@/views/rank/RankList'),
					//   meta: {
					//     title: '隐藏款排行榜模拟数据列表',
					//     keepAlive: true
					//   }
					// },
					// {
					//   path: '/rank/edit',
					//   name: 'Box',
					//   component: () => import('@/views/rank/EditRank'),
					//   meta: {
					//     title: '隐藏款排行榜模拟数据更新',
					//     keepAlive: true
					//   }
					// }
					{
						path: '/activity/seckill/list',
						name: 'SeckillList',
						component: () => import('@/views/activity/Seckill/List'),
						props: {
							type: 'seckill'
						},
						meta: {
							title: '秒杀活动',
							keepAlive: false
						}
					},
					{
						path: '/activity/lottery/list',
						name: 'LotteryList',
						component: () => import('@/views/activity/Lottery/List'),
						meta: {
							title: '抽奖活动',
							keepAlive: false
						}
					},
					{
						path: '/activity/egg-lottery/list',
						name: 'EggLotteryList',
						component: () => import('@/views/activity/EggLottery/List'),
						meta: {
							title: '扭蛋机活动',
							keepAlive: false
						}
					},
					{
						path: '/activity/yi-fan-shang',
						name: 'YiFanShangList',
						component: () => import('@/views/activity/YiFanShang/List'),
						meta: {
							title: '一番赏',
							keepAlive: false
						}
					},
					{
						path: '/activity/wu-xian-chi',
						name: 'WuxianchiList',
						component: () => import('@/views/activity/Wuxianchi/List'),
						meta: {
							title: '无限池',
							keepAlive: false
						}
					},
					// {
					// 	path: '/activity/fudai/list',
					// 	name: 'FudaiList',
					// 	component: () => import('@/views/activity/Fudai/List'),
					// 	meta: {
					// 		title: '福袋(无限赏)',
					// 		keepAlive: false
					// 	}
					// },
					{
						path: '/activity/pk/list',
						name: 'PK',
						component: () => import('@/views/activity/pk/List'),
						meta: {
							title: '拳击',
							keepAlive: false
						}
					},
					// {
					//   path: '/activity/rotateLottery/list',
					//   name: 'rotateLotteryList',
					//   component: () => import('@/views/activity/RotateLottery/List'),
					//   meta: {
					//     title: '大转盘',
					//     keepAlive: false
					//   }
					// },
					// {
					//   path: '/activity/jika',
					//   name: 'JikaList',
					//   component: () => import('@/views/activity/Jika/List'),
					//   meta: {
					//     title: '集卡活动',
					//     keepAlive: false
					//   }
					// },
					{
						path: '/activity/jika/setting',
						name: 'JikaSetting',
						component: () => import('@/views/activity/Jika/Setting'),
						hidden: true,
						meta: {
							title: '集卡活动设置',
							keepAlive: false
						}
					},
					{
						path: '/activity/fudai/setting',
						name: 'FudaiSetting',
						component: () => import('@/views/activity/Fudai/Setting'),
						hidden: true,
						meta: {
							title: '福袋设置',
							keepAlive: false
						}
					},
					{
						path: '/activity/pk/setting',
						name: 'FudaiSetting',
						component: () => import('@/views/activity/pk/Setting'),
						hidden: true,
						meta: {
							title: '规则设置',
							keepAlive: false
						}
					},
					{
						path: '/activity/yifanshang/setting',
						name: 'YiFanShangSetting',
						component: () => import('@/views/activity/YiFanShang/Setting'),
						hidden: true,
						meta: {
							title: '规则设置',
							keepAlive: false
						}
					},
					{
						path: '/activity/egg-lottery/setting',
						name: 'EggLotterySetting',
						component: () => import('@/views/activity/EggLottery/Setting'),
						hidden: true,
						meta: {
							title: '扭蛋机设置',
							keepAlive: false
						}
					}
				]
			},
			// 流水奖励
			{
				path: '/reward',
				name: 'visitors',
				component: PageView,
				meta: {
					title: '流水奖励',
					keepAlive: true,
					icon: 'pay-circle'
				},
				// hideChildrenInMenu: true,
				redirect: '/reward',
				children: [{
					path: '/reward',
					name: 'Reward',
					component: () => import('@/views/reward/index'),
					hidden: false,
					meta: {
						title: '流水奖励',
						keepAlive: false
					}
				}, ]
			},
			// {
			//   path: '/visitors',
			//   name: 'visitors',
			//   component: PageView,
			//   meta: {
			//     title: '访客记录',
			//     keepAlive: true,
			//     icon: 'solution'
			//   },
			//   hideChildrenInMenu: true,
			//   redirect: '/visitors',
			//   children: [{
			//     path: '/visitors',
			//     name: 'Visitors',
			//     component: () => import('@/views/visitors/Index'),
			//     meta: {
			//       title: '访客列表',
			//       keepAlive: true
			//     }
			//   }]
			// },
			{
				path: '/pages',
				name: 'pages',
				component: PageView,
				meta: {
					title: '自定义页面',
					keepAlive: true,
					icon: 'block'
				},
				hideChildrenInMenu: true,
				redirect: '/pages',
				children: [{
					path: '/pages',
					name: 'Page',
					component: () => import('@/views/page/PageList'),
					meta: {
						title: '自定义页面列表',
						keepAlive: true
					}
				}]
			},
			{
				path: '/presell',
				name: 'presell',
				component: PageView,
				meta: {
					title: '预售日历',
					keepAlive: true,
					icon: 'number'
				},
				hideChildrenInMenu: true,
				redirect: '/presell/list',
				children: [{
					path: '/presell/list',
					name: 'PresellList',
					component: () => import('@/views/presell/PresellList'),
					meta: {
						title: '预售日历',
						keepAlive: true
					}
				}]
			},
			{
				path: '/code',
				name: 'code',
				component: PageView,
				meta: {
					title: '兑换码',
					keepAlive: true,
					icon: 'solution'
				},
				hideChildrenInMenu: false,
				redirect: '/code',
				children: [{
						path: '/code',
						name: 'Code',
						component: () => import('@/views/code/CodeList'),
						meta: {
							title: '兑换码管理',
							keepAlive: true
						}
					},
					{
						path: '/code/record',
						name: 'CodeRecord',
						component: () => import('@/views/code/CodeRecordList'),
						meta: {
							title: '兑换记录',
							keepAlive: true
						}
					},
				]
			},
			// users
			{
				path: '/users',
				name: 'users',
				component: PageView,
				meta: {
					title: '用户管理',
					keepAlive: true,
					icon: 'team'
				},
				hideChildrenInMenu: false,
				redirect: '/users',
				children: [{
						path: '/users',
						name: 'Users',
						component: () => import('@/views/userList/UserList'),
						meta: {
							title: '用户列表',
							keepAlive: true
						}
					},
					{
						path: '/user/groups',
						name: 'UserGroup',
						component: () => import('@/views/userList/UserGroupList'),
						meta: {
							title: '用户群',
							keepAlive: true
						}
					},
					{
						path: '/vips',
						name: 'VipList',
						component: () => import('@/views/vip/VipList'),
						meta: {
							title: 'VIP列表',
							keepAlive: true
						}
					},
					{
						path: '/vip/sku/list',
						name: 'VipSkuList',
						component: () => import('@/views/vip/VipSkuList'),
						meta: {
							title: 'VIP套餐',
							keepAlive: true
						}
					},
					{
						path: '/users/level',
						name: 'UserLevelList',
						component: () => import('@/views/user/UserLevelList'),
						meta: {
							title: '用户等级',
							keepAlive: true
						}
					},
					{
						path: '/users/levelReward',
						name: 'levelOrderList',
						component: () => import('@/views/user/levelOrderList'),
						meta: {
							title: '等级奖励订单',
							keepAlive: true
						}
					}
				]
			},
			{
				path: '/topic',
				name: 'topic',
				redirect: '/topic/list',
				component: PageView,
				meta: {
					title: '论坛管理',
					keepAlive: true,
					icon: 'deployment-unit'
				},
				hideChildrenInMenu: false,
				children: [{
						path: '/topic/list',
						name: 'Topic',
						component: () => import('@/views/topic/TopicList'),
						meta: {
							title: '帖子管理',
							keepAlive: false
						}
					},
					{
						path: '/topic-group/list',
						name: 'TopicGroup',
						component: () => import('@/views/topic/GroupList'),
						meta: {
							title: '圈子管理',
							keepAlive: false
						}
					},
					{
						path: '/topic-tag/list',
						name: 'TopicTag',
						component: () => import('@/views/topic/TagList'),
						meta: {
							title: '话题管理',
							keepAlive: false
						}
					}
				]
			},
			{
				path: '/redpack',
				name: 'Redpack',
				component: PageView,
				meta: {
					title: '红包模块',
					keepAlive: true,
					icon: 'pay-circle'
				},
				hideChildrenInMenu: false,
				redirect: '/redpack/withdraw',
				children: [{
						path: '/redpack/redpack-sku',
						name: 'RedpackSku',
						component: () => import('@/views/redpack/RedpackSku'),
						meta: {
							title: '余额充值套餐',
							keepAlive: true
						}
					},
					{
						path: '/redpack/setting',
						name: 'RedpackSetting',
						component: () => import('@/views/redpack/Setting'),
						meta: {
							title: '红包设置',
							keepAlive: true
						}
					},
					{
						path: '/redpack/records',
						name: 'RedpackRecords',
						component: () => import('@/views/redpack/RecordList'),
						meta: {
							title: '流水记录',
							keepAlive: true
						}
					},
					{
						path: '/redpack/withdraw',
						name: 'RedpackWithdraw',
						component: () => import('@/views/redpack/withdraw'),
						meta: {
							title: '提现记录',
							keepAlive: true
						}
					},
					{
						path: '/redpack/bank-card/list',
						name: 'BankCardList',
						component: () => import('@/views/redpack/BankCardList'),
						meta: {
							title: '银行卡管理',
							keepAlive: true
						}
					}
				]
			},
			{
				path: '/score',
				name: 'Score',
				component: PageView,
				meta: {
					title: '积分模块',
					keepAlive: true,
					icon: 'block'
				},
				hideChildrenInMenu: false,
				redirect: '/score/score-sku',
				children: [{
						path: '/score/score-sku',
						name: 'ScoreSku',
						component: () => import('@/views/score/ScoreSku'),
						meta: {
							title: '积分充值套餐',
							keepAlive: true
						}
					},
					{
						path: '/score/setting',
						name: 'ScoreSetting',
						component: () => import('@/views/score/GlobalSetting'),
						meta: {
							title: '积分设置',
							keepAlive: true
						}
					}, {
						path: '/score/records',
						name: 'ScoreRecords',
						component: () => import('@/views/score/RecordList'),
						meta: {
							title: '积分流水记录',
							keepAlive: true
						}
					},
					{
						path: '/score-sku/setting',
						name: 'ScoreSkuSetting',
						component: () => import('@/views/score/ScoreSkuSetting'),
						hidden: true,
						meta: {
							title: '积分充值设置',
							keepAlive: false
						}
					},
				]
			},
			// {
			// 	path: '/chip',
			// 	name: 'Chip',
			// 	component: PageView,
			// 	meta: {
			// 		title: '碎片模块',
			// 		keepAlive: true,
			// 		icon: 'build'
			// 	},
			// 	hideChildrenInMenu: false,
			// 	redirect: '/chip/list',
			// 	children: [{
			// 			path: '/chip/list',
			// 			name: 'ChipList',
			// 			component: () => import('@/views/chip/List'),
			// 			meta: {
			// 				title: '碎片列表',
			// 				keepAlive: true
			// 			}
			// 		},
			// 		{
			// 			path: '/chip/setting',
			// 			name: 'ChipSetting',
			// 			component: () => import('@/views/chip/Setting'),
			// 			hidden: true,
			// 			meta: {
			// 				title: '碎片设置',
			// 				keepAlive: false
			// 			}
			// 		},
			// 	]
			// },
			// coupons
			{
				path: '/coupons',
				name: 'coupons',
				component: PageView,
				meta: {
					title: '卡券道具',
					keepAlive: true,
					icon: 'red-envelope'
				},
				hideChildrenInMenu: false,
				redirect: '/coupons',
				children: [{
						path: '/card/list',
						name: 'CardList',
						component: () => import('@/views/card/CardList'),
						meta: {
							title: '道具卡管理',
							keepAlive: true
						}
					},
					{
						path: '/coupons',
						name: 'Coupons',
						component: () => import('@/views/coupons/Index'),
						meta: {
							title: '优惠券管理',
							keepAlive: true
						}
					},
					// {
					//   path: '/coupons/create',
					//   name: 'CouponCreate',
					//   hidden: true,
					//   component: () => import('@/views/coupons/CouponCreate'),
					//   meta: {
					//     title: '创建优惠券',
					//     keepAlive: true
					//   }
					// },
					// {
					//   path: '/coupons/edit/:uuid',
					//   name: 'CouponEdit',
					//   hidden: true,
					//   component: () => import('@/views/coupons/CouponEdit'),
					//   props: route => ({
					//     uuid: route.params.uuid
					//   }),
					//   meta: {
					//     title: '编辑优惠券',
					//     keepAlive: true
					//   }
					// }
				]
			},
			{
				path: '/agent',
				name: 'Agent',
				component: PageView,
				meta: {
					title: '分销裂变',
					keepAlive: true,
					icon: 'apartment'
				},
				hideChildrenInMenu: false,
				redirect: '/agent/setting',
				children: [{
						path: '/agent/share',
						name: 'ShareSetting',
						component: () => import('@/views/agent/setting'),
						meta: {
							title: '邀请注册设置',
							keepAlive: true
						}
					},
					// {
					//   path: '/agent/brokerage',
					//   name: 'AgentBrokerage',
					//   component: () => import('@/views/agent/brokerage'),
					//   meta: {
					//   title: '分销佣金设置',
					//   keepAlive: true
					//   }
					// },
					{
						path: '/agent/level-list',
						name: 'AgentLevelList',
						component: () => import('@/views/agent/agentLevelList'),
						meta: {
							title: '分销员等级/佣金率',
							keepAlive: true
						}
					},
					{
						path: '/agent/list',
						name: 'AgentList',
						component: () => import('@/views/agent/agentList'),
						meta: {
							title: '分销员列表',
							keepAlive: true
						}
					},
					// {
					//   path: '/agent/leader-list',
					//   name: 'AgentLeaderList',
					//   component: () => import('@/views/agent/agentLeaderList'),
					//   meta: {
					//     title: '团队长列表',
					//     keepAlive: true
					//   }
					// },
					{
						path: '/agent/brokerage/list',
						name: 'BrokerageList',
						component: () => import('@/views/agent/brokerageList'),
						meta: {
							title: '佣金记录',
							keepAlive: true
						}
					},
					{
						path: '/agent/invite/record',
						name: 'InviteRecordList',
						component: () => import('@/views/agent/inviteRecord'),
						meta: {
							title: '邀请记录',
							keepAlive: true
						}
					},
				]
			},
			{
				path: '/sys-setting',
				name: 'SysSetting',
				component: PageView,
				meta: {
					title: '系统设置',
					keepAlive: true,
					icon: 'tool'
				},
				hideChildrenInMenu: true,
				redirect: '/sys-setting/index',
				children: [{
					path: '/sys-setting/index',
					name: 'index',
					component: () => import('@/views/sysSetting/Index'),
					meta: {
						title: '系统设置',
						keepAlive: true
					}
				}, ]
			},
			// visitors
			// settings
			{
				path: '/settings',
				name: 'settings',
				component: PageView,
				hideChildrenInMenu: true,
				meta: {
					title: '小程序装修',
					keepAlive: true,
					icon: 'setting'
				},
				redirect: '/settings/index',
				children: [{
					path: '/tool',
					name: 'index',
					component: () => import('@/views/tool/Index'),
					meta: {
						title: '实用工具',
						keepAlive: true
					}
				}, {
					path: '/settings/index',
					name: 'index',
					component: () => import('@/views/uiSetting/Index'),
					meta: {
						title: 'UI装修',
						keepAlive: true
					}
				}]
			},
			// manage
			{
				path: '/manage',
				name: 'manage',
				component: PageView,
				meta: {
					title: '管理员及权限',
					keepAlive: true,
					icon: 'desktop'
				},
				redirect: '/manage/roles',
				children: [{
						path: '/manage/roles',
						name: 'Roles',
						component: () => import('@/views/admin/RoleList'),
						meta: {
							title: '角色列表',
							keepAlive: true
						}
					},
					{
						path: '/manage/admins',
						name: 'Admins',
						component: () => import('@/views/admin/AdminList'),
						meta: {
							title: '管理员列表',
							keepAlive: true
						}
					}
				]
			},
			// Exception
			{
				path: '/exception',
				name: 'exception',
				component: RouteView,
				redirect: '/exception/404',
				meta: {
					title: '异常页',
					icon: 'warning',
					permission: ['exception']
				},
				hidden: true,
				children: [{
						path: '/exception/401',
						name: 'Exception401',
						component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/401'),
						meta: {
							title: '403',
							permission: ['exception']
						}
					},
					{
						path: '/exception/404',
						name: 'Exception404',
						component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/404'),
						meta: {
							title: '404',
							permission: ['exception']
						}
					},
					{
						path: '/exception/500',
						name: 'Exception500',
						component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/500'),
						meta: {
							title: '500',
							permission: ['exception']
						}
					}
				]
			},
		]
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
		path: '/user',
		component: UserLayout,
		redirect: '/user/login',
		hidden: true,
		children: [{
			path: 'login',
			name: 'login',
			component: () => import( /* webpackChunkName: "user" */ '@/views/user/Login')
		}]
	},
	{
		path: '*',
		redirect: '/exception/404'
	}
]