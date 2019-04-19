import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getName, setName, removeName } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: getName(),
    avatar: '',
    roles: [],
    code:'',
    money:0,
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
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_MONRY: (state, money) => {
      state.money = money
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username,userInfo.password).then(response => {
          setToken('555')
          setName(username)
          commit('SET_TOKEN', '555')
          commit('SET_NAME', username)
          resolve(response);
        }).catch(error => {
          reject(error)
        });
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.name).then(response => {
          commit('SET_CODE', response.data.code);
          commit('SET_MONRY', response.data.money);
          resolve(response);
        }).catch(error => {
          reject(error)
        });
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        removeName()
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
        removeName()
      })
    }
  }
}

export default user
