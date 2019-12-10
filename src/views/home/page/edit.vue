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
                    <el-select v-model="ruleForm.role" placeholder="--请选择权限--" disabled="">
                      <!-- <el-option
                        v-for="item in roles"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option> -->
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
                    <el-select v-model="ruleForm.btn"  multiple  value-key="id" placeholder="按钮设置">
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
              rolesId:'',
              ifyValue:'',
              ifyValueId:'',
              btn:'',
              btnId:'',
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = new FormData();
            params.append("pageJson", JSON.stringify({
                  id:this.$route.query.id,
                  name:this.ruleForm.name,
                  button:this.ruleForm.btn.toString(),
                  roleId:this.rolesId,
                  type:this.ruleForm.ify,
                }))

            this.$post('/page/edit',  params).then(res =>{
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
      arrayInt(arr){
        let arrInt = []
        for(var a=0;a<arr.length;a++){
            arrInt.push(Number(arr[a]))
        }
        return arrInt;
      },
    },
    created(){
      //  获取id
        let id = this.$route.query.id
        this.$fetch('/page/detail',{id:id}).then(res=>{
          console.log(res)
          if(res.status == 200){
            this.ruleForm.name = res.body.name  //页面名称

            this.ruleForm.role = res.body.roleName //所属权限
            this.rolesId = res.body.roleId   //所属权限ID
            this.ruleForm.ify = res.body.type //页面类型
            this.ifyValueId = res.body.type //页面类型ID

            this.ruleForm.btn = this.arrayInt(res.body.button.split(","))

            this.ifyValue = res.body.typeList
            this.btn = res.body.buttonList
            console.log(this.btn)
          }
        })
        
       
        
    }
}
</script>
<style>
.go-back {
      margin-bottom: 40px;
    }
</style>
