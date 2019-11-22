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
          
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../views/user/login'], resolve),
    },
  ]
})
