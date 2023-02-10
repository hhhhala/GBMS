<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :collapse="isCollapse"
              background-color="#545c64"        
              text-color="#fff"
              active-text-color="#ffd04b"
              :default-active = "$route.path">

              <h1 class="h1">{{isCollapse? '后台':'通用后台管理系统'}}</h1>
              
              <el-menu-item :index="item.path" v-for="item in noChildren" 
              :key='item.name' @click="toMenu(item)">           
                <i :class="'el-icon-'+item.icon"></i>
                <span>{{item.label}}</span>
              </el-menu-item>

              <el-submenu :index="item.label" v-for="item in haveChildren" :key='item.label'>
                <template slot="title">
                  <i :class="'el-icon-'+item.icon"></i>
                  <span>{{item.label}}</span>
                </template>
                <el-menu-item-group >
                    <el-menu-item :index="item1.path" v-for="item1 in item.children" 
                    :key='item1.label' @click="toMenu(item1)">
                      <i :class="'el-icon-'+item1.icon"></i>
                      {{item1.label}}
                    </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
import Cookie from 'js-cookie';

  export default {
    data(){
      return{
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toMenu(i){
        if(this.$route.path !== i.path){
          this.$router.push(i.path)
        }
        this.$store.commit('addtabs',i)
      }
    },
    computed:{
      //找到有子菜单的的数据组元素
      haveChildren(){
        return this.menuData.filter(item => item.children)
      },
      //找到没有子菜单的数据组元素
      noChildren(){
        return this.menuData.filter(item => !item.children)
      },
      // 菜单栏状态
      isCollapse(){
        return this.$store.state.menu.isCollapse
      },
      menuData(){
        return JSON.parse(Cookie.get('menuData'))  || this.$store.state.menu.menuData
      }
      
    },
    
  }
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-vertical-demo{
    height: 100vh;
    border-right:none;
      .h1{
      color: #fff;
      text-align: center;
    }
  }
  
</style>>

