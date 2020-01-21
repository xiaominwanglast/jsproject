import HttpRequest from '@/lib/axios'
import {baseURL_DEVOPS} from '@/config'
import {baseURL_TMT} from '@/config'

const axios = new HttpRequest()
export const axios_tmt = new HttpRequest(baseURL_TMT)
export default axios

export const axios_devops = new HttpRequest(baseURL_DEVOPS)

