<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useModeratorStore } from '@/stores/moderator.ts'
import { useAuthStore } from '@/stores/auth.ts'

useModeratorStore()
useAuthStore()
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped lang="scss"></style>
