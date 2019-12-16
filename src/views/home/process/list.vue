<template>
    <div class="content">
        <div class="container process-container">
           <div class="handle-box">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    
                    <el-form-item label="资金方">
                        <el-select v-model="formInline.investor" placeholder="请选择资金方">
                         <el-option
                            v-for="item in investor"
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
                <div  id="elButton" class="elButton" ref="elButton">
                    <el-row>
                        <el-col :span="4">
                            <el-button type="info" plain>预约下户</el-button>
                            <i class="el-icon-right"></i>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="info" plain>下户审核</el-button>
                            <i class="el-icon-right"></i>
                        </el-col>
                        <el-col  :span="4">
                            <el-button type="info" plain>下户分配</el-button>
                            <i class="el-icon-right"></i>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="info" plain>前端</el-button>
                            <i class="el-icon-right"></i>
                        </el-col>
                        <el-col  :span="4">
                            <el-button type="info" plain>初审分单</el-button>
                            <i class="el-icon-right"></i>
                        </el-col>
                        <el-col  :span="4">
                            <el-button type="info" plain>审批初审</el-button>
                            <i class="el-icon-bottom"></i>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-for="(item,index) in region1" :key="index" :span="4">
                            <el-button type="danger" plain>{{item.name}}</el-button>
                            <i class="el-icon-right"></i>
                        </el-col>
                        <el-col  :span="4">
                            <el-button type="success" icon="el-icon-plus"  @click="regionFirst">添加流程</el-button>
                        </el-col>
                        
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-button type="info" plain>确认要款</el-button>
                            <i class="el-icon-right"></i>
                        </el-col>
                        <el-col  :span="4">
                            <el-button type="info" plain>面签确认</el-button>
                            <i class="el-icon-bottom"></i>
                        </el-col>
                    </el-row>
                    <el-col v-for="(item,index) in region2" :key="index" :span="4">
                        <el-button type="warning" plain>{{item.name}}</el-button>
                        <i class="el-icon-right"></i>
                    </el-col>
                    <el-row>
                        <el-col :span="4">
                            <el-button type="success" icon="el-icon-plus"  @click="regionSecond">添加流程</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col  :span="4">
                            <el-button type="info" plain>放款确认</el-button>
                            <i class="el-icon-right"></i>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="info" plain>还款确认</el-button>
                        </el-col>
                    </el-row> 
                   <el-row>
                       <el-col :span="4">
                           <el-button type="primary" @click="pullFn"> 提交</el-button>
                       </el-col>
                   </el-row>
                </div>
                    
            </div>  
            <div class="showModalBoxBg first" v-if="formflag == 'first'">
                 <div class="showModalBox">
                    <el-table :data="regionData" border class="table table-container-home" >
                        <el-table-column label="选择" align="center" width="100" >
                            <template slot-scope="scope">
                                <el-checkbox label="选择" @change="checkboxChangeFirst(scope.row.id)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="页面名称" width="100" align="center"> </el-table-column>
                        <el-table-column prop="roleName" label="所属权限" width="100" align="center"> </el-table-column>
                        <el-table-column prop="typeName" label="页面类型" width="100" align="center"> </el-table-column>
                        <el-table-column label="按钮设置" align="left" width="140">
                            <template slot-scope="scope">
                                <el-button type="text" class="success"  icon="el-icon-success" v-for="(item,index) in scope.row.buttonName" :key="index">{{item}}</el-button>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                    <div style="margin-top:20px;">
                        <el-button type="primary" plain @click="quit">取消</el-button>
                        <el-button type="primary" plain @click="onSubmitFirst">保存</el-button>
                    </div>
                 </div>
            </div>  
            <div class="showModalBoxBg second" v-if="formflag == 'second'">
                 <div class="showModalBox">
                    <el-table :data="regionData" border class="table table-container-home" >
                        <el-table-column label="选择" align="center" width="100" >
                            <template slot-scope="scope">
                                <el-checkbox  label="选择" @change="checkboxChangeSecond(scope.row.id)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="页面名称" width="100" align="center"> </el-table-column>
                        <el-table-column prop="roleName" label="所属权限" width="100" align="center"> </el-table-column>
                        <el-table-column prop="typeName" label="页面类型" width="100" align="center"> </el-table-column>
                        <el-table-column label="按钮设置" align="left" width="140">
                            <template slot-scope="scope">
                                <el-button type="text" class="success"  icon="el-icon-success" v-for="(item,index) in scope.row.buttonName" :key="index">{{item}}</el-button>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                     <div style="margin-top:20px;">
                        <el-button type="primary" plain @click="quit">取消</el-button>
                        <el-button type="primary" plain @click="onSubmitSecond">保存</el-button>
                    </div>
                 </div>
            </div> 
        </div>
    </div>
