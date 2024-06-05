import { ref } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, expect, test } from 'vitest'
import { wrapper } from '@/composables/use-api-wrapper.ts'
import { useApis } from '@/composables/use-apis.ts'

beforeEach(() => {
  // creates a fresh pinia and makes it active
  // Needed by useStores in wrapper
  setActivePinia(createPinia())
})

test(
  'Test api-wrapper & apis composables',
  async () => {
    const apis = useApis()
    const loading = ref(false)
    const response = await wrapper(apis.todos.unitTest(), loading)
    expect('status' in response).toBeTruthy() // Ensure API is enabled
    expect(response.status === 200).toBeTruthy() 
  },
  { timeout: 5000 }
)
