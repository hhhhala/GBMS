import http from '@/utils/request.js'

//请求

//首页请求数据
export const getDate = ()=>{
    return http.get('/home/getDate')
}

// 获取用户数据
export const getUser = (params)=>{
    console.log(params);
    return http.get('/user/getUser', params)
}
// 添加用户
export const addDate = (data)=>{
    return http.post('/user/addDate', data)
}
// 删除用户
export const delDate = (data)=>{
    return http.post('/user/delDate', data)
}
// 编辑用户数据
export const osDate = (data)=>{
    return http.post('/user/osDate', data)
}

// 登录验证库
export const getMenu = (data)=>{
    return http.post('/permission/getMenue', data)
}