<template>
  <v-container>
    <h2 class="text-center pb-4">
      {% raw %}{{ $t('tableView.tableTitle') }}{% endraw %}
    </h2>
    <ServerTable
      :headers="headers"
      :items="apiResult?.items"
      :loading="loading"
      :total-items="apiResult?.total"
      :group-by="groupBy"
      @update-data="getTodos($event)"
    >
      <!-- Add any additional header content -->
      <template #additionalHeader>
        <SwitchField
          v-model="isGrouped"
          class="d-flex justify-end"
          @change="isGrouped = $event"
        >
          <template
            v-if="isGrouped"
            #label
          >
            <v-icon
              size="x-large"
              icon="mdi-playlist-plus"
            />
          </template>
          <template
            v-else
            #label
          >
            <v-icon
              size="x-large"
              icon="mdi-playlist-remove"
            />
          </template>
        </SwitchField>
      </template>

      <!-- @vue-ignore -->
      <template #group-header="{ item, columns, toggleGroup, isGroupOpen }">
        <tr>
          <td
            :colspan="columns.length"
            :style="{'background-color': getTodoColor(item['value']).secondary}"
          >
            <v-btn
              :icon="isGroupOpen(item) ? '$expand' : '$next'"
              size="small"
              variant="text"
              @click="toggleGroup(item)"
            />
            <span
              class="font-weight-bold"
              :color="getTodoColor(item['value']).primary"
            >   {% raw %}{{ item['value'] }}{% endraw %}
            </span> 
          </td>
        </tr>
      </template>

      <!-- Change any table content from property name -->
      <template #title="{ item }">
        <div class="d-flex align-center item-title">
          <v-icon
            icon="mdi-order-bool-ascending-variant"
            center
            class="mr-2"
          />
          {% raw %}{{ item['title'] }}{% endraw %}
        </div>
      </template>

      <template #description="{ item }">
        <p class="item-description">
          {% raw %}{{ item['description'] }}{% endraw %}
        </p>
      </template>
      
      <template #priority="{ item }">
        <v-chip :color="getTodoColor(item['priority']).primary">
          {% raw %}{{ item['priority'] }}{% endraw %}
        </v-chip>
      </template>

      <template #actions="{ item }">
        <div class="d-flex">
          <v-btn
            color="red"
            icon="mdi-delete"
            size="x-small"
            variant="tonal"
            class="ma-1"
            @click="openModal(item)"
          />
        </div>
      </template>
    </ServerTable>
    <ConfirmationModal
      :is-open="showModal"
      :title="$t('tableView.deleteModal.title')"
      @confirm="deleteTodo()"
      @close="showModal = false"
    >
      <template #body>
        {% raw %}{{ $t('tableView.deleteModal.body') }}{% endraw %}
      </template>
    </ConfirmationModal>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useApis } from '@/composables/use-apis.ts'
import { wrapper } from '@/composables/use-api-wrapper.ts'
import { PaginatedResult } from '@/types/api-types.ts'
import { getDefaultParams, buildFilters } from '@/helpers/table-filter.ts'
import SwitchField from '@/components/common/form/SwitchField.vue'
import ServerTable from '@/components/common/ServerTable.vue'
import ConfirmationModal from '@/components/common/ConfirmationModal.vue'

const apis = useApis()
const { t } = useI18n()

// - - -

const headers = computed(() => [
  { title: t('tableView.titleHeader'), value: 'title', align: 'center', sortable: true, width: 400 },
  {
    title: t('tableView.descriptionHeader'),
    value: 'description',
    align: 'center',
    sortable: true,
    maxWidth: 800
  },
  !isGrouped.value ? { title: t('tableView.priorityHeader'), value: 'priority', align: 'center', sortable: true }: {},
  {
    title: "Actions", value: 'actions', align: 'center', sortable: false
  }
])

// - - -

const isGrouped = ref(false)
let groupBy  = computed(() => {
  return isGrouped.value ? [
        {
          key: 'priority',
          order: 'asc',
        },
      ] : []
})

// - - -

const loading = ref(false)
let apiResult = ref(new PaginatedResult())
let showModal = ref(false)

// Debounce to wait user input
const getTodos = useDebounceFn(async (options: { search: any }) => {
  let params = getDefaultParams(options)
  const { search } = options
  if (search) {
    const search_on = ['title', 'description', 'priority']
    params.use_or = true
    params.filters = buildFilters(search_on, ':', search)
  }
  apiResult.value = (await wrapper(apis.todos.getTodos(params), loading, { show: false })).data
}, 500)

let itemToDelete = ref(null)

function openModal(item: any) {
  showModal.value = true
  itemToDelete.value = item
}

async function deleteTodo() {
  const deleted = (await wrapper(apis.todos.deleteTodo(itemToDelete.value), loading)).data
  apiResult.value.items = apiResult.value.items.filter((item: { id: any }) => deleted.id !== item.id)
  showModal.value = false
}

// - - -

function getTodoColor (priority: string) {
  if (priority === 'LOW') return {primary: 'green', secondary: '#94ff9440'}
  if (priority === 'MEDIUM') return {primary: 'orange', secondary: '#ffa50033'}
  if (priority === 'HIGH') return {primary: 'red', secondary: '#ff00001a'}
}
</script>

<style scoped>
.item-title {
  text-align: start;
  font-style: italic;
}

.item-description {
  text-align: justify
}
</style>