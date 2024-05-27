<template>
  <v-container>
    <h2 class="text-center pb-4">
      {% raw %}{{ $t('formView.formTitle') }}{% endraw %}
    </h2>
    <SwitchField
      v-model="rulesEnabled"
      @change="rulesEnabled = $event"
    >
      <template
        v-if="rulesEnabled"
        #label
      >
        {% raw %}{{ $t('formView.validationOn') }}{% endraw %}
      </template>
      <template
        v-else
        #label
      >
        {% raw %}{{ $t('formView.validationOff') }}{% endraw %}
      </template>
    </SwitchField>
    <!-- Form Example -->
    <FormField
      :id="1"
      clearable
      custom-actions
      @submit="showModal = true"
    >
      <template #body>
        <v-row>
          <!-- DatePicker exemple WIP -->
          <v-col cols="6">
            <DatePicker
              v-model="dateExemple"
              :rules="rulesEnabled ? [formValidation.fieldRequired()] : []"
              :allowed-dates="[
                date.addDays(new Date(), -3),
                date.addDays(new Date(), -1),
                date.addDays(new Date(), 1),
                date.addDays(new Date(), 3)
              ]"
              show-as-text
            />
          </v-col>
          <v-col cols="6">
            <DatePicker
              v-model="dateMultipleExemple"
              label="common.datePickerField.labelMultiple"
              :rules="
                rulesEnabled
                  ? [formValidation.fieldRequired(), formValidation.fieldMinLength(3)]
                  : []
              "
              :multiple="true"
              :min="date.addDays(new Date(), -10)"
              :max="date.addDays(new Date(), 10)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <!-- TextField example -->
            <TextField
              v-model="usernameExample"
              :rules="
                rulesEnabled
                  ? [formValidation.fieldRequired(), formValidation.fieldMinLength(3)]
                  : []
              "
              label="formView.usernameField.label"
              placeholder="formView.usernameField.placeholder"
              prepend-inner-icon="mdi-account"
            />
          </v-col>
          <v-col cols="6">
            <TextField
              v-model="emailExemple"
              :rules="
                rulesEnabled ? [formValidation.fieldRequired(), formValidation.isEmail()] : []
              "
              label="common.emailField.label"
              placeholder="common.emailField.placeholder"
              prepend-inner-icon="mdi-email"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <TextField
              v-model="passwordExemple"
              :rules="rulesEnabled ? [formValidation.passwordRules()] : []"
              type="password"
              label="common.passwordField.label"
              placeholder="common.passwordField.placeholder"
              prepend-inner-icon="mdi-lock"
            />
          </v-col>
          <v-col cols="6">
            <!-- CurrencyField example -->
            <CurrencyField
              v-model="currencyExemple"
              :options="{ currency: 'EUR', valueRange: { min: 1, max: 10 } }"
              :rules="
                rulesEnabled
                  ? [
                    formValidation.fieldRequired(),
                    formValidation.fieldMinValue(1),
                    formValidation.fieldMaxValue(10)
                  ]
                  : []
              "
              prepend-inner-icon="mdi-currency-eur"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <!-- SelectField example -->
            <SelectField
              v-model="selectExemple"
              :rules="rulesEnabled ? [formValidation.fieldRequired()] : []"
              :items="[
                { state: 'Florida', abbr: 'FL' },
                { state: 'Georgia', abbr: 'GA' },
                { state: 'Nebraska', abbr: 'NE' },
                { state: 'California', abbr: 'CA' },
                { state: 'New York', abbr: 'NY' }
              ]"
              item-title="state"
              item-value="abbr"
              :multiple="false"
              :chips="true"
              closable-chips
              prepend-inner-icon="mdi-flag"
              @selection-updated="selectExemple = $event"
            />
          </v-col>
          <v-col cols="6">
            <!-- AutocompleteField example -->
            <AutocompleteField
              v-model="autocompleteExemple"
              label="common.autocompleteField.labelMultiple"
              :rules="
                rulesEnabled
                  ? [formValidation.fieldRequired(), formValidation.fieldMaxLength(2)]
                  : []
              "
              :items="[
                { title: 'Florida', value: 'FL' },
                { title: 'Georgia', value: 'GA' },
                { title: 'Nebraska', value: 'NE' },
                { title: 'California', value: 'CA' },
                { title: 'New York', value: 'NY' }
              ]"
              :multiple="true"
              :chips="true"
              closable-chips
              prepend-inner-icon="mdi-city"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <FileField
              v-model="exampleFiles"
              label="common.fileField.labelMultiple"
              :multiple="true"
              clearable
              @file-change="exampleFiles = $event"
            />
          </v-col>
        </v-row>
      </template>
      <!-- Replace default actions when custom-actions props is passed -->
      <template #actions="{ validate, clear }">
        <div class="d-flex justify-space-evenly">
          <v-btn
            density="compact"
            icon="mdi-check-circle-outline"
            color="green"
            size="x-large"
            @click="validate"
          />
          <v-btn
            density="compact"
            icon="mdi-sync-circle"
            color="red"
            size="x-large"
            @click="clear"
          />
        </div>
      </template>
    </FormField>

    <ConfirmationModal
      :is-open="showModal"
      @confirm="confirmSubmit()"
      @close="showModal = false"
    >
      <template #body>
        {% raw %}{{ $t('formView.modalBody') }}{% endraw %}
      </template>
      <!-- Replace default actions if needed -->
      <!-- <template #customActions="{ confirm, close }">
        <v-btn @click="confirm()"></v-btn>
        <v-btn @click="close()"></v-btn>
      </template> -->
    </ConfirmationModal>

    <!-- Call API example -->
    <div
      v-if="loading"
      class="pa-8"
    >
      <div class="text-caption">
        Call in progress...
      </div>
      <v-progress-linear
        color="primary"
        indeterminate
        :height="5"
      />
    </div>

    <div
      v-else-if="apiResult.items.length > 0"
      class="mt-8"
    >
      <hr>
      <div class="d-flex justify-content-center flex-wrap">
        <CardContainer
          v-for="entry in apiResult.items.slice(0, 3)"
          :key="entry.title"
          :title="entry.title"
        >
          <template #body>
            <div>{% raw %}{{ entry.description }}{% endraw %}</div>
          </template>
          <template #footer>
            {% raw %}{{ entry.priority }}{% endraw %}
          </template>
        </CardContainer>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import CardContainer from '@/components/common/CardContainer.vue'
