<template>
    <div class="content">
        <div class="container home-container">
              
            <div class="handle-box">
                <el-button type="text" class="list_title">页面管理</el-button>
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="goAdd">新建页面</el-button>           
            </div>
            <el-table :data="tableData" border class="table table-container-home" >
                <el-table-column prop="name" label="页面名称" width="100" align="center"> </el-table-column>
                <el-table-column prop="roleName" label="所属权限" width="200" align="center"> </el-table-column>
                <el-table-column prop="typeName" label="页面类型" width="100" align="center"> </el-table-column>
                <el-table-column label="按钮设置" align="left" >
                    <template slot-scope="scope">
                        <el-button type="text" class="success"  icon="el-icon-success" v-for="(item,index) in scope.row.buttonName" :key="index">{{item}}</el-button>
                        
                        
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="text" icon="el-icon-view" @click="handleView(scope.row.id)">查看</el-button>
                        <el-button type="text" icon="el-icon-delete"  @click="handleDel(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                 @current-change="handleCurrentChange"
                :current-page="currentPage"
                 :page-size="pageSize"        
                layout="prev, pager, next"
                :total="1000">
                </el-pagination>
            </div>  
        </div>
    </div>
</template>

<script>
export default {
     data() {
            return {
               tableData:[],
               currentPage:1,
               pageSize:20
            }
        },
        methods: {
            handleEdit(id) {
                console.log(id);
                let path = '/page/edit?id='+ id
                 this.$router.push(path)
            },
            handleView(id) {
               console.log(id);
                let path = '/page/view?id='+ id
                 this.$router.push(path)
            },
            handleDel(row) {
                console.log(row);
                 const params = new FormData();
                params.append("pageJson", JSON.stringify({
                    id:row
                }))
                this.$post('/page/delete',params)
                .then((res) => {
                    console.log(res)
                })

            },
            handleCurrentChange(e){
                console.log(e)
                let params={
                   pageIndex:e,
                   pageSize:10
               }
                this.$fetch('/page/list',params)
                .then((res) => {
                    this.tableData = res.body
                    console.log(this.tableData)
                })
            },
            onSubmit() {
                console.log('submit!');
            },
            goAdd(){
               this.$router.push('/page/add')
            },
            open() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            },
             getData() {
               let params={
                   pageIndex:1,
                   pageSize:10
               }
                this.$fetch('/page/list',params)
                .then((res) => {
                    this.tableData = res.body
                    console.log(this.tableData)
                })
            },
        },
        created(){
            this.getData()
        }
}  
</script>
<style>
.handle-box {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center
    }
    .list_title{
        font-size: 28px;
        color:#2c3e50;
        margin-left:0px!important;
    }
    .date-range span {
      margin-right: 10px;
    }
    .app-type {
        display: inline-block;
        margin: 0 40px 0 20px;
    }
    .app-type span {
      margin-right: 10px;
    }
    .stats-type {
        display: inline-block;
    }
    .stats-type span {
      margin-right: 10px;
    }
    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .success i{
        color:#1abb0e;
    }
</style>