</template>

<script>
// import $ from 'jquery' //在需要使用的页面中
export default {
     data() {
            return {
                formInline: {
                    investor: [],//投资方
                },
                investor:'',
                regionData:[],
                selObjArr:[],
                formflag:'',
                region1:[],
                region2:[],
                
            }
        },
        methods: {
            onSubmit() { //资金方 查询
                if(this.formInline.investor){
                    this.$fetch('/process/detail',{'fundCode':this.formInline.investor}).then(res => {
                        if(res.status == 200){
                            this.region1 = res.body.region1
                            this.region2 = res.body.region2
                        }
                    })
                }
                
                
            },
            regionFirst(){
                this.formflag = 'first'
                // if(this.region1.length>0){
                //     this.selObjArr = this.region1
                // }else{
                //     this.selObjArr = [];
                // }
                 this.selObjArr = []
            },
            regionSecond(){
                this.formflag = 'second'
                this.selObjArr = []
            },
            quit(){
                this.formflag = '';
                this.selObjArr = [];
            },            
            onSubmitFirst(){
                this.region1 = this.selObjArr
                this.formflag = '';
                this. selObjArr = [];
            },
            onSubmitSecond(){
                this.region2 = this.selObjArr
                this.formflag = '';
                this. selObjArr = [];
            },
            checkboxChangeFirst(vId){
                //删除
                let index = 0;
                let objDel = {};
                objDel = this.selObjArr.find((item)=>{//这里的funds就是上面遍历的数据源
                    if (item.id === vId){
                        index++
                    }
                    return item.id === vId;//筛选出匹配数据
                });
                this.selObjArr.removeByValue(objDel)
                if(!index){
                     // 添加
                    let obj = {};
                    obj = this.regionData.find((item)=>{//这里的funds就是上面遍历的数据源
                        return item.id === vId;//筛选出匹配数据
                    });
                    this.selObjArr.push(obj) 
                }

                console.log(this.selObjArr,1231231231)
 
                 
            },
            checkboxChangeSecond(vId){
                //删除
                let index = 0;
                let objDel = {};
                objDel = this.selObjArr.find((item)=>{//这里的funds就是上面遍历的数据源
                    if (item.id === vId){
                        index++
                    }
                    return item.id === vId;//筛选出匹配数据
                });
                this.selObjArr.removeByValue(objDel)
                if(!index){
                     // 添加
                    let obj = {};
                    obj = this.regionData.find((item)=>{//这里的funds就是上面遍历的数据源
                        return item.id === vId;//筛选出匹配数据
                    });
                    this.selObjArr.push(obj) 
                }

                console.log(this.selObjArr,1231231231)
 
                 
            },
            pullFn(){
                const params = {
                    'fundCode' : this.formInline.investor,
                    'region1':this.region1,
                    'region2':this.region2
                }

                this.$post('/process/edit',  params).then(res =>{
                    // console.log(res,12312312312)
                } )
            },
            getData() {
                this.$fetch('/fund-info/list')
                .then((res) => {
                    this.investor = res.body
                    console.log(this.investor,"investor")
                })
                 this.$fetch('/page/allList').then(res => {
                    this.regionData = res.body
                })
            },
        },
       
        created(){
            this.getData() 
            Array.prototype.removeByValue = function(val) {
                for(var i=0; i<this.length; i++) {
                    if(JSON.stringify(this[i]).indexOf(JSON.stringify(val))!=-1) {
                        this.splice(i, 1);
                        break;
                    }
                }
            };
            
        }
}
</script>
<style scope>
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
    .elButton{
        width:100%;
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
    .showModalBoxBg{
        width:100%;
        height:100%;
        background:rgba(0,0,0,.5);
        position: fixed;
        left:0;
        right:0;
        bottom:0;
        top:0;
    }
    .showModalBox {
        position: absolute;
        left:0;
        right:0;
        margin:auto;
        top:0;
        bottom:0;
        width:550px;
        height:600px;
    }
    .table-container-home{
        width:550px;
        height:400px;
        overflow-y:auto;
    }
    .el-button--text{
        margin-left:10px;
    }
    .showModalBox .tt{
        text-align: left;
    }
    .regionAdd{
        text-align: right;
    }
    .elButton{ 
        overflow: hidden;
        
        width:700px;
    }
    .elButton > div{
        /* height: 60px; */
        line-height: 60px;
    }
    .el-button--info.is-plain{
        width:80px;    
        overflow: hidden;
        text-overflow:ellipsis;
    }
   /* .el-icon-bottom:before {
        content: "";
        display:inline-block;
        height: 20px;
        width: 20px;
        background: url(../../../assets/img/enter.png) no-repeat;
        background-size: 100%;
    } */
</style>
