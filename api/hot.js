import request from "@/utils/request.js"

export function getHotTabs() {
  return request({
    uri: "/hot/tabs"
  })
}

export function getHotListByTab(type) {
  return request({
    uri: "/hot/list",
    data: {
      type
    }
  })
}