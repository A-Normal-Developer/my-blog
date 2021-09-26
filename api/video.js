import request from "@/utils/request.js"

export function getHotVideoList(data) {
  return request({
    uri: "/video/list",
    data
  })
}

export function getHVideoDanmuList(data) {
  return request({
    uri: "/video/danmu",
    data
  })
}


