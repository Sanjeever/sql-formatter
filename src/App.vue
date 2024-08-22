<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { RouterView } from 'vue-router'

useTitle('SQL Formatter')
</script>

<template>
  <main class="h-full w-full flex flex-col justify-center items-center">
    <router-view></router-view>
  </main>
</template>
