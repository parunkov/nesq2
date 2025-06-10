<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
import type { ChartStatistics, Series } from '@/types/staticstics.ts'

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent])

const props = defineProps<{
  chart: ChartStatistics
}>()

const defaultColors = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#0088FE',
  '#FFBB28',
  '#00C49F',
  '#FF4444',
]

const chartOptions = computed(() => {
  const series = props.chart.series.map((item: Series, index: number) => ({
    ...item,
    type: 'line',
    smooth: true,
    lineStyle: { color: item.color || defaultColors[index % defaultColors.length] },
    itemStyle: { color: item.color || defaultColors[index % defaultColors.length] },
  }))

  return {
    tooltip: { trigger: 'axis' },
    legend: { top: 'top' },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.chart.labels,
    },
    yAxis: {
      type: 'value',
    },
    series,
  }
})
</script>

<template>
  <div class="chart-container">
    <VChart :option="chartOptions" autoresize class="chart" />
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: vw(600);
  padding: 2rem;
  background: var(--color-gray-100);
  border-radius: vw(16);
  box-shadow: 0 vw(10) vw(25) rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
