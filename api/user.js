import request from "@/utils/request.js"

export function login(data) {
  return request({
    uri: "/sys/login",
    method: "POST",
    data
  })
}

export function userFollow(data) {
  return request({
    uri: "/user/follow",
    data
  })
}

export function userArticleComment(data) {
  return request({
    uri: "/user/article/comment",
    method: "POST",
    data
  })
}

/**
 * 用户点赞
 */
export function userPraise(data) {
  return request({
    uri: '/user/praise',
    data
  });
}

/**
 * 用户收藏
 */
export function userCollect(data) {
  return request({
    uri: '/user/collect',
    data
  });
}


