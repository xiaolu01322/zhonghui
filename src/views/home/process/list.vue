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
                    <el-table :data="regionData1" border class="table table-container-home" >
                        <el-table-column label="选择" align="center" width="100" >
                            <template slot-scope="scope">
                                <el-checkbox label="选择" v-model="scope.row.selected" @change="checkboxChangeFirst(scope.row.id)"></el-checkbox>
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
                    <el-table :data="regionData2" border class="table table-container-home" >
                        <el-table-column label="选择" align="center" width="100" >
                            <template slot-scope="scope">
                                <el-checkbox label="选择" v-model="scope.row.selected" @change="checkboxChangeSecond(scope.row.id)"></el-checkbox>
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
                regionData1:[],
                regionData2:[],
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
                if(!this.formInline.investor){
                    this.$message.error('请先选择资金方');
                    return;
                }
                this.formflag = 'first';
                this.selObjArr = [];
                this.selObjArr2 = [];
                for(var i=0; i<this.region1.length;i++){
                for(var j=0;j<this.regionData1.length;j++){
                    if(this.region1[i].id == this.regionData1[j].id){
                        this.regionData1[j].selected = true
                        this.selObjArr.push(this.regionData1[j]) 
                    }
                    
                }
                }
            },
            regionSecond(){
                if(!this.formInline.investor){
                    this.$message.error('请先选择资金方');
                    return;
                }
                this.formflag = 'second';
                this.selObjArr2 = [];
                this.selObjArr = [];
                for(var i=0; i<this.region2.length;i++){
                for(var j=0;j<this.regionData2.length;j++){
                    if(this.region2[i].id == this.regionData2[j].id){
                        this.regionData2[j].selected = true
                        this.selObjArr2.push(this.regionData2[j]) 
                    }
                    
                }
                }
                
            },
            quit(){
                this.formflag = '';
                this.selObjArr = [];
            },            
            onSubmitFirst(){
                this.region1 = this.selObjArr
                this.formflag = '';
                this.selObjArr = [];
            },
            onSubmitSecond(){
                this.region2 = this.selObjArr2
                this.formflag = '';
                this.selObjArr2 = [];
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
                
                //更新视图
                 this.checkData(this.selObjArr,this.regionData1)
                 
                //  // 添加
                if(!index){
                     
                    let obj = {};         
                    obj = this.regionData1.find((item)=>{//这里的regionData1就是上面遍历的数据源
                        return item.id === vId;//筛选出匹配数据
                    });
                    this.selObjArr.push(obj) 
                     //更新视图
                    this.checkData(this.selObjArr,this.regionData1)
                }
                 
            },
            checkboxChangeSecond(vId){
                 //删除
                let index = 0;
                let objDel = {};
                objDel = this.selObjArr2.find((item)=>{//这里的selObjArr2就是上面遍历的数据源
                    if (item.id === vId){
                        index++
                    }
                    return item.id === vId;//筛选出匹配数据
                });
                this.selObjArr2.removeByValue(objDel)
                
                //更新视图
                 this.checkData(this.selObjArr2,this.regionData2)
                 
                //  // 添加
                if(!index){
                     
                    let obj = {};         
                    obj = this.regionData2.find((item)=>{//这里的regionData2就是上面遍历的数据源
                        return item.id === vId;//筛选出匹配数据
                    });
                    this.selObjArr2.push(obj) 
                     //更新视图
                    this.checkData(this.selObjArr2,this.regionData2)
                }   
                 
            },
            checkData(selArr,allArr){
                for(var j=0;j<allArr.length;j++){        
                    allArr[j].selected = false
                    this.$set(allArr, j, allArr[j]) 
                }
               for(var i=0; i<selArr.length;i++){
                    for(var j=0;j<allArr.length;j++){
                        if(selArr[i].id == allArr[j].id){
                            allArr[j].selected = true
                        }
                        this.$set(allArr, j, allArr[j])  
                    }
                 }
            },
            pullFn(){
                const params = {
                    'fundCode':this.formInline.investor,
                    'region1':this.region1,
                    'region2':this.region2
                }

                this.$post('/process/edit',  params).then(res =>{
                    this.$message.success("提交成功");
                } )
            },
            getData() { 
                //获取资金方
                this.$fetch('/fund-info/list')
                .then((res) => {
                    this.investor = res.body
                })
                //获取所有列表  由于数组是引用地址所以 需要重复请求分开赋值
                this.$fetch('/page/allList').then(res => {
                    this.regionData1 = res.body
                })
                this.$fetch('/page/allList').then(res => {
                    this.regionData2 = res.body
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
