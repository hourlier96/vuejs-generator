<template>
  <v-form :ref="($el) => refHandler($el, props.id)">
    <slot name="body" />
    <slot
      v-if="customActions"
      name="actions"
      :validate="validate"
      :clear="clear"
      :reset-validation="resetValidation"
    />
    <div
      v-else
      class="d-flex justify-space-evenly"
    >
      <v-btn
        density="compact"
        icon="mdi-check-circle-outline"
        color="green"
        size="x-large"
        @click="validate"
      />
      <v-btn
        v-if="clearable"
        density="compact"
        icon="mdi-sync-circle"
        color="red"
        size="x-large"
        @click="clear"
      />
    </div>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  customActions: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  }
})

let refs = ref([])

function refHandler(el: unknown, i: number) {
  if (el) {
    refs.value[i] = el
  }
}

async function validate() {
  const { valid } = await refs.value[props.id].validate()
  if (valid) {
    emit('submit')
  }
}

function clear() {
  refs.value[props.id].reset()
}

function resetValidation() {
  refs.value[props.id].resetValidation()
}
</script>

<style></style>
