<template>
    <div>
        <!-- <bread-crumb :config="config.crumb"></bread-crumb> -->

        <div>
            这里是主页介绍内容
        </div>
    </div>
</template>

<script>
import breadCrumb from 'components/Common/bread-crumb.vue'

export default {
  components: {
    breadCrumb
  },
  data() {
    return {
      config: {
        crumb: [
          {
            to: '',
            name: '系统'
          },
          {
            to: '',
            name: '后台首页'
          }
        ]
      }
    }
  },
  created() {
    _g.closeGlobalLoading()
  }
}
</script>