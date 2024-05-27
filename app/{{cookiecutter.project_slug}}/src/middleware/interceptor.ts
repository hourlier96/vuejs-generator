import router from '@/router/index.ts'
import axiosInstance from '@/helpers/axios-wrapper.ts'

const interceptor = () => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.byPassAuth)) {
      next()
    }
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      next()
    } else {
      next()
    }
  })
}

// For each request made by axios
axiosInstance.axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// For each response received by axios
axiosInstance.axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break
        case 403:
          router.push({
            path: '/'
          })
          break
      }
      return Promise.reject(error.response)
    } else {
      return Promise.reject(error)
    }
  }
)

export default interceptor
