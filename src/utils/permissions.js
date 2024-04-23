let perms = [{
  title: '编辑操作',
  key: 'edit'
}]

import {
  asyncRouterMap
} from "../config/router.config.js"

const list = asyncRouterMap[0].children.map(item => {
  return {
    key: item.name,
    title: item.meta.title,
    permissions: [
      ...perms
    ]
  }
})


export default list
// {
//   Stat: {
//     title: 'IP管理',
//     permissions: [
//       ...perms
//     ]
//   },
//   User: {
//     title: '分类管理',
//     permissions: [
//       ...perms
//     ]
//   },
//   Shop: {
//     title: '盲盒管理',
//     permissions: [
//       ...perms
//     ]
//   },
//   Form: {
//     title: '商品管理',
//     permissions: [
//       ...perms
//     ]
//   },
//   Indicator: {
//     title: '活动管理',
//     permissions: [
//       ...perms
//     ]
//   },
//   Order: {
//     title: '优惠券管理',
//     permissions: [
//       ...perms
//     ]
//   },
//   SamplingTube: {
//     title: '分享裂变/红包',
//     permissions: [
//       ...perms
//     ]
//   },
//   Coupon: {
//     title: '用户管理',
//     permissions: [
//       ...perms
//     ]
//   },
//   Article: {
//     title: '访客管理',
//     permissions: [
//       ...perms
//     ]
//   },
//   LAB: {
//     title: '订单管理',
//     permissions: [
//       ...perms
//     ]
//   },
//   Admin: {
//     title: '小程序设置',
//     permissions: [
//       ...perms
//     ]
//   },
//   Admin: {
//     title: '管理员及权限管理',
//     permissions: [
//       ...perms
//     ]
//   }
// }
