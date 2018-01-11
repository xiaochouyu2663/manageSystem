var args = process.argv.splice(2)
var fs = require('fs')
var axios = require('axios')
const apiMethods = {
  methods: {
    apiGet(url, data) {
      return new Promise((resolve, reject) => {
        axios.get(url, data).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
        })
      })
    },
    apiPost(url, data) {
      return new Promise((resolve, reject) => {
        axios.post(url, data).then((response) => {
          resolve(response.data)
        }).catch((response) => {
          resolve(response)
        })
      })
    },
    apiDelete(url, id) {
      return new Promise((resolve, reject) => {
        axios.delete(url + id).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
        })
      })
    },
    apiPut(url, id, obj) {
      return new Promise((resolve, reject) => {
        axios.put(url + id, obj).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
        })
      })
    },
    handelResponse(res, cb, errCb) {
      cb(res.data)
    },
    reAjax(url, data) {
      return new Promise((resolve, reject) => {
        axios.post(url, data).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
        })
      })
    }
  },
  computed: {
    showLoading() {
      return store.state.globalLoading
    }
  }
}

// 处理模板文件
var dealFile = function(err, TplData) {
  if (err) {
    return console.error(err)
  }
  // 获取restful风格接口数据
  let url = args[0]

  // get 方式 获取
  http.apiGet(url).then(res => {
    http.handelResponse(res, data => {
      // 遍历对象
      let filterVal = []
      let form = {}
      let formInput = ''
      let temp = {}
      for (variable in res.data.list[0]) {
        filterVal[filterVal.length] = " '" + variable + "'"
        form[variable] = null
        temp.prop = variable
        temp.label = variable
        formInput += JSON.stringify(temp) + ','
      }
      console.log(formInput)

      TplData = TplData.toString().replace(/\{\{\$baseApi\}\}/g, args[0])
      TplData = TplData.toString().replace(/\{\{\$form\}\}/g, JSON.stringify(form))
      TplData = TplData.toString().replace(/\{\{\$formInput\}\}/g, formInput)
      TplData = TplData.toString().replace(/\{\{\$filterVal\}\}/g, '[' + filterVal.join(',') + ']')

      fs.writeFile('src/views/' + args[0] + '/list.vue', TplData, function(err) {
        if (err) {
          return console.log(err)
        }
        console.log('模块成功生成, 请添加权限/菜单/路由')

        // 更新路由文件
      })
    })
  })
}

var mkdir = function (dirpath, dirname) {
  // 判断是否是第一次调用
  if (typeof dirname === 'undefined') {
    if (fs.existsSync(dirpath)) {
      return
    } else {
      mkdir(dirpath, SysPath.dirname(dirpath))
    }
  } else {
      // 判断第二个参数是否正常，避免调用时传入错误参数
    if (dirname !== SysPath.dirname(dirpath)) {
      mkdir(dirpath)
      return
    }
    if (fs.existsSync(dirname)) {
      fs.mkdirSync(dirpath)
    } else {
      mkdir(dirname, SysPath.dirname(dirname))
      fs.mkdirSync(dirpath)
    }
  }
}

axios.defaults.baseURL = 'http://framework.com'
axios.defaults.timeout = 1000 * 15
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

var http = apiMethods.methods
const path = 'src/views/' + args[0]
const res = (function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch (e) {
    return false
  }
  return true
})(path)
if (!res) {
  console.log('创建文件')
  var SysPath = require('path')
  mkdir(path)
}
// 读取并处理模板文件
fs.readFile('module/tpl/list.tpl', dealFile)
