<template>
    <div class="content">
        <div class="container add-container">
           <el-page-header @back="goBack" content="" class="go-back"> </el-page-header>
           <div class="form-box">
              <el-form  :model="ruleForm" :rules="rules"  ref="ruleForm" class="demo-form-inline" :label-position="labelPosition" label-width="110px" >
                
                <el-form-item label="页面名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入页面名称"></el-input>
                </el-form-item>              
                <el-form-item label="所属权限" prop="role">
                    <el-select v-model="ruleForm.role" placeholder="--请选择权限--">
                      <el-option
                        v-for="item in roles"
                        :key="item.nId"
                        :label="item.strName"
                        :value="item.nId">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="页面类型" prop="ify">
                    <el-select v-model="ruleForm.ify" placeholder="--请选择页面类型--">
                    
                       <el-option
                          v-for="item in ifyValue"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="按钮设置" prop='btn'>
                    <el-select v-model="ruleForm.btn"  multiple  placeholder="按钮设置">
                        <el-option
                          v-for="item in btn"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
               
                <el-form-item>
                    <el-button type="primary">返回</el-button>
                    <el-button type="primary"  @click="submitForm('ruleForm')">提交</el-button>
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
                  name: '',
                  role: '',
                  ify: '', 
                  btn: '',
              },
              roles:'',
              ifyValue:'',
              btn:'',
            rules: {
              name: [
                { required: true, message: '请输入页面名称', trigger: 'blur' },
              ],
              role: [
                { required: true, message: '请选择所属权限', trigger: 'change' }
              ],
              ify: [
                { required: true, message: '请选择页面类型', trigger: 'change' }
              ],
              btn: [
                { required: true, message: '请选择按钮设置', trigger: 'blur' }
              ],
              
            }
            
        }
    },
     mounted() {
     
    },
    methods: {
      goBack() {
        return this.$router.go(-1);
      },
       submitForm(formName) {
         console.log(this)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = new FormData();
            params.append("pageJson", JSON.stringify({
                  name:this.ruleForm.name,
                  button:this.ruleForm.btn.toString(),
                  roleId:this.ruleForm.role,
                  type:this.ruleForm.ify,
                }))

            this.$post('/page/add',  params).then(res =>{
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
       let params={}
       //获取所属权限
        this.$fetch('/role/list')
        .then((res) => {
            this.roles = res.body
        })
        //获取页面类型
        this.$fetch('/page/typeList').then((res)=>{
          this.ifyValue = res.body
        })
        //获取按钮类型
        this.$fetch('/page/buttonList').then((res)=>{
          this.btn = res.body
        })

        
    }
}
</script>
<style>
.go-back {
      margin-bottom: 40px;
    }
</style>
