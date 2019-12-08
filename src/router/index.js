import Vue from 'vue'
import Router from 'vue-router'
// import util from '../utils/util'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component : resolve => require(['../views/home/home.vue'], resolve),
      meta: { title: '多盟轻推送-开发者后台' },
      name: 'index',
      redirect: '/app/list', 
      children: [
        {
          path: '/app',
          meta: { title: '应用列表' },
          name: 'app',
          component: resolve => require(['../views/home/app/index'], resolve),
          children: [
              {
                  path: 'list',
                  name: 'app_list',
                  component: resolve => require(['../views/home/app/list'], resolve),
                  meta: { title: '应用列表' }
              },
              {
                  path: 'add',
                  name: 'app_add',
                  component: resolve => require(['../views/home/app/add'], resolve),
                  meta: {
                      title: '添加应用' ,
                      access: ['visitor'],
                  }
              },
              {
                  path: 'edit',
                  name: 'app_edit',
                  component: resolve => require(['../views/home/app/edit'], resolve),
                  meta: {
                      title: '编辑应用' ,
                      access: ['visitor'],
                  }
              },
              {
                  path: 'view',
                  name: 'app_view',
                  component: resolve => require(['../views/home/app/view'], resolve),
                  meta: {
                      title: '查看应用' ,
                      access: ['visitor'],
                  }
              }
          ],
        },
        {
          path: '/process',
          meta: { title: '应用列表' },
          name: 'process',
          component: resolve => require(['../views/home/process/index'], resolve),
          children: [
              {
                  path: 'list',
                  name: 'process_list',
                  component: resolve => require(['../views/home/process/list'], resolve),
                  meta: { title: '应用列表' }
              }
          ],
        },
        {
          path: '/page',
          meta: { title: '应用列表' },
          name: 'page',
          component: resolve => require(['../views/home/page/index'], resolve),
          children: [
              {
                  path: 'list',
                  name: 'page_list',
                  component: resolve => require(['../views/home/page/list'], resolve),
                  meta: { title: '页面管理' }
              },
              {
                path: 'add',
                name: 'page_add',
                component: resolve => require(['../views/home/page/add'], resolve),
                meta: {
                    title: '添加页面' ,
                    access: ['visitor'],
                }
              },
              {
                path: 'edit',
                name: 'page_edit',
                component: resolve => require(['../views/home/page/edit'], resolve),
                meta: {
                    title: '编辑页面' ,
                    access: ['visitor'],
                }
              },
              {
                path: 'view',
                name: 'page_view',
                component: resolve => require(['../views/home/page/view'], resolve),
                meta: {
                    title: '查看页面' ,
                    access: ['visitor'],
                }
              },
          ],
        }        
      ]
    },
   
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../views/user/login'], resolve),
    },
  ]
})
