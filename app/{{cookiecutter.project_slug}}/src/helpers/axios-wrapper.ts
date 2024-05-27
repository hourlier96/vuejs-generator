import { APISettings } from '@/api/config.ts'
import axios from 'axios'

const axiosInstance = axios.create(APISettings)

export default {
  axiosInstance,
  async get(path: string, params: {}, headers: Headers = null) {
    const config = {
      method: 'GET',
      url: `${path}`,
      params: params
    }
    if (headers) {
      config['headers'] = headers
    }
    return await axiosInstance(config)
  },
  async post(path: string, payload: {}) {
    return await axiosInstance({
      method: 'POST',
      url: `${path}`,
      data: payload
    })
  },
  async patch(path: string, payload: {}, headers: Headers = null) {
    const config = { method: 'PATCH', url: `${path}`, data: payload }
    if (headers) {
      config['headers'] = headers
    }
    return await axiosInstance(config)
  },
  async put(path: string, payload: {}, headers: Headers = null) {
    const config = { method: 'PUT', url: `${path}`, data: payload }
    if (headers) {
      config['headers'] = headers
    }
    return await axiosInstance(config)
  },
  async delete(path: string) {
    return await axiosInstance({
      method: 'DELETE',
      url: `${path}`
    })
  }
}
