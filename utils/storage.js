import { SEARCH_HISTORY_STORAGE_KEY } from "../constant/searchConstant.js"
import { USER_INFO_KEY, TOKEN_KEY } from "../constant/userConstant.js"


export function setTokenToStorage(token) {
  uni.setStorage({
    key: TOKEN_KEY,
    data: token
  })
}

export function getTokenFromStorage() {
  return uni.getStorageSync(TOKEN_KEY) || ""
}


export function setUserInfoToStorage(userInfo) {
  uni.setStorage({
    key: USER_INFO_KEY,
    data: userInfo
  })
}

export function getUserInfoFromStorage() {
  return uni.getStorageSync(USER_INFO_KEY) || {}
}




export function setSearchHistoryToStorage(history) {
  uni.setStorage({
    key: SEARCH_HISTORY_STORAGE_KEY,
    data: history
  })
}


export function getSearchHistoryFromStorage() {
  return uni.getStorageSync(SEARCH_HISTORY_STORAGE_KEY) || []
}


