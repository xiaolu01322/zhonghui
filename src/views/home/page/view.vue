<template>
    <div class="content">
        <div class="container add-container">
           <el-page-header @back="goBack" content="" class="go-back"> </el-page-header>
           <div class="form-box">
              <el-form  :model="ruleForm" class="demo-form-inline" :label-position="labelPosition" label-width="110px" >
                
                <el-form-item label="页面名称">
                    <!-- <el-input v-model="ruleForm.user" placeholder="请输入页面名称"></el-input> -->
                    <div>123</div>
                </el-form-item>              
                <el-form-item label="所属权限">
                   <div>123</div>
                    <!-- <el-select v-model="ruleForm.repaymentMethod" placeholder="--请选择权限--">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item label="页面类型">
                   <div>123</div>
                    <!-- <el-select v-model="ruleForm.repaymentMethod" placeholder="--请选择页面类型--">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item label="按钮设置">
                   <div>123</div>
                    <!-- <el-select v-model="ruleForm.repaymentMethod" placeholder="按钮设置">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select> -->
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
                user: '',
                region: '',
                repaymentMethod: '', // 还款方式
                repaymentDate: '', //还款日
                investor: '',//投资方
            },
            options: [],
            value: [],
            list: [],
            loading: false,
            states: ["Alabama", "Alaska", "Arizona",
            "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida",
            "Georgia", "Hawaii", "Idaho", "Illinois",
            "Indiana", "Iowa", "Kansas", "Kentucky",
            "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana",
            "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York",
            "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania",
            "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas",
            "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin",
            "Wyoming"]
        }
    },
     mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    methods: {
      goBack() {
        return this.$router.go(-1);
      },
      onSubmit() {
        console.log('submit!');
      },
       remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    }
}
</script>
<style>
.go-back {
      margin-bottom: 40px;
    }
</style>
