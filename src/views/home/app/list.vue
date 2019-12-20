<template>
    <div class="content">
        <div class="container home-container">
           <div class="handle-box">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left;">
                    <el-form-item label="产品名称">
                        <el-input v-model="formInline.productName" placeholder="产品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="还款方式" >
                        <el-select v-model="formInline.repaymentType" placeholder="请选择还款方式">
                        <el-option
                            v-for="item in repaymentTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="资金方">
                        <el-select v-model="formInline.fundCode" placeholder="--请选择资金方--">
                            <el-option
                            v-for="item in funds"
                            :key="item.lId"
                            :label="item.strFundName"
                            :value="item.lId">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="还款日" >
                        <el-select v-model="formInline.repaymentDate" placeholder="请选择还款日期类型">
                            <el-option

                            v-for="item in repaymentDateTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>    
            <div class="handle-box">
                <el-button type="text" class="list_title">产品列表</el-button>
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleAdd">新建产品</el-button>           
            </div>
            <el-table :data="tableData" border class="table table-container-home" >               
                <el-table-column prop="productName" label="产品名称" width="200" align="center"> </el-table-column>
                <el-table-column prop="fundName" label="资金方" width="100" align="center"> </el-table-column>
                <el-table-column prop="channelName" label="放款通道" width="100" align="center"> </el-table-column>
                <el-table-column prop="repaymentType" label="还款方式" width="100" align="center"> 
                    <template slot-scope="scope">
                        <span>{{repaymentTypeArr[scope.row.repaymentType]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="repaymentDateType" label="还款日" width="100" align="center"> 
                    <template slot-scope="scope">
                        <span>{{repaymentDateTypeArr[scope.row.repaymentDateType]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="period" label="借款周期" width="300" align="center"> 
                    <template slot-scope="scope">
                        <span v-for="(item,index) in scope.row.period.split(',')" :key="index">
                            {{periodArr[Number(item)]}}、
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="defaultInterestRate" label="罚息年利率（%）" width="100" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.defaultInterestRate*100}}</span>
                        </template>
                 </el-table-column>
                <el-table-column prop="breakContractRate" label="违约金比例（%）" width="100" align="center">
                     <template slot-scope="scope">
                            <span>{{scope.row.breakContractRate*100}}</span>
                        </template>
                 </el-table-column>
                <el-table-column label="操作" align="center" width="200" fixed="right">
                    <template  slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="handleView(scope.row.id)">查看</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" >删除</el-button>
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
                currentPage:1,
                pageSize:20,
                tableData: [],
                formInline: {
                    productName: '',
                    repaymentType: '', // 还款方式
                    repaymentDate: '', //还款日
                    fundCode: '',//投资方
                },
                repaymentTypeArr:['先息后本','按月付息','气球贷'],
                repaymentDateTypeArr:['非固定','固定'],
                periodLength:0,
                periodArr:["6期","12期","24期","36期","48期","60期"],
                repaymentTypes:[{ id:0,name:'先息后本'},{id:2,name:'按月付息' },{id:3,name:'气球贷'}],
                repaymentDateTypes:[{id:0,name:'非固定还款日'},{id:1,name:'固定还款日'}],
                funds:[],
            
            }
        },
        methods: {
            onSubmit() {
                let params = {
                     productName: this.formInline.productName,
                    repaymentType: this.formInline.repaymentType, // 还款方式
                    repaymentDate: this.formInline.repaymentDate, //还款日
                    fundCode: this.formInline.fundCode,//投资方
                    pageIndex: 1,
                    pageSize: 10,
                };
                this.$fetch('/product/list',this.formInline)
                .then((res) => {
                    console.log(res)
                    // this.tableData = res.body
                })
                console.log('submit!');
            },
            handleView(id){
                let path = '/app/view?id='+id;
                this.$router.push(path)
            },
            handleEdit(id){
                let path = '/app/edit?id='+id;
                this.$router.push(path)
            },
            handleAdd(){
                let path = '/app/add';
                this.$router.push(path)
            },
            handleCurrentChange(e){
                console.log(e)
                let params={
                   pageIndex:e,
                   pageSize:10
               }
                this.$fetch('/product/list',params)
                .then((res) => {
                    this.tableData = res.body
                    console.log(this.tableData)
                })
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
                 // 获取资金方
                this.$fetch('/fund-info/list').then(res =>{
                    this.funds = res.body
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
