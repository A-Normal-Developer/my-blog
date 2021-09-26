import request from "@/utils/request.js"

export function getDefaultText() {
  return request({
    uri: "/search/default-text"
  })
}


export function getSearchResult(data) {
  return request({
    uri: "/search",
    data
  })
}

/**
 * 此接口存在问题  所以数据写死(原接口 /search/hot-list)
 */
export function getSearchHotList() {
  const list = [
    {
      id: "7",
      label: "跟我刘华强拼 你有这个实力吗"
    },
    {
      id: "0",
      label: "肥宅之路"
    },
    {
      id: "1",
      label: "盗版 暴打了资本"
    },
    {
      id: "2",
      label: "每天一个离职小技巧"
    },
    {
      id: "3",
      label: "vuejs从入门到放弃"
    },
    {
      id: "4",
      label: "重学前端"
    },
    {
      id: "5",
      label: "react从入门到放弃"
    },
    {
      id: "6",
      label: "盲仔最帅回旋踢"
    },
    {
      id: "8",
      label: "生异性嘛 你们哥...哥俩"
    },
  ]
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(list)
    }, 200)
  })
}