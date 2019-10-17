/* Layout */
import Layout from '@/layout'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
export default [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/date-security',
    component: Layout,
    redirect: '/data-security/grade/page',
    name: 'date-security',
    meta: { title: '数据安全', icon: 'shujuanquan' },
    children: [
      {
        path: 'grade/page',
        name: 'grade-page',
        component: () => import('@/views/data-security/grade/page'),
        meta: { title: '安全等级', icon: 'shujuanquan' }
      },
      {
        path: 'recognise/page',
        name: 'recognise-page',
        component: () => import('@/views/data-security/recognise/page'),
        meta: { title: '识别规则', icon: 'shibieguize' }
      },
      {
        path: 'desensitization/page',
        name: 'desensitization-page',
        component: () => import('@/views/data-security/desensitization/page'),
        meta: { title: '脱敏规则', icon: 'tuomingguize' }
      },
      {
        path: 'encrypt/page',
        name: 'encrypt-page',
        component: () => import('@/views/data-security/encrypt/page'),
        meta: { title: '加密算法', icon: 'jiamisuanfa' }
      },
      {
        path: 'colgrade/page',
        name: 'colgrade-page',
        component: () => import('@/views/data-security/colgrade/page'),
        meta: { title: '数据识别', icon: 'shujushibie' }
      },
      {
        path: 'encrypt-key/page',
        name: 'encrypt-key-page',
        component: () => import('@/views/data-security/encryptKey/page'),
        meta: { title: '秘钥管理', icon: 'miyaoguanli' }
      },
      {
        path: 'function/page',
        name: 'function-page',
        component: () => import('@/views/data-security/function/page'),
        meta: { title: '识别函数', icon: 'hanshuguanli' }
      },
      {
        path: 'data-applyfor/page',
        name: 'data-applyfor-page',
        component: () => import('@/views/data-security/dataApplyfor/page'),
        meta: { title: '权限申请', icon: 'hanshuguanli' }
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

