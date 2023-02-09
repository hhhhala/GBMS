import Mock from 'mockjs'
import homeData from './mockServeData/home'
import userData from './mockServeData/user'
import permission from './mockServeData/permission'

//首页后台请求拦截
Mock.mock('api/home/getDate','get',homeData.getTuBiaoData)


//用户管理后台请求拦截
Mock.mock(/api\/user\/getUser/,'get',userData.getUserList)
Mock.mock('api/user/addDate','post',userData.createUser)
Mock.mock('api/user/delDate','post',userData.deleteUser)
Mock.mock('api/user/osDate','post',userData.updateUser)

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)
