import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import '@/api/mock'
import * as echarts from 'echarts';
import Cookie from 'js-cookie'


Vue.config.productionTip = false
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts


// 添加全局前置导航首位
router.beforeResolve((to, from, next) => {
  // 判断token存不存在
  const token = Cookie.get('token')
  if(!token && to.name !== 'login'){           // token不存在 用户没登陆，跳转登陆界面   
    next({ name: 'login' })
  }else if (token && to.name === 'login'){     // token存在 用户登录成功，跳转首页
    next({ name: 'home'})
  }else{
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
