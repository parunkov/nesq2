<template>
  <AppButton danger outline class="minus-button" :title="slotTitle">
    <img src="/icons/minus.svg" alt="Удалить" />
  </AppButton>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'

const slots = useSlots()

const slotTitle = computed(() => {
  return slots.default
    ? slots
        .default()
        .map((v) => v.children)
        .join('')
    : ''
})
</script>

<style scoped>
.minus-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: vw(54);
  width: vw(54);
  box-sizing: border-box;
}

.minus-button img {
  display: block;
  width: vw(13);
  height: auto;
}
</style>
