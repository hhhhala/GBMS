<template>
    <div class="App">
      <el-container>
      <el-aside width="auto">
          <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <Tage></Tage>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    </div>
  </template>
  
  <script>
  import Aside from '@/components/Aside'
  import Header from '@/components/Header'
  import Tage from '@/components/tage'
  
    export default {
      components:{
        Aside,
        Header,
        Tage
      }
    }
  </script>
  
  <style scoped>
    .el-header{
      background-color: #333;
      color: #fff;
      /* line-height: 60px; */
    }
    .el-aside {
      background-color: #545c64;
      color: #333;
      width: 200px;
    }
    .el-main {
      color: #333;
      line-height: 10px;
    }
    
    body > .el-container {
      margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
  </style>
  