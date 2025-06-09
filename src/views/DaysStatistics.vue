<script lang="ts" setup>
import StatisticChart from '@/components/StatisticChart.vue'
import type { ChartStatistics } from '@/types/staticstics.ts'
import { ref } from 'vue'
import { useModeratorStore } from '@/stores/moderator.ts'
import AppHeader from '@/components/AppHeader.vue'

const chart = ref<ChartStatistics | null>(null)

useModeratorStore()
  .getDaysStatistics()
  .then((data) => (chart.value = data))
/*
const chart = {
  labels: Array.from({ length: 60 }, (_, i) => `День ${i + 1}`),
  series: [
    {
      name: 'Заходы на сайт',
      data: Array.from({ length: 60 }, () => Math.floor(Math.random() * 100)),
    },
    {
      name: 'Регистрации',
      data: Array.from({ length: 60 }, () => Math.floor(Math.random() * 50)),
    },
    {
      name: 'Скачивания',
      data: Array(30)
        .fill(null)
        .concat(Array.from({ length: 30 }, () => Math.floor(Math.random() * 20))),
    },
  ],
}*/
</script>

<template>
  <AppHeader>
    <h2 class="title">Статистика</h2>
  </AppHeader>
  <StatisticChart v-if="chart" :chart="chart" />
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  gap: vw(26);
  font-weight: 700;
  font-size: vw(30);
  line-height: 1.33;
  letter-spacing: 0.01em;
  color: var(--color-black);
}
</style>
