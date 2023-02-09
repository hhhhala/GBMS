<template>
    <el-form ref="form" class="login-container" :inline="true" :model="form" :rules="rule">
        <h3 class="login-title">登陆</h3>
        <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'

export default {
    data() {
        return {
            form:{
                username:'',
                password:''
            },
            rule:{
                username:[{required:true, trigger: 'blur', message: '请输入用户名'}],
                password:[{required:true, trigger: 'blur', message: '请输入密码'}],
            }
        }
    },
    methods: {
        // 登录
        submit() {
            // token信息
            // const token = Mock.Random.guid()
            // token信息存入cookie用于不同页面间的通信
            // Cookie.set('token', token)
            this.$refs.form.validate((valid) => {
                if(valid){
                    getMenu(this.form).then(({data}) => {
                        console.log(data);
                        if(data.code == 20000) {
                            Cookie.set('token', data.data.token)
                            this.$router.push('/home')
                        }else{
                            this.$message.error(data.data.message)
                        }
                    })
                    
                }
            })

            

        }
    }
}
</script>

<style lang="less" scoped>
    .login-container{
        padding: 20px;
        width: 420px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        text-align: center;
        border-radius: 20px;
        box-shadow: 0px 0px 8px #00000031;
        .el-input{
            width: 240px;
        }
    }
</style>
