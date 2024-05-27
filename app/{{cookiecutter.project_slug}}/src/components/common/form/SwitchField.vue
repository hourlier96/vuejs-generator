<template>
  <v-switch
    v-model="state"
    :label="label"
    inset
    class="pa-2"
    @update:model-value="$emit('change', $event)"
  >
    <template
      v-if="$slots['append']"
      #append
    >
      <slot name="append" />
    </template>
    <template
      v-if="$slots['label']"
      #label
    >
      <slot name="label" />
    </template>
  </v-switch>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits(['change'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  }
})

let state = ref(props.modelValue)
</script>

<style scoped></style>
