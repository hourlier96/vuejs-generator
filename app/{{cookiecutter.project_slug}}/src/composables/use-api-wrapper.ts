import { Ref } from 'vue'
import { getReasonPhrase } from 'http-status-codes'
import { AxiosResponse } from 'axios'
import { useStores } from '@/composables/use-stores.ts'
import { SnackBar } from '@/types/api-types.ts'

export async function wrapper(
  callback: Promise<AxiosResponse>,
  loading: Ref<boolean>,
  options: SnackBar = null
): Promise<AxiosResponse> {
  const { snack } = useStores()
  if (!options) {
    options = new SnackBar(true, 'top right', null)
  }
  loading.value = true
  try {
    const res = await callback
    if (options.show) {
      const { snack } = useStores()
      snack.display({
        text: getText(res, options),
        type: getType(res.status),
        icon: getIcon(res.status),
        location: options.location
      })
    }
    return res
  } catch (error) {
    snack.display({
      text: `${error.message}`,
      type: 'error',
      icon: getIcon(null),
      location: options.location
    })
    console.error(error)
    return error
  } finally {
    loading.value = false
  }
}

function getText(res: AxiosResponse, options: SnackBar) {
  // Define snackbar text priority:
  // 1. Custom Mapping
  // 2. API 'message' key
  // 3. HTTP status message from http-status-codes
  if (options.mapping && res.status in options.mapping) {
    return options.mapping[res.status]
  }
  return res.data?.message || `${res.status}: ${getReasonPhrase(res.status)}`
}

function getType(status: number) {
  switch (status) {
    case 200:
    case 201:
    case 202:
    case 204:
      return 'success'
    case 400:
      return 'warning'
    default:
      return 'error'
  }
}

function getIcon(status: number) {
  switch (status) {
    case 200:
    case 201:
    case 202:
    case 204:
      return 'mdi-check-circle'
    case 400:
      return 'mdi-message-alert'
    default:
      return 'mdi-alert'
  }
}
