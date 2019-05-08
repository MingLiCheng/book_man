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
            },
            {
              path: 'detail/:bookid',
              name: 'bookdetail',
              component: () => import('./views/app/book/page/BookDetail.vue'),
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
            },
            {
              path: 'detail/:commentId',
              name: 'commentdetail',
              component: () => import('./views/app/comment/page/CommentDetail.vue'),
            },
          ]
        },
        {
          path:'shop',
          name: 'shop',
          component: () => import('./views/app/shop'),
          redirect: 'shop/goodslist',
          children:[
            {
              path: 'goodslist',
              name: 'goodslist',
              component: () => import('./views/app/shop/pages/GoodsList'),
            },
            {
              path: 'orderlist',
              name: 'orderlist',
              component: () => import('./views/app/shop/pages/OrderList'),
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
              path: 'adminlist',
              name: 'adminlist',
              component: () => import('./views/app/user/page/AdminList'),
            },
            {
              path: 'userinfo/:userid',
              name: 'userinfo',
              component: () => import('./views/app/user/page/UserInfo.vue'),
            }
          ]
        },
        {
          path: 'advertisement',
          name: 'advertisement',
          component: () => import('./views/app/advertisement'),
          redirect: 'advertisement/list',
          children:[
            {
              path: 'booklist',
              name: 'advertisementbooklist',
              component: () => import('./views/app/advertisement/page/BookList.vue'),
            },
            {
              path: 'goodslist',
              name: 'advgoodslist',
              component: () => import('./views/app/advertisement/page/GoodsList.vue'),
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
