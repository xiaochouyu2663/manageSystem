<template>
<el-breadcrumb separator="/">
  <el-breadcrumb-item>{{levelList[0].meta.moduleName}}</el-breadcrumb-item>
  <el-breadcrumb-item v-if="levelList[0].name !== 'dashboard'">{{ levelList[0].name }}</el-breadcrumb-item>
  <el-breadcrumb-item v-for="item in levelList[1].meta.path">{{ item }}</el-breadcrumb-item>
  <el-breadcrumb-item>{{ levelList[1].name }}</el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
