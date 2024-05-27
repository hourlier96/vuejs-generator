// index.js
import en from './en.json'
import fr from './fr.json'

export const defaultLocale = 'fr'

export const languages = {
  en: en,
  fr: fr,
}

export const countries_infos = [
  {
    title: 'English',
    value: 'en',
    flag: 'gb-eng',
  },
  {
    title: 'Français',
    value: 'fr',
    flag: 'fr',
  }
]