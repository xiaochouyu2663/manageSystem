<template>
    <!-- 下一步实现可修正的自动面包屑导航 () -->
    <div class="m-b-10 h-30 l-h-15 breadcrumb">
        <div class="fl">
          <bread-path></bread-path>
        </div>
        <scroll-pane class='tags-view-container'>
          <router-link class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" :to="tag.path":key="tag.path">
             {{tag.name}}
          <span class='el-icon-close' @click='closeViewTags(tag,$event)'></span>
          </router-link>
        </scroll-pane>
    </div>
</template>

<script>
import ScrollPane from 'components/ScrollPane'
import breadPath from './bread-path.vue'
export default {
  components: { ScrollPane, breadPath },
  data() {
    return {
      tempRoute: ''
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.app.visitedViews
    }
  },
  mounted() {
    this.addViewTags()
  },
  methods: {
    closeViewTags(view, $event) {
      this.$store.dispatch('delVisitedViews', view).then(views => {
        if (this.isActive(view)) {
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
      if (this.$route.name === 'refresh') {
        return false
      }else{
        this.tempRoute = this.$route
      }
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    isActive(route) {
      return route.path === this.tempRoute.path || route.name === this.tempRoute.name
    }
  },
  watch: {
    $route() {
      this.addViewTags()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-breadcrumb {
  line-height: 2rem;
  margin-right: 10px;
}
.tags-view-container {
  background: #fff;
  height: 34px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    height: 22px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
.tags-view-container {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
