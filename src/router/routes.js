import Login from '../views/Login'
import Dashboard from '../views/Administrative/dashboard/index.vue'
import refresh from '../views/layout/refresh.vue'
import Home from '../views/layout/Home.vue'
import menuList from '../views/Administrative/system/menu/list.vue'
import menuAdd from '../views/Administrative/system/menu/add.vue'
import menuEdit from '../views/Administrative/system/menu/edit.vue'
import systemConfig from '../views/Administrative/system/config/add.vue'
import ruleList from '../views/Administrative/system/rule/list.vue'
import ruleAdd from '../views/Administrative/system/rule/add.vue'
import ruleEdit from '../views/Administrative/system/rule/edit.vue'
import positionList from '../views/Administrative/structures/position/list.vue'
import positionAdd from '../views/Administrative/structures/position/add.vue'
import positionEdit from '../views/Administrative/structures/position/edit.vue'
import structuresList from '../views/Administrative/structures/structures/list.vue'
import structuresAdd from '../views/Administrative/structures/structures/add.vue'
import structuresEdit from '../views/Administrative/structures/structures/edit.vue'
import groupsAdd from '../views/Administrative/structures/groups/add.vue'
import groupsEdit from '../views/Administrative/structures/groups/edit.vue'
import groupsList from '../views/Administrative/structures/groups/list.vue'
import usersList from '../views/Administrative/accounts/admin/list.vue'
import usersAdd from '../views/Administrative/accounts/admin/add.vue'
import usersEdit from '../views/Administrative/accounts/admin/edit.vue'
import usersLog from '../views/Administrative/accounts/admin/log.vue'
import DbList from '../views/Administrative/system/Db/list.vue'
import signlogList from '../views/Administrative/system/signlog/list.vue'
import DemoList from '../views/Demo/index/list.vue'
import tableList from '../views/Demo/table/list.vue'
import tableExp from '../views/Demo/table/exp.vue'
import editorList from '../views/Demo/editor/list.vue'
import editorExplain from '../views/Demo/editor/exp.vue'
import uploadList from '../views/Demo/upload/list.vue'
import uploadExp from '../views/Demo/upload/exp.vue'
import formList from '../views/Demo/form/list.vue'
import formExp from '../views/Demo/form/exp.vue'
import excelList from '../views/Demo/excel/list.vue'
import excelExp from '../views/Demo/excel/exp.vue'
import iconsList from '../views/Demo/icons/list.vue'
import iconsExp from '../views/Demo/icons/exp.vue'
import Error from '../views/Error/404.vue'
import chartsList from '../views/Demo/charts/list.vue'
import chartsLine from '../views/Demo/charts/line.vue'
import chartsMix from '../views/Demo/charts/mix.vue'

/**
 * meta参数解析
 * hideLeft: 是否隐藏左侧菜单，单页菜单为true
 * module: 菜单所属模块
 * menu: 所属菜单，用于判断三级菜单是否显示高亮，如菜单列表、添加菜单、编辑菜单都是'menu'，用户列表、添加用户、编辑用户都是'user'，如此类推
 */

