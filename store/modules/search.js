import { SEARCH_HISTORY_MAX } from "../../constant/searchConstant.js"
import { setSearchHistoryToStorage, getSearchHistoryFromStorage } from "../../utils/storage.js"

export default {
  namespaced: true,
  state: () => ({
    searchHistoryData: getSearchHistoryFromStorage()
  }),
  mutations: {
    
    addSearchHistory(state, value) {
      if(!value) return
      const index = state.searchHistoryData.findIndex(item => item === value)
      if(index !== -1) {
        state.searchHistoryData.splice(index, 1)
      }
      state.searchHistoryData.unshift(value)
      
      if(state.searchHistoryData.length > SEARCH_HISTORY_MAX) {
        state.searchHistoryData.splice(SEARCH_HISTORY_MAX, state.searchHistoryData.length - SEARCH_HISTORY_MAX)
      }
      
      setSearchHistoryToStorage(state.searchHistoryData)
    },
    
    removeSingleSearchHistory(state, index) {
      state.searchHistoryData.splice(index, 1)
      setSearchHistoryToStorage(state.searchHistoryData)
    },
    
    clearAllSearchHistory(state) {
      state.searchHistoryData = []
      setSearchHistoryToStorage(state.searchHistoryData)
    },
    
  }
}