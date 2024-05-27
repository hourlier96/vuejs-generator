<template>
  <div class="text-center">
    <v-dialog
      v-model="isOpen"
      width="auto"
    >
      <CardContainer
        :title="$t(title) || title"
        class="text-center"
      >
        <template #body>
          <slot name="body" />
        </template>
        <template #footer>
          <slot
            v-if="$slots.customActions"
            name="customActions"
            :confirm="confirm"
            :close="close"
          />
          <div v-else>
            <v-btn
              density="compact"
              icon="mdi-check-circle-outline"
              color="green"
              size="x-large"
              @click="confirm()"
            />
            <v-btn
              density="compact"
              icon="mdi-close-circle-outline"
              color="red"
              size="x-large"
              @click="close()"
            />
          </div>
        </template>
      </CardContainer>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardContainer from '@/components/common/CardContainer.vue'
import { watch } from 'vue'

const emit = defineEmits(['confirm', 'close'])

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'common.confirmationModal.title'
  }
})

let isOpen = ref(props.isOpen)

watch(
  () => props.isOpen,
  (newValue) => {
    isOpen.value = newValue
  }
)

function confirm() {
  isOpen.value = false
  emit('confirm')
}

function close() {
  isOpen.value = false
  emit('close')
}
</script>

<style scoped></style>
