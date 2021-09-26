import store from "../store"
const BASE_URL = "https://api.imooc-blog.lgdsunday.club/api"


export default function request({ uri, method, data }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + uri,
      method,
      data,
      header: {
        Authorization: store.state.user.token
      },
      success({ data, header, statusCode }) {
        if(data.success) {
          resolve(data)
        } else {
          uni.showToast({
            title: data.message,
            icon: "none",
            mask: true,
            duration: 3000
          })
          
          reject(data.message)
          
        }
      },
      fail({ error }) {
        reject(error)
      },
      complete() {
        uni.hideLoading()
      }
      
    })
  })
}