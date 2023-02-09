<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="user_top">
              <img class="user_img" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="">
              <div>
                <h3>hhhhahl</h3>
                <p class="user_text">超级管理员</p>
              </div>
            </div>
            <hr>
            <div>
              <p class="user_text">上次登陆时间<span>2021-7-18</span></p>
              <p class="user_text">上次登录地点<span>武汉</span></p>
            </div>
          </el-card>
          <el-card>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="name" label="课程"></el-table-column>
              <el-table-column prop="todayBuy" label="今日购买"></el-table-column>
              <el-table-column prop="monthBuy" label="本月购买"></el-table-column>
              <el-table-column prop="totalBuy" label="总购买"></el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <div class="card_box">
            <el-col :span="8" v-for="i in countData" :key="i.name">
              <el-card class="box-card" shadow="hover" :body-style="{ padding: '0px',display:'flex' }">
                <div class="left" :style="{background: i.color}">
                  <i :class="'el-icon-' + i.icon"></i>
                </div>
                <div class="right">
                  <h3>￥{{i.value}}</h3>
                  <span class="user_text">{{i.name}}</span>
                </div>
              </el-card>
            </el-col>
          </div>
        </div>
        <el-col>
          <el-card>
            <div class="order" id="line">
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="user">
            <div class="order" id="bar">
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="user">
            <div class="order" id="pie">
            </div>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDate } from '@/api'

export default {
  data(){
    return{
      tableData:[],
      countData:[],
      //现状图的数据表
      line_option:{
        xAxis:{
          data:[],
        },
        legend:{
          data:[]
        },
        yAxis:{},
        series:[]
      },
      //柱状图的数据表
      bar_option:{
        xAxis:{
          data:[],
        },
        yAxis:{},
        series:[]
      },
      //饼状图的数据表
      pie_option:{
        series:[{
          type: 'pie',
          radius: '55%',
          data:[],
        }]
      },
    }
  },
  methods:{
    getLoadEcharts(a,b){
      let myChart = this.$echarts.init(a);
      // myChart.clear()
      myChart.setOption(b)
      // myChart = null

    },
  },
  mounted(){  
    let line = document.getElementById("line");
    let bar = document.getElementById("bar");
    let pie = document.getElementById("pie");

    getDate().then(({data:res})=>{
        this.tableData = res.data.tableData
        this.countData = res.data.countData
        //线状图的数据提取-追加
        this.line_option.xAxis.data = res.data.orderData.date
        Object.keys(res.data.orderData.data[0]).forEach(element => {
          this.line_option.legend.data.push(element)
          this.line_option.series.push({
              'data':res.data.orderData.data.map(a => a[element]),
              'name':element,
              'type':'line',
            })       
        });
        this.getLoadEcharts(line,this.line_option);

        //柱状图的数据提取-追加
        var active = []
        var news = []
        for(var i = 0;i<res.data.userData.length;i++){
          let item = res.data.userData[i]
          this.bar_option.xAxis.data.push(item.date)
          active.push(item.active)
          news.push(item.new)
        }
        this.bar_option.series.push({
              'data':news,
              'type':'bar',
            })
        this.bar_option.series.push({
              'data':active,
              'type':'bar',
            })
        this.getLoadEcharts(bar,this.bar_option);

        //饼状图的数据提取-追加
        res.data.videoData.forEach(element => {
          this.pie_option.series[0].data.push({
              'value':element.value,
              'name':element.name,
          })
        });
        this.getLoadEcharts(pie,this.pie_option);

    }).catch(err=>{console.log(err)})

    
  },
    
}
</script>

<style lang="less" scoped>
  .grid-content>.box-card{
    margin-bottom: 20px;
  }
  .user_top{
    display: flex;
    align-items: center;
    &>div{
      margin-left: 20px;
      line-height: 0px;
    }
  }
  .user_text{
    font-size: 12px;
    color: #b8bbc2;
    span{
      margin-left: 40px;
      color: #959595;
    } 
  }
  .user_img{
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .card_box{
    display: flex;
    flex-wrap: wrap;
    .box-card{
      min-width: 70px;
      min-height: 70px;
      margin-bottom:20px;
      border: none;    
    }
    .left{
      min-width: 70px;
      min-height: 70px;
      text-align: center;
      line-height: 70px;
      font-size: 24px;
      color: #fff;
    }
    .right{
      padding: 8px 0;
      margin-left: 12px;
      line-height: 0px;
    }
    h3{
      font-weight: 500;
    }
  }
  .order{
    width: 100%;
    height: 300px;;
    background: #fff;
  }
  .user{
    margin-top: 20px;
  }
</style>