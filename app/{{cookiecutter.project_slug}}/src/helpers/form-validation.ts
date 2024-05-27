import { i18n } from '@/main.ts'

export default {
  fieldRequired() {
    return (value: string | Array<unknown>) =>
      !!value || (!!value && value.length > 0) || i18n.global.t('form.required')
  },

  fieldMinLength(size: number) {
    return (value: string) =>
      value.length >= size || i18n.global.t('form.minimalLength', { length: size })
  },

  fieldMaxLength(size: number) {
    return (value: string) =>
      value.length <= size || i18n.global.t('form.maximalLength', { length: size })
  },

  fieldMinValue(size: number) {
    return function asNumber(value: number | string) {
      if (typeof value === 'number') {
        return value >= size || i18n.global.t('form.minimalValue', { value: size })
      }
      return (
        Number.parseFloat(value.replaceAll(',', '.')) >= size ||
        i18n.global.t('form.minimalValue', { value: size })
      )
    }
  },

  fieldMaxValue(size: number) {
    return function asNumber(value: number | string) {
      if (typeof value === 'number') {
        return value <= size || i18n.global.t('form.maximalValue', { value: size })
      }
      return (
        Number.parseFloat(value.replaceAll(',', '.')) <= size ||
        i18n.global.t('form.maximalValue', { value: size })
      )
    }
  },

  isEmail() {
    return (value: string) => /.+@.+\..+/.test(value) || i18n.global.t('form.emailNotValid')
  },

  passwordRules() {
    return (value: string) =>
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
      i18n.global.t('form.passwordRequirements')
  }
}
