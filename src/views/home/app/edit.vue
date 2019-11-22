<template>
    <div class="content">
        <div class="container edit-container">
           <el-page-header @back="goBack" content="" class="go-back"> </el-page-header>
           <div class="form-box">
              <el-form  :model="ruleForm" class="demo-form-inline" :label-position="labelPosition" label-width="110px" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="产品名称">
                            <el-input v-model="ruleForm.user" placeholder="请输入产品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品名称(内部)">
                            <el-input v-model="ruleForm.user" placeholder="请输入产品名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>               
                <el-form-item label="资金方">
                    <el-select v-model="ruleForm.repaymentMethod" placeholder="--请选择资金方--">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择城市">
                    <el-select v-model="ruleForm.investor" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="还款方式">
                            <el-select v-model="ruleForm.repaymentMethod" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="按年归本比例">
                            <el-input v-model="ruleForm.user" placeholder=""></el-input>%
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="放款通道">
                    <el-input v-model="ruleForm.user" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="产品期限">
                    <el-select v-model="ruleForm.repaymentMethod" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="还款日">
                            <el-select v-model="ruleForm.repaymentMethod" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="固定日为">
                            <el-input v-model="ruleForm.user" placeholder=""></el-input>%
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
                        <el-form-item label="计息方式">
                            <el-select v-model="ruleForm.repaymentMethod" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="年计息天数">
                            <el-select v-model="ruleForm.repaymentMethod" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="违约金">
                            <el-input v-model="ruleForm.user" placeholder=""></el-input>%
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收取违约金期数">
                            <el-input v-model="ruleForm.user" placeholder=""></el-input>期
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="罚息利率">
                            <el-input v-model="ruleForm.user" placeholder=""></el-input>%
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="罚息基数">
                            <el-select v-model="ruleForm.repaymentMethod" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="宽限期">
                            <el-input v-model="ruleForm.user" placeholder=""></el-input>天
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-form-item>
                    <el-button type="primary">返回</el-button>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
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
            labelPosition: 'right',
           ruleForm: {
                user: '',
                region: '',
                repaymentMethod: '', // 还款方式
                repaymentDate: '', //还款日
                investor: '',//投资方
            }
        }
    },
    methods: {
      goBack() {
        return this.$router.go(-1);
      },
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>
<style>
.go-back {
      margin-bottom: 40px;
    }
</style>
