<template>
  <div class="wrap">
    <div class="headers">
      <div class="logo">
        <a href="/">
          <!-- <img src="../../assets/img/logo.png" /> -->
        </a>
      </div>
      <div class="txt-login">
        <!-- <img src="../../assets/img/login_text_plain_top.png" />
        <img src="../../assets/img/login_text_plain_bottom.png" /> -->
      </div>
      <div class="left_bottom_text_plain">
        <!-- <p>合作联系邮箱： pub-support@domob.cn</p>
        <p>多盟睿达科技(中国)有限公司</p>
        <p>COPYRIGHT©DOMOB.CN</p> -->
      </div>
    </div>

    <div class="ms-login">
        <el-form class="ms-content" size="medium" :model="ruleForm" ref="ruleForm" :rules="rules">
            <el-row class="ms-title">
                <el-col :span="24">
                    <span class="user-behavior">登录</span>
                </el-col>
            </el-row>
            <el-form-item label prop="username">
                <el-input 
                v-model="ruleForm.username"
                prefix-icon="el-icon-user-solid"
                placeholder="手机号"
                > </el-input>
            </el-form-item>
            <el-form-item label prop="password">
                <el-input
                 type="password"
                 v-model="ruleForm.password"
                 prefix-icon="el-icon-s-check"
                 placeholder="请输入密码"
                > </el-input>
            </el-form-item>
           
           
            <el-form-item>
                <el-button class="submit-button" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
   
    return {
        captchaUrl:'',
        ruleForm: {
            username: "",
            password: "",
        },
        rules: {
            username: [
            { required: true, message: "用户名不能为空", trigger: "blur" }
            ],
            password: [
            { required: true, message: "密码不能为空", trigger: "blur" }
            ]
        }
    };
  },
  created() {
    
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid, data) => {
          if (valid) {
            let params = {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            };
            this.$post('/user/login',params).then(res => {
              console.log(res)
            })
            // this.__postData(
            //   "login",
            //   params,
            //   res => {
            //     this.$message.success("登录成功");
            //     this.$store.commit("$_setStorage", res);
            //     if (res.status == 0) {
            //       this.$router.push("/app/list");
            //     } else {
            //       this.$router.push("/user/active?status=0");
            //     }
            //   },
            //   errmsg => {
            //     this.$message.error(errmsg);
            //   }
            // );
          }
        });
      },
    }
};
</script>

<style >
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 600px;
}
.headers {
  position: relative;
  height: 100%;
  width: 65%;
  min-width: 800px;
  box-sizing: border-box;
  padding-left: 2%;
  padding-top: 2%;
}
.headers .logo img {
  width: 174px;
  height: 25px;
}
.headers .logo a {
  color: #fff;
  float: left;
  width: 180px;
}
.headers .txt-login {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 519px;
  height: 100px;
  text-align: center;
}
.headers .txt-login img:first-child {
  width: 519px;
  height: 57.5px;
}
.headers .txt-login img:last-child {
  width: 288px;
  height: 36px;
  margin-top: 20px;
}
.headers .left_bottom_text_plain {
  position: absolute;
  bottom: 2%;
  color: #fff;
  text-align: left;
}
.headers .left_bottom_text_plain p {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
}
.headers .left_bottom_text_plain p:last-child {
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 48px;
  opacity: 0.5;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: left;
  font-size: 20px;
  margin-bottom: 20px;
}
.ms-login {
  position: absolute;
  right: 0;
  top: 0;
  min-width: 500px; 
  width: 35%;
  background: #fff;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ms-content{
  width:80%;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
.submit-button {
  width: 100%;
  padding: 19px 20px;
  background: rgba(28, 129, 242, 1);
  font-size: 16px;
}
.toSignUp {
  width: 100%;
  padding: 19px 20px;
  border-color: rgba(28, 129, 242, 1);
  font-size: 16px;
  color: rgba(28, 129, 242, 1);
}
.tip-msg {
  font-size: 14px;
  line-height: 20px;
  color: #9b9b9c;
  font-weight: 500;
}
.tip-reg {
  text-align: left;
  cursor: pointer;
  color: rgba(22, 125, 220, 1);
}
.tip-reg:hover {
  color: #409eff;
}

.is-active {
  border-bottom: 2px solid #409eff;
}
.user-behavior {
  cursor: pointer;

  font-size: 36px;
  font-weight: 500;
  color: rgba(35, 40, 43, 1);
}
.aptcha .el-input {
  width: 73%;
  display: inline-block;
}
.ms-content .el-input__inner {
  background: rgba(246, 248, 250, 1);
  border-radius: 4px;
  border: none;
  height: 48px;
  line-height: normal;
  font-size: 14px;
  color: rgba(98, 109, 116, 1);
}
.captcha-img {
  /* display: inline-block; */
  height: 48px;
  width: 25%;
  float: right;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
}
.captcha-img img {
  width: 100%;
  height: 48px;
}
.captcha-img:hover .cover {
  z-index: 1;
}
.cover {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: rgba(123, 139, 137, 0.6);
  background-image: url(../../assets/img/captcha-refresh.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 16px 16px;
}
.el-checkbox {
  color: #9b9b9c;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #9b9b9c;
}
::-webkit-input-placeholder {
  color: rgba(98, 109, 116, 1);
}
::-moz-placeholder {
  color: rgba(98, 109, 116, 1);
} /* firefox 19+ */
:-ms-input-placeholder {
  color: rgba(98, 109, 116, 1);
} /* Internet Explorer 10+ */
:-moz-placeholder {
  color: rgba(98, 109, 116, 1);
} /* firefox 14-18 */
.el-icon-user-solid:before {
  display: inline-block;
  content: "";
  width: 14px;
  height: 15px;
  background: url(../../assets/img/user.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
.el-icon-s-check:before {
  display: inline-block;
  content: "";
  width: 13px;
  height: 16px;
  background: url(../../assets/img/password.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
.el-icon-check:before {
  display: inline-block;
  content: "";
  width: 14px;
  height: 15px;
  background: url(../../assets/img/pic.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
.el-input__icon {
  margin-top: 3px;
}
</style>
