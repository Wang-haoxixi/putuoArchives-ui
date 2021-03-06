import {
  login,
  logout,
  getInfo,
  // qrCodeLogin
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    userId: '',
    roles: [],
    permissions: [],
    currentWorkbench: {},
    deptList: undefined,
    roleList: undefined,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_USER_ID: (state,userId) =>{
      state.userId = userId
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_CURRENT_WORKBENCH: (state, currentWorkbench) => {
      state.currentWorkbench = currentWorkbench
    },
    SET_DEPT_LIST: (state, deptList) => {
      state.deptList = deptList
    },
    SET_ROLE_LIST: (state, roleList) => {
      state.roleList = roleList
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      let loginObj ={
         username : userInfo.username.trim(),
       password : userInfo.password,
      code : userInfo.code,
      uuid : userInfo.uuid,
      loginType: "VERIFICATION_CODE",
      }
      return new Promise((resolve, reject) => {
        login(loginObj).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 扫码登录
    QrCodeLogin({
      commit
    }, code) {
      return new Promise((resolve, reject) => {
        const codeObj = {
          loginType: "DD_SCAN_CODE",
          code: code
        };
        login(codeObj).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 自动登录
    autoLogin({
      commit
    }, code) {
      return new Promise((resolve, reject) => {
        const codeObj = {
          loginType: "DD_PASSWORD_FREE_LOGIN",
          code: code
        };
        login(codeObj).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          const avatar = user.avatarUrl == "" ? require("@/assets/images/profile.jpg") : user.avatarUrl;
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_CURRENT_WORKBENCH', res.workbench.currentWorkbench)
          commit('SET_DEPT_LIST', res.workbench.deptList)
          commit('SET_ROLE_LIST', res.workbench.roleList)
          commit('SET_NAME', user.nickName)
          commit('SET_USER_ID', user.userId)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
