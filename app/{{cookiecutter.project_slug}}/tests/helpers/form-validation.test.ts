import { expect, test } from 'vitest'
import helpers from '@/helpers/form-validation.ts'

test('Test required field', () => {
  expect(helpers.fieldRequired()('')).toBeTypeOf('string')
  expect(helpers.fieldRequired()(false)).toBeTypeOf('string')
  expect(helpers.fieldRequired()('test')).toBe(true)
  expect(helpers.fieldRequired()(true)).toBe(true)
})

test('Test minimal length field', () => {
  expect(helpers.fieldMinLength(5)('Nop')).toBeTypeOf('string')
  expect(helpers.fieldMinLength(5)('Valid input')).toBe(true)
})

test('Test maximal length field', () => {
  expect(helpers.fieldMaxLength(5)('Too long')).toBeTypeOf('string')
  expect(helpers.fieldMaxLength(5)('Ok')).toBe(true)
})

test('Test minimal value field', () => {
  expect(helpers.fieldMinValue(5)(4)).toBeTypeOf('string')
  expect(helpers.fieldMinValue(5)("4,95")).toBeTypeOf('string') // CurrencyField returns float 'string' representation
  expect(helpers.fieldMinValue(5)(5)).toBe(true)
  expect(helpers.fieldMinValue(5)("5,95")).toBe(true)
})

test('Test maximal value field', () => {
  expect(helpers.fieldMaxValue(5)(6)).toBeTypeOf('string')
  expect(helpers.fieldMaxValue(5)("6,95")).toBeTypeOf('string')
  expect(helpers.fieldMaxValue(5)(5)).toBe(true)
  expect(helpers.fieldMaxValue(5)("4,95")).toBe(true)
})

test('Test e-mail field', () => {
  expect(helpers.isEmail()('test')).toBeTypeOf('string')
  expect(helpers.isEmail()('test@gmail.com')).toBe(true)
})

test('Test password field', () => {
  expect(helpers.passwordRules()('Not valid')).toBeTypeOf('string')
  expect(helpers.passwordRules()('Validpassw0rd')).toBe(true)
})