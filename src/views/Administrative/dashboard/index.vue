<template>
    <div>
        <div>
            这里是主页介绍内容
        </div>
    </div>
</template>

<script>
export default {
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