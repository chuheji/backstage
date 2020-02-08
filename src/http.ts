import axios from 'axios'
import qs from 'qs'
interface http {
  get: any,
  post: any
}
const request: http = {
  get(api: string, data: object) {
    let params: any = qs.stringify(data)
    return new Promise((resolve, reject) => {
      axios.get(api, params).then((res: any) => {
        resolve(res)
      })
    })
  },
  post(api: string, data: object) {
    let params = qs.stringify(data)
    return new Promise((resolve, reject) => {
      axios.post(api, params).then((res: any) => {
        resolve(res)
      })
    })
  }
}
export default request
