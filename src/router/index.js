import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import Demo from '../views/user/Demo.vue'
import Demo1 from '../views/user/Demo1.vue'
import MyFollow from '../views/user/MyFollow.vue'
import MyComment from '../views/user/MyComment.vue'
import MyStar from '../views/user/MyStar.vue'
import Index from '../views/news/Index.vue'
import Manage from '../views/news/Manage.vue'
import PostDetail from '../views/news/PostDetail.vue'
import Search from '../views/news/Search.vue'

Vue.use(VueRouter)
// 全局的把push的异常处理了
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 指定的每一个路由规则都可以提供一个name属性
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/register',
    component: Register,
    name: 'register'
    // beforeEnter: function(to, from, next) {
    //   console.log('路由独享的导航守卫执行了')
    //   next()
    // }
  },
  { path: '/user', component: User, name: 'user' },
  {
    path: '/user-edit',
    component: UserEdit,
    name: 'user-edit'
  },
  {
    path: '/demo',
    component: Demo
  },
  {
    path: '/demo1',
    component: Demo1
  },
  {
    path: '/my-follow',
    component: MyFollow,
    name: 'my-follow'
  },
  {
    path: '/my-comment',
    component: MyComment,
    name: 'my-comment'
  },
  {
    path: '/mystar',
    component: MyStar,
    name: 'mystar'
  },
  {
    path: '/',
    component: Index,
    name: 'index'
  },
  {
    path: '/manage',
    component: Manage,
    name: 'manage'
  },
  {
    path: '/post-detail/:id',
    component: PostDetail,
    name: 'post-detail'
  },
  {
    path: '/search',
    component: Search,
    name: 'search'
  }

]
const router = new VueRouter({
  routes,
  // 采用H5的history模式,默认是hash模式
  mode: 'history'
})
// 配置全局的导航守卫
// to:到哪儿去
// from:从哪来
// next:函数,代表是否放行
// 判断to的path 是否是/user 判断用户是否去个人中心
// 1.如果不是去个人中心 next() 放心
// 2.如果是去个人中心 判断是否有token
//  如果有,放心
//  如果没有,跳转到登陆
router.beforeEach(function(to, from, next) {
  // 只要路由发生跳转,跳转之前这个函数就要执行
  // console.log('前置导航守卫执行了')
  // console.log('to', to)
  // console.log('from', from)
  //   if (to.name === 'user') {
  //     const token = localStorage.getItem('token')
  //     if (token) {
  //       next()
  //     } else {
  //       router.push('/login')
  //     }
  //   } else {
  //     next()
  //   }

  const token = localStorage.getItem('token')
  // 需要拦截的所有页面
  const authUrls = ['/user', '/user-edit', 'my-follow', 'my-comment', 'mystar']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})
// router.afterEach(function(to, from) {
// console.log('后置导航守卫执行了')
// })

export default router
