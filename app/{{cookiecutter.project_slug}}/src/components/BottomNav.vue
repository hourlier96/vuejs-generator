<template>
  <v-bottom-navigation
    id="footer"
    grow
    :height="'--navigation-bar-height'"
    class="align-center"
  >
    @Copyright 2023
  </v-bottom-navigation>
</template>

<script setup lang="ts"></script>

<style scoped>
#footer {
  height: var(--navigation-bar-height);
}
</style>
