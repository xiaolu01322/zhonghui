<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo left-sidebar-menu"
       @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-folder-add"></i>
          <span>房贷业务</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/app/list">产品管理</el-menu-item>
          <el-menu-item index="/process/list">流程配置</el-menu-item>
          <el-menu-item index="/page/list">页面管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      
    </el-menu>

</template>
<script>
    export default {
        methods: {
           
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                return this.$router.push(key)
           },
        }
    }
</script>

<style>
.el-menu-item .bar-chart.el-icon-menu:before{
    content:'';
    display: inline-block;
    width:20px;
    height: 20px;
    background:url(../../../assets/img/bar-chart-grey.png);
    background-size: 100%;
    background-position: center center;
    background-repeat: no-repeat;
}
.el-menu-item.is-active .bar-chart.el-icon-menu:before{
    content:'';
    display: inline-block;
    width:20px;
    height: 20px;
    background:url(../../../assets/img/bar-chart-blue.png);
    background-size: 100%;
    background-position: center center;
    background-repeat: no-repeat;
}
.el-menu-item .dollar.el-icon-menu:before{
    content:'';
    display: inline-block;
    width:20px;
    height: 20px;
    background:url(../../../assets/img/dollar-grey.png);
    background-size: 100%;
    background-position: center center;
    background-repeat: no-repeat;
}
.el-menu-item.is-active .dollar.el-icon-menu:before{
    content:'';
    display: inline-block;
    width:20px;
    height: 20px;
    background:url(../../../assets/img/dollar-blue.png);
    background-size: 100%;
    background-position: center center;
    background-repeat: no-repeat;
}
.left-sidebar-menu .el-menu-item.is-active {
    color: #409EFF;
    border-bottom:none;
    border-left: 3px #409EFF solid;
}
.left-sidebar-menu .el-menu-item {
    border-bottom:none;
    border-left: 3px #FFFFFF solid;
}
.el-submenu.is-opened{
  background-color: #ecf5ff;
}
</style>
