import Vue from 'vue'
import Router from 'vue-router'

// 创建路由组件
import Main from '@/views/Main'
import Home from '@/views/Home'
import goods from '@/views/MallManage'
import user from '@/views/UserManage'
import pageone from '@/views/PageOne'
import pagetwo from '@/views/PageTwo'
import login from '@/views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  
  routes: [
    {path:'/', 
    name: 'Main',
    component: Main, 
    redirect: '/home',
    children:[
      // {path:'home', component: Home, name:'home'},
      // {path:'goods', component: goods},
      // {path:'user', component: user},
      // {path:'page1', component: pageone},
      // {path:'page2', component: pagetwo},
    ]
  },
    {path:'/login', component:login, name:'login'},
  ]
})
