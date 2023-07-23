import axios from 'axios'
import { parseCookies } from 'nookies'
import authConfig from 'src/configs/auth'
import { getCookie } from 'cookies-next'

const token = getCookie('token')

const AxiosSetting = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: { token }
})

AxiosSetting.interceptors.response.use(
  response => response
)

export default AxiosSetting