import AutocompleteField from '@/components/common/form/AutocompleteField.vue'
import FormField from '@/components/common/form/FormField.vue'
import FileField from '@/components/common/form/FileField.vue'
import ConfirmationModal from '@/components/common/ConfirmationModal.vue'
import TextField from '@/components/common/form/TextField.vue'
import SwitchField from '@/components/common/form/SwitchField.vue'
import SelectField from '@/components/common/form/SelectField.vue'
import CurrencyField from '@/components/common/form/CurrencyField.vue'
import DatePicker from '@/components/common/form/DatePicker.vue'
import formValidation from '@/helpers/form-validation.ts'
import { PaginatedResult, SnackBar } from '@/types/api-types.ts'
import { Todo } from '@/types/todo-types.ts'
import { ref } from 'vue'
import { useApis } from '@/composables/use-apis.ts'
import { wrapper } from '@/composables/use-api-wrapper.ts'
import { useDate } from 'vuetify'

const apis = useApis()
const date = useDate()

let apiResult = ref(new PaginatedResult<Todo>())
let loading = ref(false)
let rulesEnabled = ref(false)
let dateExemple = ref(null as any)
let dateMultipleExemple = ref([] as any)
let usernameExample = ref('')
let emailExemple = ref('')
let passwordExemple = ref('')
let currencyExemple = ref(0)
let selectExemple = ref(null as any)
let autocompleteExemple = ref([])
let exampleFiles = ref([])
let showModal = ref(false)

function confirmSubmit() {
  showModal.value = false
  getTodos()
}

async function getTodos() {
  const options = new SnackBar(true, 'bottom', {
    200: 'API called with success',
    400: 'Error from client',
    500: 'Error from server'
  })
  const params = {
    per_page: 3
  }
  apiResult.value = (await wrapper(apis.todos.getTodos(params), loading, options)).data
}
</script>

<style scoped>
.v-date-picker {
  padding: 0 !important;
}
.text-info {
  padding: 5px !important;
}
</style>
