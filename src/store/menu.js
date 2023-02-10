import Cookie from "js-cookie"

export default{
    state:{
        //菜单栏状态
        isCollapse:true,
        //面包屑
        tabsList:[
            {
                path:'/home',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home'
            },
        ],
        menuData:[]
    },
    mutations:{
        // 改变菜单栏状态信息
        changeisCollapse(state){
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据（添加）
        addtabs(state,i){
            const index = state.tabsList.findIndex(item => item.name === i.name)
            if(index === -1){
                state.tabsList.push(i)
            }
        },
        // 更新面包屑数据（删除）
        handleClose(state,tag){
            const index = state.tabsList.findIndex(item=>tag.name === item.name)
            state.tabsList.splice(index, 1);
        },
        // 设置menuData的数据
        setMenu(state, val){
            state.menuData = val
            Cookie.set('menuData', JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state, router){
            // 判断缓存中是否有数据
            if(!Cookie.get('menuData')) return
            const menu = JSON.parse(Cookie.get('menuData'))
            state.menu = menu
            // 组装动态路由
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item 
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray, 'menuArray');
            // 路由动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    },
}