import { snackStore } from '@/stores/snackbar.ts'

export function useStores() {
  const snack = snackStore()
  return { snack }
}
