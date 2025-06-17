function formatDate(input: string): string {
  const date = new Date(input)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

function getHoursDifferenceFromNow(isoString: string): number {
  const inputDate = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - inputDate.getTime()
  return diffMs / (1000 * 60 * 60)
}

export { formatDate, getHoursDifferenceFromNow }
