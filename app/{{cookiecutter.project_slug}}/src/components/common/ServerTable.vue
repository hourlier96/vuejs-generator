<template>
  <v-container>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items-length="totalItems"
      :items="items"
      :loading="loading"
      :search="search"
      :group-by="groupBy"
      return-object
      @update:options="fetchData($event)"
    >
      <template #top>
        <div class="d-flex">
          <TextField
            v-if="!hideSearch"
            v-model="search"
            class="ma-2"
            density="compact"
            :placeholder.attr="$t('common.search')"
            hide-details
          />
  
          <template v-if="$slots.additionalHeader">
            <slot name="additionalHeader" />
          </template>
        </div>
      </template>

      <template #group-header="{ item, columns, toggleGroup, isGroupOpen }">
        <slot
          :name="'group-header'"
          :item="item"
          :columns="columns"
          :toggle-group="toggleGroup"
          :is-group-open="isGroupOpen"
        />
      </template>
      
      <template
        v-for="(slot, index) of Object.keys($slots)"
        :key="index"
        #[`item.${slot}`]="{ item }"
      >
        <slot
          :name="slot"
          :item="item"
        />
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextField from '@/components/common/form/TextField.vue'
import { VDataTable } from 'vuetify/components';

const emit = defineEmits(['updateData'])

defineProps({
  headers: {
    type: Array<Object>,
    default: []
  },
  items: {
    type: Array<Object>,
    default: []
  },
  loading: {
    type: Boolean,
    default: false
  },
  hideSearch: {
    type: Boolean,
    default: false
  },
  groupBy: {
    type: VDataTable['sortBy'],
    default: []
  },
  totalItems: {
    type: Number,
    default: 0
  }
})

let itemsPerPage = ref(25)

let search = ref('')

function fetchData(options) {
  const { page, itemsPerPage, sortBy, groupBy, search } = options
  emit('updateData', { page, itemsPerPage, sortBy, groupBy, search })
}

</script>
