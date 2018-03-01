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

/**新增固定资产 sherry*/
import newguding from '../views/Administrative/guding/newguding.vue'
import gudingdetail from '../views/Administrative/guding/gudingdetail.vue'
import gudingchart from '../views/Administrative/guding/gudingchart.vue'
/**
 * meta参数解析
 * hideLeft: 是 否隐藏左侧菜单，单页菜单为true
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
    name: 'dashboard',
    meta: { moduleName: '系统' },
    children: [
      {
        path: 'dashboard/list',
        component: Dashboard,
        name: '后台首页',
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'menu',
          path: []
        }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    name: '系统配置',
    meta: { moduleName: '系统' },
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
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'menu',
          path: ['菜单管理']
        }
      },
      {
        path: 'menu/edit/:id',
        component: menuEdit,
        name: '编辑菜单',
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'menu',
          path: ['菜单管理']
        }
      },
      {
        path: 'Db/list',
        component: DbList,
        name: '数据备份',
        meta: { hideLeft: false, module: 'Administrative', menu: 'Db' }
      },
      {
        path: 'config/add',
        component: systemConfig,
        name: '系统参数',
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'systemConfig'
        }
      },
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
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'rule',
          path: ['权限规则']
        }
      },
      {
        path: 'rule/edit/:id',
        component: ruleEdit,
        name: '编辑权限',
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'rule',
          path: ['权限规则']
        }
      },
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
    name: '组织架构',
    meta: { moduleName: '系统' },
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
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'position',
          path: ['岗位管理']
        }
      },
      {
        path: 'position/edit/:id',
        component: positionEdit,
        name: '编辑岗位',
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'position',
          path: ['岗位管理']
        }
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
    name: '组织架构',
    meta: { moduleName: '系统' },
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
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'groups',
          path: ['角色管理']
        }
      },
      {
        path: 'groups/edit/:id',
        component: groupsEdit,
        name: '编辑角色',
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'groups',
          path: ['角色管理']
        }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    name: '账户管理',
    meta: { moduleName: '系统' },
    children: [
      {
        path: 'users/list',
        component: usersList,
        name: '管 理 员',
        meta: { hideLeft: false, module: 'Administrative', menu: 'users' }
      },
      {
        path: 'users/add',
        component: usersAdd,
        name: '添加账户',
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'users',
          path: ['管 理 员']
        }
      },
      {
        path: 'users/edit/:id',
        component: usersEdit,
        name: '编辑账户',
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'users',
          path: ['管 理 员']
        }
      },
      {
        path: 'users/Log/:id',
        component: usersLog,
        name: '账户日志',
        meta: {
          hideLeft: false,
          module: 'Administrative',
          menu: 'users',
          path: ['管 理 员']
        }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    name: '表格',
    meta: { moduleName: '模板' },
    children: [
      {
        path: 'table/list',
        component: tableList,
        name: '表格展示',
        meta: { hideLeft: false, module: 'Demo', menu: 'table' }
      },
      {
        path: 'table/exp',
        component: tableExp,
        name: '表格说明',
        meta: { hideLeft: false, module: 'Demo', menu: 'table' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    name: 'dashboard',
    meta: { moduleName: '模板' },
    children: [
      {
        path: 'Demo/list',
        component: DemoList,
        name: '介绍',
        meta: { hideLeft: false, module: 'Demo', menu: 'demo' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    name: '编辑器',
    meta: { moduleName: '模板' },
    children: [
      {
        path: 'editor/list',
        component: editorList,
        name: '编辑器说明',
        meta: { hideLeft: false, module: 'Demo', menu: 'editor' }
      },
      {
        path: 'editor/explain',
        component: editorExplain,
        name: '编辑器效果',
        meta: { hideLeft: false, module: 'Demo', menu: 'editor' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    name: '上传',
    meta: { moduleName: '模板' },
    children: [
      {
        path: 'upload/list',
        component: uploadList,
        name: '上传效果',
        meta: { hideLeft: false, module: 'Demo', menu: 'upload' }
      },
      {
        path: 'upload/exp',
        component: uploadExp,
        name: '上传说明',
        meta: { hideLeft: false, module: 'Demo', menu: 'upload' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    name: '表单',
    meta: { moduleName: '模板' },
    children: [
      {
        path: 'form/list',
        component: formList,
        name: '表单效果',
        meta: { hideLeft: false, module: 'Demo', menu: 'form' }
      },
      {
        path: 'form/exp',
        component: formExp,
        name: '表单说明',
        meta: { hideLeft: false, module: 'Demo', menu: 'form' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    name: 'Excel',
    meta: { moduleName: '模板' },
    children: [
      {
        path: 'excel/list',
        component: excelList,
        name: 'Excel效果',
        meta: { hideLeft: false, module: 'Demo', menu: 'excel' }
      },
      {
        path: 'excel/exp',
        component: excelExp,
        name: 'Excel说明',
        meta: { hideLeft: false, module: 'Demo', menu: 'excel' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    name: 'Icons',
    meta: { moduleName: '模板' },
    children: [
      {
        path: 'icons/list',
        component: iconsList,
        name: 'Icons效果',
        meta: { hideLeft: false, module: 'Demo', menu: 'icons' }
      },
      {
        path: 'icons/exp',
        component: iconsExp,
        name: 'Icons说明',
        meta: { hideLeft: false, module: 'Demo', menu: 'icons' }
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    name: '图表',
    meta: { moduleName: '模板' },
    children: [
      {
        path: 'charts/list',
        component: chartsList,
        name: '图表效果',
        meta: { hideLeft: false, module: 'Demo', menu: 'charts' }
      },
      {
        path: 'charts/line',
        component: chartsLine,
        name: '图表说明',
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
  },
  {
    path:'/home',
    component: Home,
    name: '固定资产',
    meta: { moduleName: '系统' },
    children: [
      {
        path: 'guding/newguding',
        component: newguding,
        name: '新增固定资产',
        meta: { hideLeft: false, module: 'Administrative', menu: 'position' }
      },
      {
        path: 'guding/gudingdetail',
        component: gudingdetail,
        name: '固定资产明细',
        meta: { hideLeft: false, module: 'Administrative', menu: 'position' }
      },
      {
        path: 'guding/gudingchart',
        component: gudingchart,
        name: '固定资产图表',
        meta: { hideLeft: false, module: 'Administrative', menu: 'position' }
      }
    ]
  }
]
export default routes
