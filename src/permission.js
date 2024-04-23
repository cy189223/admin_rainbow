import Vue from 'vue'
import router from './router'
import store from './store'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

let whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist

function isPathExist (map, path) {
  for (var i = map.length - 1; i >= 0; i--) {
    if (map[i].path === path)
      return true

    if (map[i].children) {
      if (isPathExist(map[i].children, path))
        return true
    }
  }
  return false
}

router.beforeEach((to, from, next) => {
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login') {
      next()
    } else {
      if (!store.getters.userInfo.id) {
        store
          .dispatch('GetInfo')
          .then(res => {
            const perms = (res.data && res.data.info.perms) || []
            store.dispatch('GenerateRoutes', {perms}).then(() => {
              // const first = role.permissions[0] || {}
              // next()
              let routers = store.getters.addRouters

              router.addRoutes(routers)

              console.log('addRouters', routers)
              
              let toRoute = routers[0].children[0]

              // 查找是否有对应的path
              if (isPathExist(routers, to.path) && to.path !== '/')
                toRoute = to

              console.log('toRoute', toRoute)

              // console.log(store.getters.addRouters)
              next({
                path: toRoute.path,
                query: toRoute.query
              })

            })
          })
          .catch(() => {
            next({ path: '/user/login' })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name) || to.path === '/user/login') {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login' })
    }
  }
})

router.afterEach(() => {})
