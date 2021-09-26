import request from "@/utils/request.js"

export function getArticleDetail(data) {
  return request({
    uri: "/article/details",
    data
  })
}

export function getArticleCommentList(data) {
  return request({
    uri: "/article/comment/list",
    data
  })
}
