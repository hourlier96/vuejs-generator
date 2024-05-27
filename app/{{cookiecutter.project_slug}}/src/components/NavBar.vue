<template>
  <v-app-bar
    id="navbar"
    app
    :height="'--navigation-bar-height'"
    dark
  >
    <h3 class="ml-4">
      {{ cookiecutter.project_name }}
    </h3>
    <v-app-bar-nav-icon />
    <v-spacer />
    <v-btn @click="openDocumentation()">
      <v-img
        :src="imgSrc"
        alt="Vue logo"
        width="20"
      />
    </v-btn>
    <v-btn @click="showLang = !showLang">
      <v-icon>
        <country-flag
          :country="getFlag(prefStore.lang)"
          size="normal"
        />
      </v-icon>
    </v-btn>
    <v-list
      v-if="showLang"
      :height="120"
      class="flag-list"
    >
      <v-list-item
        v-for="(item, i) in countries_infos"
        :key="i"
        :value="item"
        @click="setLang(item.value)"
      >
        <template #prepend>
          <country-flag
            :country="item.flag"
            size="normal"
            class="flag-item"
          />
        </template>
        <v-list-item-title>{% raw %}{{ item.title }}{% endraw %}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-btn @click="prefStore.toggleTheme(theme)">
      <v-icon
        v-if="prefStore.isDark"
        icon="fa:fa fa-moon"
      />
      <v-icon
        v-else
        icon="fa:fa fa-sun"
      />
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import imgSrc from '@/assets/logo.svg'
import { ref } from 'vue'
import { useLocale, useTheme } from 'vuetify'
import { preferencesStore } from '@/stores/preferences.ts'
import { onMounted } from 'vue'
import CountryFlag from 'vue-country-flag-next'
import { countries_infos } from '@/../i18n/index.js'

const theme = useTheme()
const { current } = useLocale()
const prefStore = preferencesStore()
const showLang = ref(false)

onMounted(() => {
  theme.global.name.value = prefStore.isDark ? 'customDarkTheme' : 'customLightTheme'
  setLang(prefStore.lang)
})

function openDocumentation() {
  window.open('https://vuejs.org/guide/quick-start.html', '_blank')
}

function getFlag(lang) {
  return countries_infos.find((item) => item.value === lang).flag
}
function setLang(lang) {
  // Vuetify translation
  current.value = lang
  // Custom translation
  prefStore.setLang(lang)
  showLang.value = false
}
</script>

<style scoped>
#navbar {
  height: var(--navigation-bar-height);
  overflow: visible;
}

.flag-list {
  position: absolute;
  top: 50px;
  right: 0px;
  padding: 0;
  background-color: var(--v-primary-base);
  border-radius: 0px 0px 0px 10px;
  overflow-y: auto;
}

.normal-flag {
  margin: 0em -0.9em 0px -1em !important;
}

.flag-item {
  margin: 0px 0px 0px 0px !important;
}
</style>
