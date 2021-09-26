import { login } from "../../api/user.js"
import { 
  setTokenToStorage, 
  getTokenFromStorage, 
  setUserInfoToStorage, 
  getUserInfoFromStorage 
} from "../../utils/storage.js"

export default {
  namespaced: true,
  state: () => ({
    token: getTokenFromStorage(),
    userInfo: getUserInfoFromStorage()
  }),

  mutations: {
    setToken(state, token) {
      state.token = token
      setTokenToStorage(state.token)
    },
    
    resetToken(state) {
      state.token = ""
      setTokenToStorage(state.token)
    },
    
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setUserInfoToStorage(state.userInfo)
    },
    
    resetUserInfo(state) {
      state.userInfo = {}
      setUserInfoToStorage(state.userInfo)
    }
    
    
  },
  
  actions: {
    async login({ commit, state }, { signature, iv, userInfo }) {
      const { data } = await login({
        signature,
        iv,
        nickName: userInfo.nickName,
        gender: userInfo.gender,
        city: userInfo.city,
        province: userInfo.province,
        avatarUrl: userInfo.avatarUrl,
      })
      
      commit("setToken", data.token)
      commit("setUserInfo", userInfo)
      
      
    },
    
    logout({ commit }) {
      commit("resetToken")
      commit("resetUserInfo")
    },
    
    async isLogin({ state }) {
      if(state.token) return true
      const [error, { confirm, cancel }] = await uni.showModal({
        title: "当前处于未登录状态",
        content: "是否跳转至登录页面? (登录后会自动返回当前页面哦~)"
      })
      
      if(confirm) {
        uni.navigateTo({
          url: "/subpkg/pages/login-page/login-page"
        })
      }
      return false
      
    }
    
  }
}