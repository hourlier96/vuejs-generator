<!-- Snackbar to display messages -->
<template>
  <v-snackbar
    v-model="sStore.displayed"
    :color="sStore.type"
    :timeout="sStore.timeout"
    :location="sStore.location"
  >
    <div class="d-flex align-center">
      <v-icon
        v-if="sStore.icon"
        :icon="sStore.icon"
        class="mr-2"
      />
      {% raw %}{{ sStore.text }}{% endraw %}
    </div>
    <template #actions>
      <v-btn
        v-if="sStore.closable"
        variant="text"
        @click="sStore.displayed = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { snackStore } from '@/stores/snackbar.ts'
const sStore = snackStore()
</script>
