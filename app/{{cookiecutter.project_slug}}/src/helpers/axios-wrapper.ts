import { APISettings } from '@/api/config.ts'
import { ApiError } from '@/types/errors.ts'
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
    return await call(config, path)
  },
  async post(path: string, payload: {}) {
    const config = {
      method: 'POST',
      url: `${path}`,
      data: payload
    }
    return await call(config, path)
  },
  async patch(path: string, payload: {}, headers: Headers = null) {
    const config = { method: 'PATCH', url: `${path}`, data: payload }
    if (headers) {
      config['headers'] = headers
    }
    return await call(config, path)
  },
  async put(path: string, payload: {}, headers: Headers = null) {
    const config = { method: 'PUT', url: `${path}`, data: payload }
    if (headers) {
      config['headers'] = headers
    }
    return await call(config, path)
  },
  async delete(path: string) {
    const config = {
      method: 'DELETE',
      url: `${path}`
    }
    return await call(config, path)
  }
}

async function call(config: Object, path: string) {
  try {
    return await axiosInstance(config)
  } catch (error) {
    throw new ApiError(error.message, `${APISettings.baseURL}${path}`)
  }
}