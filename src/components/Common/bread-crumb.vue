<template>
    <!-- 下一步实现可修正的自动面包屑导航 () -->
    <div class="m-b-10 h-30 l-h-15 breadcrumb">
        <div class="fl">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: crumb.to }" v-for="crumb in config">{{ crumb.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="fl m-l-5">
            <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
                <el-tag class='m-l-5' size="mini" :closable="true" :type="isActive(tag.path)?'':'info'" @close='closeViewTabs(tag,$event)'>
                    {{tag.name}}
                </el-tag>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['config'],
        data() {
            return {
            }
        },
          computed: {
            visitedViews() {
              // 最多显示6个(多的折叠起来了)
              return this.$store.state.app.visitedViews.slice(-6)
            }
          },
        methods: {
        closeViewTabs(view, $event) {
          this.$store.dispatch('delVisitedViews', view).then((views) => {
            if (this.isActive(view.path)) {
              const latestView = views.slice(-1)[0]
              if (latestView) {
                this.$router.push(latestView.path)
              } else {
                this.$router.push('/')
              }
            }
          })
          $event.preventDefault()
        },
        generateRoute() {
          if (this.$route.name) {
            return this.$route
          }
          return false
        },
        addViewTabs() {
          const route = this.generateRoute()
          if (!route) {
            return false
          }
          this.$store.dispatch('addVisitedViews', this.generateRoute())
        },
        isActive(path) {
          return path === this.$route.path
        }
      },
      created() {
          this.addViewTabs()
      }
    }
</script>

<style scoped>
    .el-breadcrumb {
        font-size: 14px;
        line-height: 30px;
    }
    .breadcrumb{
        margin-top: -10px
    }
</style>