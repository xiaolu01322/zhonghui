<template>
    <div class="content">
        <div class="container add-container">
           <el-page-header @back="goBack" content="" class="go-back"> </el-page-header>
           <div class="form-box">
              <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline" :label-position="labelPosition" label-width="110px" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="产品名称" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入产品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品名称(内部)" >
                            <el-input v-model="ruleForm.insideName" placeholder="请输入产品名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>               
                <el-form-item label="资金方" prop="fund">
                    <el-select v-model="ruleForm.fund" placeholder="--请选择资金方--">
                        <el-option
                        v-for="item in funds"
                        :key="item.lId"
                        :label="item.strFundName"
                        :value="item.lId">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择城市" prop=“city>
                    <el-select v-model="ruleForm.city" multiple placeholder="--请选择城市--">
                        <el-option
                        v-for="item in citys"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="还款方式" prop='repaymentType'>
                            <el-select v-model="ruleForm.repaymentType" placeholder="请选择还款方式">
                            <el-option
                                v-for="item in repaymentTypes"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="按年归本比例">
                            <el-input v-model="ruleForm.repaymentPrincipalRate" placeholder=""></el-input>%
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="放款通道">
                    <el-input v-model="ruleForm.channelName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="产品期限" prop="period">
                    <el-select v-model="ruleForm.period" multiple placeholder="请选择产品期限">
                        <el-option

                            v-for="item in periods"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="还款日" prop="repaymentDateType">
                            <el-select v-model="ruleForm.repaymentDateType" placeholder="请选择还款日期类型">
                                <el-option

                                v-for="item in repaymentDateTypes"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="固定日为">
                            <el-input v-model="ruleForm.repaymentDate" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否补齐">
                            <el-select v-model="ruleForm.repaymentMethod" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="计息方式" prop="interestType">
                            <el-select v-model="ruleForm.interestType" placeholder="请选择计息方式">
                                <el-option
                                v-for="item in interestTypes"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="年计息天数" prop="interestDays">
                            <el-select v-model="ruleForm.interestDays" placeholder="请选择计息天数">
                            <el-option
                                v-for="item in interestDayss"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="违约金" prop="breakContractRate">
                            <el-input v-model="ruleForm.breakContractRate"  type="number" placeholder="请输入比例"></el-input>%
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收取违约金期数">
                            <el-input v-model="ruleForm.breakContractPeriod" type="number" placeholder="请输入期数"></el-input>期
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="罚息利率" prop="defaultInterestRate">
                            <el-input v-model="ruleForm.defaultInterestRate" placeholder="年化利率"></el-input>%
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="罚息基数" prop="defaultInterestType">
                            <el-select v-model="ruleForm.defaultInterestType" placeholder="请选择罚息基数">
                                <el-option
                                    v-for="item in defaultInterestTypes"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="宽限期" prop="gracePeriod">
                            <el-input v-model="ruleForm.gracePeriod" placeholder="请输入宽限天数"></el-input>天
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-form-item>
                    <el-button type="primary">返回</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button type="primary" >提交</el-button>
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
            rules: {
                name: [
                    { required: true, message: '请输入产品名称', trigger: 'blur' },
                ],
                insideName: [
                    { required: true, message: '请输入产品内部名称', trigger: 'blur' },
                ],
                fund: [
                    { required: true, message: '请选择资金方', trigger: 'blur' }
                ],
                city: [
                    { required: true, message: '请选择资城市', trigger: 'blur' }
                ],
                repaymentType:[
                    { required: true, message: '请选择还款方式', trigger: 'blur' }
                ],
                period:[
                    { required: true, message: '请选择产品期限', trigger: 'blur' }
                ],
                period:[
                    { required: true, message: '请选择产品期限', trigger: 'blur' }
                ],
                repaymentDateType:[
                    { required: true, message: '请选择还款日期类型', trigger: 'blur' }
                ],
                interestType:[
                     { required: true, message: '请选择计息方式', trigger: 'blur' }
                ],
                interestDays:[
                     { required: true, message: '请选择计息方式', trigger: 'blur' }
                ],
                breakContractRate: [
                    { required: true, message: '请输入违约金比例', trigger: 'blur' },
                ],
                defaultInterestRate:[
                    { required: true, message: '请输入罚息年化利率', trigger: 'blur' },
                ],
                defaultInterestType:[
                    { required: true, message: '请输入罚息基数', trigger: 'blur' },
                ]
            },
            labelPosition: 'right',
            ruleForm: {    
                   name:'',
                   insideName:'',
                   fund:'',
                   city:'',
                   repaymentDateType:'',
                   repaymentPrincipalRate:'',
                   period:'',
                   repaymentDateType:'',
                   repaymentDate:'',
                   interestType:'',
                   interestDays:'',
                   breakContractRate:'',
                   breakContractPeriod:'',
                   defaultInterestType:'',
                   defaultInterestRate:"",
                   gracePeriod:''
                },
            funds:'',//资金方列表
            citys:'',//城市列表
            repaymentTypes:[{
                id:0,
                name:'先息后本'
            },
            {
                id:2,
                name:'按月付息'
            },
            {
                id:3,
                name:'气球贷'
            }],
            periods:[{id:0,name:'6期'},{id:1,name:'12期'},{id:3,name:'24期'},{id:4,name:'36期'},{id:5,name:'48期'},{id:6,name:'60期'}],
            repaymentDateTypes:[{id:0,name:'非固定还款日'},{id:1,name:'固定还款日'}],
            interestTypes:[{id:0,name:'算头不算尾'},{id:1,name:'算头又算尾'}],
            interestDayss: [{id:0,name:'360'},{id:1,name:'365'}],
            defaultInterestTypes:[{id:0,name:'剩余贷款金额'},{id:1,name:'贷款金额'}]
        }
    },
     mounted() {
      
    },
    methods: {
      goBack() {
        return this.$router.go(-1);
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                const params = new FormData();
                params.append("pageJson", JSON.stringify({
                //    productName:this.ruleForm.name,
                //    fundName:this.ruleForm.fund,
                //    cityCode:this.ruleForm.city,
                //    repaymentDateType:this.ruleForm.repaymentDateType,
                //    repaymentPrincipalRate:this.ruleForm.repaymentPrincipalRate,
                //    period:this.ruleForm.period.toString(),
                //    repaymentDateType:this.ruleForm.repaymentDateType,
                //    repaymentDate:this.ruleForm.repaymentDate,
                //    interestType:this.ruleForm.interestType,
                //    interestDays:this.ruleForm.interestDays,
                //    breakContractRate:this.ruleForm.breakContractRate,
                //    breakContractPeriod:Number(this.ruleForm.breakContractPeriod),
                //    defaultInterestType:this.ruleForm.defaultInterestType,
                //    defaultInterestRate:this.ruleForm.defaultInterestRate,
                //    gracePeriod:Number(this.ruleForm.gracePeriod)
                    "productName":this.ruleForm.name,
                    "cityCode":this.ruleForm.city,
                    "cityName":this.ruleForm.city,
                    "fundName":this.ruleForm.fund,
                    "fundCode":"1",
                    "channelName":"民生信托",
                    "period":"1,2,3,4,5",
                    "repaymentType":1,
                    "repaymentPrincipalRate":0.5,
                    "repaymentDateType":1,
                    "repaymentDate":"25",
                    "interestType":1,
                    "interestDays":"1",
                    "breakContractPeriod":0,
                    "breakContractRate":1,
                    "defaultInterestType":0,
                    "defaultInterestRate":0.108,
                    "gracePeriod":1,
                    "state":0
                }))

                this.$post('/product/add',  params).then(res =>{
                    console.log(res,12312)
                if(res.status == 200){
                        // this.$router.push('/page/list')
                }
                } )
            } else {
                console.log('error submit!!');
                return false;
            }
        });
      },
      
    },
    created(){
        // 获取资金方
        this.$fetch('/fund-info/list').then(res =>{
            this.funds = res.body
        })
         // 获取城市
        this.$fetch('/city/list').then(res =>{
            this.citys = res.body
        })
    }
}
</script>
<style>
.go-back {
      margin-bottom: 40px;
    }
.el-form-item__label{
    padding-right:7px;
}
</style>
