<template>
  <v-text-field
    :rules="rules"
    :label="$t(label)"
    :placeholder="$t(placeholder)"
    :density="density"
    clearable
    autocomplete="on"
    class="pa-2"
  >
    <template
      v-if="$slots['append']"
      #append
    >
      <slot name="append" />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ValidationRules } from '@/types/vuetify-types.ts'

defineProps({
  rules: {
    type: Array as PropType<ValidationRules[]>,
    default: () => []
  },
  label: {
    type: String,
    default: 'common.textField.label'
  },
  placeholder: {
    type: String,
    default: 'common.textField.placeholder'
  },
  density: {
    type: String as () => null | 'default' | 'comfortable' | 'compact',
    default: 'comfortable'
  }
})
</script>

<style scoped></style>
