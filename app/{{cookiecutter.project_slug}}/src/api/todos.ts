import api from '@/helpers/axios-wrapper.ts'
import { TODO_PREFIX } from '@/api/config.ts'

export default {
  async getTodos(params) {
    return await api.get(`${TODO_PREFIX}`, params)
  },
  async deleteTodo(todo) {
    return await api.delete(`${TODO_PREFIX}/${todo.id}`)
  },
  // Used by unit tests, uses Public API
  unitTest() {
    return api.get('/', {})
  },
}
