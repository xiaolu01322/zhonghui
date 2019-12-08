<template>
    <div class="wrapper">
        <v-head></v-head>
         <div class="sidebar">
            <v-sidebar></v-sidebar>
        </div>
        <div class="content-box">
             <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import vHead from '@/components/home/common/header.vue';
    import vSidebar from '@/components/home/common/sidebar.vue'

    export default {
        components:{
            vHead,
            vSidebar
        },
        data() {
            return {
                
            }
        },
        methods: {
            
        }
    }
</script>
<style scoped>
    
</style>