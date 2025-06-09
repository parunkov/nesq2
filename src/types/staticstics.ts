export type Series = {
  label: string
  date: Array<number | null>
  color?: string
}

export type ChartStatistics = {
  labels: string[]
  series: Series[]
}
