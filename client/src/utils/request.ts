import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios"
import apiConfig from "../configs/apiConfig"

export interface RequestResponse<T = any> extends AxiosResponse<T> {
  message: string
}
export interface RequestInstance {
  get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<RequestResponse<T>>
  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<RequestResponse<T>>
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<RequestResponse<T>>
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<RequestResponse<T>>
}

class Request implements RequestInstance {
  private _instance: AxiosInstance
  constructor(baseURL: string) {
    this._instance = axios.create({
      baseURL,
      timeout: 1000,
      withCredentials: true,
    })
    this._instance.interceptors.response.use((response) => {
      return {
        ...response,
        data: response.data.data,
        message: response.data.message,
      }
    }, this._handleErrorResponse)
  }

  private _handleErrorResponse = (error: AxiosError) => {
    return Promise.reject(error)
  }
  public get = <T>(url: string, config?: AxiosRequestConfig) =>
    this._instance.get(url, config) as Promise<RequestResponse<T>>
  public post = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    this._instance.post(url, data, config) as Promise<RequestResponse<T>>
  public put = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    this._instance.put(url, data, config) as Promise<RequestResponse<T>>
  public delete = <T>(url: string, config?: AxiosRequestConfig) =>
    this._instance.delete(url, config) as Promise<RequestResponse<T>>
}

export default Request
if (!apiConfig.PUBLIC_API_BASE_URL) {
  console.error('Public API base url is missing')
}
if (!apiConfig.INTERNAL_API_BASE_URL) {
  console.error('Internal API base url is missing')
}
export const publicRequest = new Request(apiConfig.PUBLIC_API_BASE_URL || '')
export const internaRequest = new Request(apiConfig.INTERNAL_API_BASE_URL || '')
