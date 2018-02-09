<template>
  <div class="panel">
    <div class="panel-top">
      <el-row>
        <el-col :span="4">
          <!--<template v-if="logo_type == '1'">-->
            <!--<img :src="img" class="logo">-->
          <!--</template>-->
          <!--<template v-else>-->
            <span class="p-l-20">{{title}}</span>
          <!--</template>-->
        </el-col>
        <el-col :span="18" class="ofv-hd">
          <div class="fl p-l-20 p-r-20 top-menu" :class="{'top-active': menu.selected}" v-for="menu in topMenu" @click="switchTopMenu(menu)">{{menu.title}}</div>
        </el-col>
        <el-col :span="2" class="pos-rel">
         
          <el-dropdown @command="handleMenu" class="user-menu">
            
            <div class="fr" >
              <icon class="admin-icon" name="admin" style="width:20px;height:20px;margin-top:20px"></icon>            
            </div>
            <span class="el-dropdown-link c-gra" style="cursor: pointer">
              {{username}}&nbsp;&nbsp;    
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
           <el-tooltip class="item" effect="dark" :content="screenMsg" placement="bottom">
            <a href="javascript:;" @click="screenfull" class="icon-top-bar">
              <icon class="icon-screenfull" name="screenfull"></icon>           
            </a>
          </el-tooltip>
        </el-col>
      </el-row>
    </div>
    <div style="width:1200px;margin:0 auto;">
      <el-col :span="24" class="panel-center">
        <!--<el-col :span="4">-->
        <aside class="w-180 ovf-hd" v-show="!showLeftMenu">
          <leftMenu :menuData="menuData" :menu="menu" ref="leftMenu" :isCollapse="isCollapse"></leftMenu>
        </aside>
        <section class="panel-c-c" :class="{'hide-leftMenu': hasChildMenu}">
          <div class="grid-content bg-purple-light">
            <el-col :span="24">
              <!-- 面包屑 -->
                <bread-crumb></bread-crumb>
                <transition name="fade" mode="out-in">
                <router-view v-loading="showLoading"></router-view>
                </transition>
            </el-col>
          </div>
        </section>
      </el-col>
    </div>
      

      <changePwd ref="changePwd"></changePwd>
  </div>
</template>

<script>
import leftMenu from './leftMenu.vue'
import changePwd from './changePwd.vue'
import http from 'assets/js/http'
import breadCrumb from 'components/Common/bread-crumb.vue'
import screenfull from 'screenfull'

export default {
  data() {
    return {
      screenMsg: '全屏',
      isCollapse: false,
      username: '',
      topMenu: [],
      childMenu: [],
      menuData: [],
      hasChildMenu: false,
      menu: null,
      module: null,
      img: '',
      title: '',
      logo_type: null
    }
  },
  methods: {
    screenfull() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      if (this.screenMsg === '全屏') {
        this.screenMsg = '恢复'
      } else {
        this.screenMsg = '全屏'
      }
      screenfull.toggle()
    },
    logout() {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          _g.openGlobalLoading()
          let data = {
            authkey: Lockr.get('authKey'),
            sessionId: Lockr.get('sessionId')
          }
          this.apiPost('admin/base/logout', data).then(res => {
            _g.closeGlobalLoading()
            this.handelResponse(res, data => {
              Lockr.rm('menus')
              Lockr.rm('authKey')
              Lockr.rm('rememberKey')
              Lockr.rm('authList')
              Lockr.rm('userInfo')
              Lockr.rm('sessionId')
              Cookies.remove('rememberPwd')
              _g.toastMsg('success', '退出成功')
              router.replace('/login')
            })
          })
        })
        .catch(() => {})
    },
    switchTopMenu(item) {
      if (item.child[0].url === '') {
        router.push(item.child[0].child[0].url)
      } else {
        item.child[0].url
        router.push(item.child[0].url)
      }
    },
    handleMenu(val) {
      switch (val) {
        case 'logout':
          this.logout()
          break
        case 'changePwd':
          this.changePwd()
          break
      }
    },
    changePwd() {
      this.$refs.changePwd.open()
    },
    getTitleAndLogo() {
      this.apiPost('admin/base/getConfigs').then(res => {
        this.handelResponse(res, data => {
          document.title = data.SYSTEM_NAME
          this.logo_type = data.LOGO_TYPE
          this.title = data.SYSTEM_NAME
          this.img = window.HOST + data.SYSTEM_LOGO
        })
      })
    },
    getUsername() {
      this.username = Lockr.get('userInfo').username
    }
  },
  created() {
    this.getTitleAndLogo()
    let authKey = Lockr.get('authKey')
    let sessionId = Lockr.get('sessionId')
    if (!authKey || !sessionId) {
      _g.toastMsg('warning', '您尚未登录')
      router.replace('/login')
      return
    }
    this.getUsername()
    let menus = Lockr.get('menus')
    this.menu = this.$route.meta.menu
    this.module = this.$route.meta.module
    this.topMenu = menus
    _(menus).forEach(res => {
      if (res.module === this.module) {
        this.menuData = res.child
        res.selected = true
      } else {
        res.selected = false
      }
    })
  },
  computed: {
    routerShow() {
      return store.state.routerShow
    },
    showLeftMenu() {
      this.hasChildMenu = store.state.showLeftMenu
      return store.state.showLeftMenu
    }
  },
  components: {
    leftMenu,
    changePwd,
    breadCrumb
  },
  watch: {
    $route(to, from) {
      _(this.topMenu).forEach(res => {
        if (res.module === to.meta.module) {
          res.selected = true
          if (!to.meta.hideLeft) {
            this.menu = to.meta.menu
            this.menuData = res.child
          }
        } else {
          res.selected = false
        }
      })
    }
  },
  mixins: [http]
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.icon-top-bar {
  color: white;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.panel {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.panel-top {
  min-width: 1200px;
  height: 60px;
  line-height: 60px;
  background: #409EFF;
  color: white;
}
.panel-top .el-row {
  width: 1200px;
  margin: 0 auto;
}
.panel-top hover{
  height: 60px;
  line-height: 60px;
  background: #ededed;
  color:#409EFF;
}

.panel-center {

  position: relative;
  bottom: 0px;
  width: 1200px;
  overflow: hidden;
}

.panel-c-c {
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  left: 180px;
  width: 980px;
  overflow-y: scroll;
  padding: 20px;
}
.panel-c-c::-webkit-scrollbar {display:none}
.logout {
  background: url(../../assets/images/logout_36.png);
  background-size: contain;
  width: 20px;
  height: 20px;
  float: left;
}

.logo {
  width: 150px;
  float: left;
  margin: 10px 10px 10px 18px;
}

.tip-logout {
  float: right;
  margin-right: 20px;
  padding-top: 5px;
  cursor: pointer;
}

.admin {
  color: #c0ccda;
  text-align: center;
}
.hide-leftMenu {
  left: 0px;
}

.el-menu-item.is-active{
  background-color:rgb(210, 210, 210)!important;
}
.user-menu {
  position: static!important;
}
</style>