const routes = [
  {
    path: '/',
    redirect: '/home/dashboard/list'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [{ path: '/refresh', component: refresh, name: 'refresh' }]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'dashboard/list',
        component: Dashboard,
        name: '首页',
        meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'menu/list',
        component: menuList,
        name: '菜单管理',
        meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }
      },
      {
        path: 'menu/add',
        component: menuAdd,
        name: '添加菜单',
        meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }
      },
      {
        path: 'menu/edit/:id',
        component: menuEdit,
        name: '编辑菜单',
        meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'config/add',
        component: systemConfig,
        name: '系统参数',
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'systemConfig'
        }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'rule/list',
        component: ruleList,
        name: '权限规则',
        meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }
      },
      {
        path: 'rule/add',
        component: ruleAdd,
        name: '添加权限',
        meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }
      },
      {
        path: 'rule/edit/:id',
        component: ruleEdit,
        name: '编辑权限',
        meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'position/list',
        component: positionList,
        name: '岗位管理',
        meta: { hideLeft: false, module: 'Administrative', menu: 'position' }
      },
      {
        path: 'position/add',
        component: positionAdd,
        name: '添加岗位',
        meta: { hideLeft: false, module: 'Administrative', menu: 'position' }
      },
      {
        path: 'position/edit/:id',
        component: positionEdit,
        name: '编辑岗位',
        meta: { hideLeft: false, module: 'Administrative', menu: 'position' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'structures/list',
        component: structuresList,
        name: 'structuresList',
        meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }
      },
      {
        path: 'structures/add',
        component: structuresAdd,
        name: 'structuresAdd',
        meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }
      },
      {
        path: 'structures/edit/:id',
        component: structuresEdit,
        name: 'structuresEdit',
        meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'groups/list',
        component: groupsList,
        name: '角色管理',
        meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }
      },
      {
        path: 'groups/add',
        component: groupsAdd,
        name: '添加角色',
        meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }
      },
      {
        path: 'groups/edit/:id',
        component: groupsEdit,
        name: '编辑角色',
        meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'users/list',
        component: usersList,
        name: '账户列表',
        meta: { hideLeft: false, module: 'Administrative', menu: 'users' }
      },
      {
        path: 'users/add',
        component: usersAdd,
        name: '添加账户',
        meta: { hideLeft: false, module: 'Administrative', menu: 'users' }
      },
      {
        path: 'users/edit/:id',
        component: usersEdit,
        name: '编辑账户',
        meta: { hideLeft: false, module: 'Administrative', menu: 'users' }
      },
      {
        path: 'users/Log/:id',
        component: usersLog,
        name: '账户日志',
        meta: { hideLeft: false, module: 'Administrative', menu: 'users' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'Db/list',
        component: DbList,
        name: '数据备份',
        meta: { hideLeft: false, module: 'Administrative', menu: 'Db' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'signlog/list',
        component: signlogList,
        name: '登陆日志',
        meta: { hideLeft: false, module: 'Administrative', menu: 'signlog' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'table/list',
        component: tableList,
        name: 'tableList',
        meta: { hideLeft: false, module: 'Demo', menu: 'table' }
      },
      {
        path: 'table/exp',
        component: tableExp,
        name: 'tableExp',
        meta: { hideLeft: false, module: 'Demo', menu: 'table' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'Demo/list',
        component: DemoList,
        name: 'DemoList',
        meta: { hideLeft: false, module: 'Demo', menu: 'demo' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'editor/list',
        component: editorList,
        name: 'editorList',
        meta: { hideLeft: false, module: 'Demo', menu: 'editor' }
      },
      {
        path: 'editor/explain',
        component: editorExplain,
        name: 'editorExplain',
        meta: { hideLeft: false, module: 'Demo', menu: 'editor' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'upload/list',
        component: uploadList,
        name: 'uploadList',
        meta: { hideLeft: false, module: 'Demo', menu: 'upload' }
      },
      {
        path: 'upload/exp',
        component: uploadExp,
        name: 'uploadExp',
        meta: { hideLeft: false, module: 'Demo', menu: 'upload' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'form/list',
        component: formList,
        name: 'formList',
        meta: { hideLeft: false, module: 'Demo', menu: 'form' }
      },
      {
        path: 'form/exp',
        component: formExp,
        name: 'formExp',
        meta: { hideLeft: false, module: 'Demo', menu: 'form' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'excel/list',
        component: excelList,
        name: 'excelList',
        meta: { hideLeft: false, module: 'Demo', menu: 'excel' }
      },
      {
        path: 'excel/exp',
        component: excelExp,
        name: 'excelExp',
        meta: { hideLeft: false, module: 'Demo', menu: 'excel' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'icons/list',
        component: iconsList,
        name: 'iconsList',
        meta: { hideLeft: false, module: 'Demo', menu: 'icons' }
      },
      {
        path: 'icons/exp',
        component: iconsExp,
        name: 'iconsExp',
        meta: { hideLeft: false, module: 'Demo', menu: 'icons' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'charts/list',
        component: chartsList,
        name: 'chartsList',
        meta: { hideLeft: false, module: 'Demo', menu: 'charts' }
      },
      {
        path: 'charts/line',
        component: chartsLine,
        name: 'chartsLine',
        meta: { hideLeft: false, module: 'Demo', menu: 'charts' }
      },
      {
        path: 'charts/mix',
        component: chartsMix,
        name: 'chartsMix',
        meta: { hideLeft: false, module: 'Demo', menu: 'charts' }
      }
    ]
  },
  {
    path: '*',
    component: Error
  }
]
export default routes
