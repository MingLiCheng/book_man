import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/app'),
      redirect: '/welcome',
      children:[
        {
          path:'welcome',
          name:'welcome',
          component: () => import ('./views/app/home')
        },
        {
          path:'book',
          name:'book',
          component: () => import('./views/app/book'),
          redirect: 'book/list',
          children:[
            {
              path: 'list',
              name: 'booklist',
              component: () => import('./views/app/book/BookList'),
            }
          ]
        },
        {
          path:'comment',
          name: 'comment',
          component: () => import('./views/app/comment'),
          redirect: 'comment/list',
          children:[
            {
              path: 'list',
              name: 'commentlist',
              component: () => import('./views/app/comment/CommentList'),
            }
          ]
        },
        {
          path:'shop',
          name: 'shop',
          component: () => import('./views/app/shop'),
          redirect: 'shop/list',
          children:[
            {
              path: 'list',
              name: 'shoplist',
              component: () => import('./views/app/shop/GoodsList'),
            }
          ]
        },
        {
          path:'user',
          name:'user',
          component: () => import ('./views/app/user'),
          redirect: 'user/list',
          children:[
            {
              path: 'list',
              name: 'userlist',
              component: () => import('./views/app/user/UserList'),
            },
            {
              path: 'userinfo/:userid',
              name: 'userinfo',
              component: () => import('./views/app/user/page/UserInfo.vue'),
            }
          ]
        },
      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import ('./views/signin/Signin.vue')
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
