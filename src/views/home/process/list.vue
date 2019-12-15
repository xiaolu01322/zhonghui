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
                <div>
                   <el-row class="odd">
                       <div>
                           <span>预约下户</span>    
                       </div>
                   </el-row>
                    <el-row class="even">
                       <div>
                           <span>预约下户</span>    
                       </div>
                   </el-row>
                </div>
                    
            </div>  
            <div class="showModalBoxBg first" v-if="formflag == 'first'">
                 <div class="showModalBox">
                    <el-table :data="regionData" border class="table table-container-home" >
                        <el-table-column label="选择" align="center" width="100" >
                            <template slot-scope="scope">
                                <el-checkbox label="选择" @change="checkboxChange(scope.row.id)"></el-checkbox>
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
                                <el-checkbox label="选择" @change="checkboxChange(scope.row.id)"></el-checkbox>
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
            onSubmit() {
                if(this.formInline.investor){
                    this.$fetch('/process/detail',{'fundCode':this.formInline.investor}).then(res => {
                        // console.log(res,2123123)
                    })
                }
                
                
            },
            regionFirst(){
                this.formflag = 'first'
                this.selObjArr=[];
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
            checkboxChange(vId){
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
                    
                   console.log(res,12312312312)
                } )
            },
            getData() {
                this.$fetch('/fund-info/list')
                    .then((res) => {
                        this.investor = res.body
                        console.log(this.investor)
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
</style>
