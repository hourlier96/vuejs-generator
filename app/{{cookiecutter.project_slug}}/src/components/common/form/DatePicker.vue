<template>
  <v-menu
    v-model="showPicker"
    transition="scale-transition"
    :close-on-content-click="false"
    offset-y
  >
    <template #activator="scopeData">
      <v-text-field
        v-model="dateFormatted"
        :rules="props.rules"
        v-bind="scopeData.props"
        :label="$t(props.label)"
        prepend-inner-icon="mdi-calendar"
        readonly
        clearable
      />
    </template>
    <v-date-picker
      v-model="innerDate"
      :locale="prefStore.lang"
      :color="props.color"
      :min="props.min"
      :max="props.max"
      :multiple="props.multiple"
      :allowed-dates="props.allowedDates"
      show-adjacent-months
      class="picker pa-2"
    >
      <template
        v-if="$slots.actions"
        #actions
      >
        <slot name="actions" />
      </template>
    </v-date-picker>
  </v-menu>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue'
import { useDate } from 'vuetify'
import { ValidationRules } from '@/types/vuetify-types.ts'
import { preferencesStore } from '@/stores/preferences.ts'

const date = useDate()
const prefStore = preferencesStore()

const props = defineProps({
  modelValue: {
    type: Array<String> || String,
    default: null
  },
  label: {
    type: String,
    default: 'common.datePickerField.label'
  },
  color: {
    type: String,
    default: 'red'
  },
  min: {
    type: Date as any,
    default: null
  },
  max: {
    type: Date as any,
    default: null
  },
  rules: {
    type: Array as PropType<ValidationRules[]>,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: false
  },
  allowedDates: {
    type: Array as any,
    default: null
  },
  showAsText: {
    type: Boolean,
    default: false
  }
})

let innerDate = ref(props.modelValue)
let showPicker = ref(false)

const dateFormatted = computed({
  get() {
    // Format single date
    if (!props.multiple && innerDate.value) {
      if (props.showAsText) {
        return date.format(innerDate.value, 'fullDateWithWeekday')
      } else {
        return date.format(innerDate.value, 'keyboardDate')
      }
    }
    // Format multiple dates
    if (innerDate.value) {
      const tmpArray = innerDate.value.slice(0) as Array<String>
      tmpArray.sort((a: any, b: any) => {
        return a - b
      })
      const formattedDates = tmpArray.map((current) => {
        if (props.showAsText) {
          return date.format(current, 'fullDateWithWeekday')
        } else {
          return date.format(current, 'keyboardDate')
        }
      })
      return formattedDates
    }
    return ''
  },
  // Used to reset the date when the user clears the field
  set(value: any) {
    innerDate.value = value
  }
})
</script>

<style scoped>
.picker {
  width: 400px;
}
</style>
