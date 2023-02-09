<template>
  <div class="header">
      <div class="h_left">
        <el-button size="mini" icon="el-icon-menu"
        @click='change'></el-button>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="i in tabsList" :key="i.name">{{i.label}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="h_right">
          <el-dropdown @command="logout">
            <span class="el-dropdown-link">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>             
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item command="cancel">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
    data () {
        return {
        }
    },
    methods:{
        //菜单栏状态 - 点击 展开/收起
        change(){
            this.$store.commit('changeisCollapse')
        },
        logout(command){
        if(command === 'cancel'){
            Cookie.remove('token')
            this.$router.push('/login')
        }
    }
    },
    computed:{
        //获取Vuex面包屑的数据
        tabsList(){
            return this.$store.state.menu.tabsList
        }
    },
    
}

</script>

<style scoped>
    .header{
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .h_left{
        display: flex;
        align-items: center;
    }
    .el-breadcrumb{
        margin-left: 20px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>