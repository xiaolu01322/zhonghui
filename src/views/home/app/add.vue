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
                    
                </el-row>               
                <el-form-item label="资金方" prop="fund">
                    <el-select v-model="ruleForm.fund" placeholder="--请选择资金方--" @change="selectGetFund">
                        <el-option
                        v-for="item in funds"
                        :key="item.lId"
                        :label="item.strFundName"
                        :value="item.lId">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="选择城市" prop="city">
                            <el-select v-model="ruleForm.city" filterable multiple placeholder="--请选择城市--" @change="selectGet">
                                <el-option
                                v-for="item in citys"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label="贷款月利率" prop="interestRate">
                            <el-input v-model="ruleForm.interestRate" placeholder=""></el-input>%
                        </el-form-item>
                    </el-col>
                </el-row>
                
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
                <el-form-item label="放款通道" prop="channelName">
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
                    <el-button type="primary" @click="quit">返回</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <!-- <el-button type="primary" >提交</el-button> -->
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
                interestRate:[
                    { required: true, message: '请输入贷款月利率', trigger: 'blur' }
                ],
                repaymentType:[
                    { required: true, message: '请选择还款方式', trigger: 'blur' }
                ],
                channelName:[
                    { required: true, message: '请输入放款通道', trigger: 'blur' }
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
            citysNameArr:[],
            strFundName:'',
            ruleForm: {    
                   name:'',
                   insideName:'',
                   fund:'',
                   city:'',
                   channelName:'',
                   repaymentDateType:'',
                   repaymentPrincipalRate:'',
                   period:'',
                   repaymentDateType:'',
                   repaymentDate:'',
                   interestType:'',
                   interestDays:'',
                   interestRate:'',
                   breakContractRate:'',
                   breakContractPeriod:'',
                   defaultInterestType:'',
                   defaultInterestRate:"",
                   gracePeriod:''
                },
            funds:'',//资金方列表
            citys:'',//城市列表
            repaymentTypes:[{ id:0,name:'先息后本'},{id:2,name:'按月付息' },{id:3,name:'气球贷'}],
            periods:[{id:0,name:'6期'},{id:1,name:'12期'},{id:2,name:'24期'},{id:3,name:'36期'},{id:4,name:'48期'},{id:5,name:'60期'}],
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
      quit(){
          this.$router.push('/page/list')
      },
      //下拉框多选选中事件
        selectGet(GUIDArr){//这个vId也就是value值
           for (let i = 0; i < GUIDArr.length; i++) {
            let obj = this.citys.find((item) => {
              return item.code === GUIDArr[i]
 
            })
            this.$set(this.citysNameArr, i, obj.name)
            console.log(this.citysNameArr)
          }

        },
        //下拉单选选中事件
        selectGetFund(vId){
             console.log(vId);
            let obj = {};
            obj = this.funds.find((item)=>{//这里的funds就是上面遍历的数据源
                return item.lId === vId;//筛选出匹配数据
            });
            this.strFundName = obj.strFundName
            console.log(obj.strFundName);//我这边的strFundName就是对应label的
        },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log(this.ruleForm.fund,1231)
                const params = new FormData();
                params.append("pageJson", JSON.stringify({
                   
                    'productName':this.ruleForm.name,
                    'fundName':this.strFundName,
                    "fundCode":this.ruleForm.fund,
                    'cityCode':this.ruleForm.city.toString(),
                    'cityName':this.citysNameArr.toString(),
                    'channelName':this.ruleForm.channelName,
                    repaymentType:this.ruleForm.repaymentType,
                    repaymentDateType:this.ruleForm.repaymentDateType,
                    repaymentPrincipalRate:Number(this.ruleForm.repaymentPrincipalRate),
                    period:this.ruleForm.period.toString(),
                    repaymentDateType:this.ruleForm.repaymentDateType,
                    repaymentDate:Number(this.ruleForm.repaymentDate),
                    interestType:this.ruleForm.interestType,
                    interestDays:this.ruleForm.interestDays,
                    interestRate:Number(this.ruleForm.interestRate),
                    breakContractRate:Number(this.ruleForm.breakContractRate),
                    breakContractPeriod:Number(this.ruleForm.breakContractPeriod),
                    defaultInterestType:this.ruleForm.defaultInterestType,
                    defaultInterestRate:Number(this.ruleForm.defaultInterestRate),
                    gracePeriod:Number(this.ruleForm.gracePeriod)


                }))

                this.$post('/product/add',  params).then(res =>{
                    
                if(res.status == 200){
                    this.$router.push('/page/list')
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
