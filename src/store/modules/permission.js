import {
  constantRoutes
} from '@/router'
import {
  getRouters
} from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView';
import InnerLink from '@/layout/components/InnerLink'

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    indexRouter: {},
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = constantRoutes.concat(routes)
    },
    SET_INDEX_ROUTER: (state, router) => {
      state.indexRouter = router
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      // 顶部导航菜单默认添加统计报表栏指向首页
      const index = [{
        path: 'index',
        meta: {
          title: '统计报表',
          icon: 'dashboard'
        }
      }]
      state.topbarRouters = routes.concat(index);
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({
      commit
    }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          const sdata = JSON.parse(JSON.stringify(res.data))
          const rdata = JSON.parse(JSON.stringify(res.data))
          const indexdata = JSON.parse(JSON.stringify(res.data))
          const sidebarRoutes = filterAsyncRouter(sdata)
          const rewriteRoutes = filterAsyncRouter(rdata, false, true)
          const indexRouter = resolveIndexRouter(indexdata,'')
          rewriteRoutes.push({
            path: '*',
            redirect: '/404',
            hidden: true
          })
          rewriteRoutes.push({
            path: '/index',
            redirect: indexRouter.path,
            hidden: true
          })
          let hasBasic = false
          for (let i = 0; i < rewriteRoutes.length; i++) {
            if (rewriteRoutes[i].path == '/') {
              rewriteRoutes[i].redirect = indexRouter.path
              hasBasic = true
            }
          }
          if (!hasBasic) {
            rewriteRoutes.push({
              path: '/',
              redirect: indexRouter.path,
              hidden: true
            })
          }
          commit('SET_INDEX_ROUTER', indexRouter)
          commit('SET_ROUTES', rewriteRoutes)
          commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
          commit('SET_DEFAULT_ROUTES', sidebarRoutes)
          commit('SET_TOPBAR_ROUTES', sidebarRoutes)
          let router = rewriteRoutes
          resolve(router)
        })
      })
    }
  }
}

function hasShowChildren (route) {
  let children = route.children || []
  for (let i = 0; i < children.length; i++) {
    if (!children[i].hidden) {
      return true
    }
  }
  return false
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {
    // if (type && route.children) {
      // route.children = filterChildren(route.children)
    // }
    if (hasShowChildren(route)) {
      route.redirect = "noRedirect"
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

function resolveIndexRouter(router,path) {
  for(let i = 0; i < router.length; i++) {
      if(router[i].hidden === false) {
        path = path + ((path.endsWith('/') || router[i].path.startsWith('/')) ? router[i].path : `/${router[i].path}`)
        if(router[i].children){
          return resolveIndexRouter(router[i].children, path)
        }else{
          router[i].path = path
          return router[i]
        }
      }
  }
}

export const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views/${view}`], resolve)
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`)
  }
}

export default permission
