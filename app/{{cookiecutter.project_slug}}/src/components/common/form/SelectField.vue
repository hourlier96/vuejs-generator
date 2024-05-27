<template>
  <v-select
    v-model="selectedItems"
    :label="$t(props.label)"
    :items="props.items"
    :item-value="props.itemValue"
    :item-title="props.itemTitle"
    :multiple="props.multiple"
    :chips="showAsChips"
    class="pa-2"
    @update:model-value="$emit('selectionUpdated', $event)"
  >
    <template #prepend-item>
      <div v-if="multiple">
        <v-list-item
          :title="`Select All (${selectedItems.length})`"
          @click="selectAll"
        >
          <template #prepend>
            <v-checkbox-btn
              :color="selectedSome ? 'indigo-darken-4' : undefined"
              :indeterminate="selectedSome && !selectedAll"
              :model-value="selectedSome"
            />
          </template>
        </v-list-item>

        <v-divider class="mt-2" />
      </div>
    </template>

    <template
      v-if="$slots['append']"
      #append
    >
      <slot name="append" />
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineEmits(['selectionUpdated'])

const props = defineProps({
  modelValue: {
    type: String || Array,
    default: () => []
  },
  items: {
    type: Array,
    required: true
  },
  itemTitle: {
    type: String,
    default: 'title'
  },
  itemValue: {
    type: String,
    default: 'value'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'common.selectField.label'
  },
  density: {
    type: String as () => null | 'default' | 'comfortable' | 'compact',
    default: 'comfortable'
  },
  showAsChips: {
    type: Boolean,
    default: false
  }
})

let selectedItems = ref(props.modelValue)

const selectedAll = computed(() => {
  return selectedItems.value.length === props.items.length
})

const selectedSome = computed(() => {
  return selectedItems.value.length > 0
})

function selectAll() {
  if (selectedAll.value) {
    selectedItems.value = []
  } else {
    selectedItems.value = props.items.slice()
  }
}
</script>

<style scoped></style>
