<template>
    <el-menu class="header" mode="horizontal"  background-color="#0A1731" text-color="#fff" active-text-color="#20a0ff" :default-active="$route.path" @select="handleSelect">
        <div class="logo"><a href="/"><img src="../../../assets/img/dev-logo.png" width="278"></a></div>
        <div class="header-right">
            <div class="header-user-con">
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </el-menu>
</template>
<script>
    export default {
        data() {
            return {
                path:'',
                collapse: false,
                fullscreen: false,
                name: '众慧',
            }
        },
         computed:{
            username(){
                let user = JSON.parse(localStorage.getItem('user'))
            
                return user ? user.username:  this.$router.push('/login');
            }
        },
        created(){
            this.path = this.$route.path;
        },
        methods:{
           // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                   
                        this.$store.commit("$_removeStorage");
                        this.$router.push('/login');
                  
                }
            },
           handleSelect(key, keyPath) {
                return this.$router.push(key)
           },
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        width: 100%;
        height: 60px;
        font-size: 22px;
        color: #fff;
        background-color: #0A1731;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 60px;
    }
    .header .logo a{
        color: #fff;
        float: left;
        width:180px;
        margin-left: 30px;
        line-height: 60px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-right .doc-download{
        color:#ffffff;
        font-size: 14px;
        padding: 0 20px;
        cursor: pointer;
    }
    .header-user-con{
        display: flex;
        height: 60px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .doc_is_active{
        color: rgb(32, 160, 255)!important;
        border-bottom-color: rgb(32, 160, 255)!important;
        background-color: rgb(10, 23, 49)!important;
    }
</style>
