import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

export const asyncRoutes = [

  {
    path: '/bookmanage',
    name: 'Bookmanage',
    component: Layout,
    redirect: '/bookmanage/bookinfo',
    alwaysShow: true,
    meta: {
      title: '图书管理',
      icon: 'example'
    },
    children: [
      {
        path: 'bookinfo',
        name: 'Bookinfo',
        component: () => import('@/views/bookinfo/index'),
        meta: {
          title: '图书信息管理',
          icon: 'form',
          roles: ['admin', 'reader'],
          noCache: true
        }
      },
      {
        path: 'booktype',
        name: 'Booktype',
        component: () => import('@/views/booktype/index'),
        meta: {
          title: '图书类型管理',
          icon: 'tree',
          roles: ['admin'],
          noCache: true
        }
      },
      {
        path: 'borrow',
        name: 'Borrow',
        component: () => import('@/views/borrow/index'),
        meta: {
          title: '借阅信息管理',
          icon: 'borrow',
          roles: ['admin', 'reader'],
          noCache: true
        }
      }
    ]
  },

  // {
  //   path: '/reader',
  //   name: 'Reader',
  //   component: Layout,
  //   redirect: '/reader/readerinfo',
  //   alwaysShow: true,
  //   meta: {
  //     title: '读者管理',
  //     roles: ['admin'],
  //   },
  //   children: [
  //     {
  //       path: 'reader',
  //       name: 'Reader',
  //       component: () => import('@/views/reader/index'),
  //       meta: {
  //         title: '读者信息',

  //         roles: ['admin'],
  //         noCache: true
  //       }
  //     }
  //   ]
  // },

  {
    path: '/other',
    name: 'Other',
    component: Layout,
    redirect: '/other/user',
    alwaysShow: true,
    meta: {
      title: '其他管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: {
          title: '用户管理',
          icon: 'user',
          roles: ['admin'],
          noCache: true
        }
      },
      {
        path: 'password',
        name: 'Password',
        component: () => import('@/views/password/index'),
        meta: {
          title: '修改密码',
          icon: 'eye',
          roles: ['admin', 'reader'],
          noCache: true
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
