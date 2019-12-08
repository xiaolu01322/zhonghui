<template>
    <div class="content">
        <div class="container home-container">
           <div class="handle-box">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="产品名称">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="还款方式">
                        <el-select v-model="formInline.repaymentMethod" placeholder="还款方式">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择资方">
                        <el-select v-model="formInline.investor" placeholder="活动区选择资方域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="还款日">
                        <el-select v-model="formInline.repaymentDate" placeholder="还款日">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>    
            <div class="handle-box">
                <el-button type="text" class="list_title">产品列表</el-button>
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10">新建产品</el-button>           
            </div>
            <el-table :data="tableData" border class="table table-container-home" >
                <el-table-column prop="productName" label="产品名称" width="100" align="center"> </el-table-column>
                <el-table-column prop="nameInside" label="产品名称（内部）" width="200" align="center"> </el-table-column>
                <el-table-column prop="capitalSide" label="资金方" width="100" align="center"> </el-table-column>
                <el-table-column prop="channelName" label="放款通道" width="100" align="center"> </el-table-column>
                <el-table-column prop="repaymentType" label="还款方式" width="100" align="center"> </el-table-column>
                <el-table-column prop="repaymentDate" label="还款日" width="200" align="center"> </el-table-column>
                <el-table-column prop="period" label="借款周期" width="300" align="center"> </el-table-column>
                <el-table-column prop="defaultInterestRate" label="罚息年利率" width="100" align="center"> </el-table-column>
                <el-table-column prop="breakContractRate" label="违约金比例" width="100" align="center"> </el-table-column>
                <el-table-column label="操作" align="center">
                    <template  slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="goView(scope.row.id)">查看</el-button>
                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete"  @click="open">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination :page-size="20" layout="prev, pager, next" :total="100">
                </el-pagination>
            </div>  
        </div>
    </div>
</template>

<script>
export default {
     data() {
            return {
                tableData: [
                    {
                       name:'小微E贷',
                       nameInside:'石景山支行-小微E贷标砖贷',
                       capitalSide:'石银',
                       lendingChannel:'石银',
                       repaymentMethod:'先息后本',
                       repaymentDate:'固定日',
                       borrowingCycle:'6期、12期、36期、 60期',
                       adiRate:'24',
                       robFees:'0.5',
                    }
                ],
                formInline: {
                    user: '',
                    region: '',
                    repaymentMethod: '', // 还款方式
                    repaymentDate: '', //还款日
                    investor: '',//投资方
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            goView(id){
                console.log(id)
                let path = '/app/view?id='+id;
                this.$router.push(path)
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
                let params = {
                    pageIndex: 1,
                    pageSize: 10
                };
                this.$fetch('/product/list',params)
                .then((res) => {
                    this.tableData = res.body
                   
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
</style>
