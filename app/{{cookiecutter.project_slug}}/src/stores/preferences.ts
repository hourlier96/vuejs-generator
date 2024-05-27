import { defineStore } from 'pinia'
import { defaultLocale } from '@/../i18n/index.js'
import { i18n } from '@/main.ts'

export const preferencesStore = defineStore({
  id: 'preferences',
  state: () => ({
    isDark: true,
    lang: defaultLocale
  }),
  actions: {
    toggleTheme(theme) {
      this.isDark = !this.isDark
      theme.global.name.value = this.isDark ? 'customDarkTheme' : 'customLightTheme'
    },
    setLang(lang) {
      this.lang = lang
      i18n.global.locale.value = lang
    }
  },
  persist: true
})
