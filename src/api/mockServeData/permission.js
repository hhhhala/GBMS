import Mock from 'mockjs'

export default{
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        // 判断用户是否存在
        // 判断账号密码是否正确
        if(username === '1' && password === '1'){
            return{
                code: 20000,
                data:{
                    menuData: [
                        {
                          path: '/home',
                          name: 'home',
                          label: '首页',
                          icon: 's-home',
                          url: 'Home.vue'
                        },
                        {
                          path: '/goods',
                          name: 'goods',
                          label: '商品管理',
                          icon: 'goods',
                          url: 'MallManage.vue'
                        },
                        {
                          path: '/user',
                          name: 'user',
                          label: '用户管理',
                          icon: 'user',
                          url: 'UserManage.vue'
                        },
                        {
                          label: '其他',
                          icon: 'location',
                          children: [
                            {
                              path: '/page1',
                              name: 'page1',
                              label: '页面1',
                              icon: 'setting',
                              url: 'PageOne.vue'
                            },
                            {
                              path: '/page2',
                              name: 'page2',
                              label: '页面2',
                              icon: 'setting',
                              url: 'PageTwo.vue'
                            }
                          ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功' 
                }
            }
        }else{
            return{
                code: -999,
                data:{
                    message: '密码错误'
                }
            }
        }
    }
}