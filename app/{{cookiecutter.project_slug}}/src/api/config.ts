export const APISettings = {
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

export const TODO_PREFIX = '/todo'
