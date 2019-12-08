<template>
    <div class="content">
        <div class="container process-container">
           <div class="handle-box">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    
                    <el-form-item label="资金方">
                        <el-select v-model="value" placeholder="请选择资金方">
                         <el-option
                            v-for="item in formInline.investor"
                            :key="item.strFundCode"
                            :label="item.strFundName"
                            :value="item.strFundCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>

            </div>    
           <div class="handle-box2">
                <div>
                    <el-button type="text" class="list_title">流程配置</el-button>
                </div>
                <div>
                    <el-row>
                        <el-button type="info" plain>预约下户</el-button>
                        <i class="el-icon-right"></i>
                        <el-button type="info" plain>下户审核</el-button>
                        <i class="el-icon-right"></i>
                        <el-button type="info" plain>下户分配</el-button>
                        <i class="el-icon-right"></i>
                        <el-button type="info" plain>前端</el-button>
                        <i class="el-icon-right"></i>
                        <el-button type="info" plain>初审分单</el-button>
                        <i class="el-icon-right"></i>
                        <el-button type="info" plain>审批初审</el-button>
                    </el-row>
                    <el-row style="text-align:right;">
                        <i class="el-icon-bottom"></i>
                    </el-row>
                    <el-row  style="text-align:right;">
                        <i class="el-icon-plus"  style="border:1px red solid;border-radius:50%;color:red;"></i>
                    </el-row>
                    <el-row  style="text-align:right;">
                        <i class="el-icon-bottom"></i>
                    </el-row>
                    <el-row  style="text-align:right;">
                        <el-button type="info" plain>还款确认</el-button>
                        <i class="el-icon-back"></i>
                        <el-button type="info" plain>放款确认</el-button>
                        <i class="el-icon-back"></i>
                         <i class="el-icon-plus"  style="border:1px red solid;border-radius:50%;color:red;"></i>
                        <i class="el-icon-back"></i>
                        <el-button type="info" plain>面签确认</el-button>
                        <i class="el-icon-back"></i>
                        <el-button type="info" plain>确认要款</el-button>
                    </el-row>
                    <el-row></el-row>

                </div>
                
            </div>    
        </div>
    </div>
</template>

<script>
export default {
     data() {
            return {
                formInline: {
                    investor: [],//投资方
                },
                value:'',
                
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            getData() {
               
                this.$fetch('/fund-info/list')
                    .then((res) => {
                        this.formInline.investor = res.body
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
    .handle-box2 {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        /* justify-content: flex-start; */
        align-items: flex-start;
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
