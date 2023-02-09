

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
        ]
    },
    mutations:{
        changeisCollapse(state){
            state.isCollapse = !state.isCollapse
        },

        addtabs(state,i){
            const index = state.tabsList.findIndex(item => item.name === i.name)
            if(index === -1){
                state.tabsList.push(i)
            }
        },
        handleClose(state,tag){
            const index = state.tabsList.findIndex(item=>tag.name === item.name)
            state.tabsList.splice(index, 1);
        }
        
    },
}