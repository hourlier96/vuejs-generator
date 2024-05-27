// CSS
import './assets/main.css'

// Pinia
import { createApp } from 'vue'
import { createPinia, PiniaPlugin } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// I18n
import { createI18n } from 'vue-i18n'
import { languages } from '../i18n/index.js'
import { defaultLocale } from '../i18n/index.js'
import type { I18nOptions } from 'vue-i18n';

// Global components
import App from './App.vue'
import router from '@/router/index.ts'

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { en, fr } from 'vuetify/locale'
// Material design & Font awesome icons
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'

const messages = Object.assign(languages) as I18nOptions['messages']
export const i18n = createI18n({
  legacy: false, // Composition API setup
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages
})

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#ededed',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00'
  }
}

const customDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#222831',
    surface: '#1c1e26',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00'
  }
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    sets: {
      fa,
      mdi
    }
  },
  locale: {
    locale: defaultLocale,
    fallback: 'en',
    messages: { fr, en }
  },
  theme: {
    defaultTheme: 'customDarkTheme',
    themes: {
      customLightTheme,
      customDarkTheme
    }
  }
})

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate as unknown as PiniaPlugin)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
