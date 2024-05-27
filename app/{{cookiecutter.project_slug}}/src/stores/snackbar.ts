import { defineStore } from 'pinia'
import { Anchor } from '@/types/vuetify-types.ts'

const DEFAULT_TIMEOUT = 3000

export const snackStore = defineStore({
  id: 'snackbar',
  state: () => ({
    displayed: false,
    text: null,
    type: null,
    timeout: DEFAULT_TIMEOUT,
    location: 'bottom' as Anchor,
    icon: null,
    closable: true
  }),

  actions: {
    display({
      text,
      type,
      timeout = DEFAULT_TIMEOUT,
      location = 'bottom',
      closable = true,
      icon = null
    }) {
      if (this.displayed) {
        // Hack to reset the timer when the snackbar is already displayed
        setTimeout(() => {
          this.timeout = 0
          this.display({
            text,
            type,
            timeout,
            location,
            closable,
            icon
          })
        }, 0)
      } else {
        this.text = text
        this.type = type
        this.timeout = timeout
        this.location = location
        this.closable = closable
        this.displayed = true
        this.icon = icon
      }
    }
  },
  persist: true
})
