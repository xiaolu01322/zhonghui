<template>
    <div class="content">
        <div class="container add-container">
           <el-page-header @back="goBack" content="" class="go-back"> </el-page-header>
           <div class="form-box">
              <el-form  :model="ruleForm" class="demo-form-inline" :label-position="labelPosition" label-width="110px" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="产品名称">
                            <div>{{ruleForm.productName}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品名称(内部)">
                            <div>{{ruleForm.productCode}}</div>
                        </el-form-item>
                    </el-col>
                </el-row>               
                <el-form-item label="资金方">
                    
                    <div>{{ruleForm.fundName}}</div>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="选择城市">
                            <div>{{ruleForm.cityName}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="贷款月利率">
                            <div>{{ruleForm.interestRate}}</div>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
               
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="还款方式">
                            
                            <div>{{repaymentTypes[ruleForm.repaymentType]}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="按年归本比例">
                            <div>{{ruleForm.repaymentPrincipalRate}}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="放款通道">
                    <div>{{ruleForm.channelName}}</div>
                </el-form-item>
                <el-form-item label="产品期限">
                    <span v-for="(item,index) in ruleForm.period" :key="index">
                        {{periods[Number(item)]}}
                    </span>
                  </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="还款日">
                            
                            <div>{{repaymentDateTypes[ruleForm.repaymentDateType]}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="固定日为">
                            <div>{{ruleForm.repaymentDate}}</div>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="计息方式">
                            
                            <div>{{interestTypes[ruleForm.interestType]}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="年计息天数">
                            
                            <div>{{ruleForm.interestDays}}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="违约金">
                            <div>{{ruleForm.breakContractRate}}%</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收取违约金期数">
                            <div>{{ruleForm.breakContractPeriod}}期</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="罚息利率">
                            <div>{{ruleForm.defaultInterestRate}}%</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="罚息基数">
                            
                            <div>{{defaultInterestTypes[ruleForm.defaultInterestType]}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="宽限期">
                            <div>{{ruleForm.gracePeriod}}天</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-form-item>
                    <el-button type="primary">返回</el-button>
                </el-form-item>
              </el-form>
           </div>
        </div>      
    </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'right',
            ruleForm: {},
            repaymentTypes:['先息后本','按月付息','气球贷'],
            periods:['6期','12期','24期','36期','48期','60期'],
            repaymentDateTypes:['非固定还款日','固定还款日'],
            interestTypes:['算头不算尾','算头又算尾'],
            // interestDayss: ['360','365'],
            defaultInterestTypes:['剩余贷款金额','贷款金额']
        }
    },
    methods: {
      goBack() {
        return this.$router.go(-1);
      },
      
    },
    created(){
        let id = this.$route.query.id
        this.$fetch('/product/detail',{id:id}).then(res => {
            console.log(res,123123)
            this.ruleForm = res.body
        })
    }
}
</script>
<style>
.go-back {
      margin-bottom: 40px;
    }
</style>
