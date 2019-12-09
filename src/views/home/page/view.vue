<template>
    <div class="content">
        <div class="container add-container">
           <el-page-header @back="goBack" content="" class="go-back"> </el-page-header>
           <div class="form-box">
              <el-form  :model="ruleForm" class="demo-form-inline" :label-position="labelPosition" label-width="110px" >
                
                <el-form-item label="页面名称">
                    <div>{{ruleForm.name}}</div>
                </el-form-item>              
                <el-form-item label="所属权限">
                   <div>{{ruleForm.role}}</div>
                </el-form-item>
                <el-form-item label="页面类型">
                   <div>{{ruleForm.ify}}</div>
                </el-form-item>
                <el-form-item label="按钮设置">
                   <span v-for="(item,i) in ruleForm.btn" :key="i">
                     {{item}}
                   </span>
                </el-form-item>
               
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
          ruleForm: {
              name:'',
              role:'',
              ify:'',
              btn:''
          },
           
        }
    },
    
    methods: {
      goBack() {
        return this.$router.go(-1);
      },
      
    },
    created(){
      let id = this.$route.query.id
        this.$fetch('/page/detail',{id:id}).then(res=>{
          console.log(res)
          if(res.status == 200){
            this.ruleForm.name = res.body.name  //页面名称
            this.ruleForm.role = res.body.roleName //所属权限
            this.ruleForm.ify = res.body.typeName //页面类型
            this.ruleForm.btn = res.body.buttonName
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
