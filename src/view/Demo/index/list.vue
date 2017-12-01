<template>
    <div>
        <div class="m-b-20">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/home/dashboard/list" >模板</el-breadcrumb-item>
                <el-breadcrumb-item to="/home/dashboard/list" >介绍</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="pos-rel p-t-20">
            这里是模板介绍
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                fileList: [],
                IsShow:false
            }
        },
        created() {
            _g.closeGlobalLoading()
        }
    }
</script>