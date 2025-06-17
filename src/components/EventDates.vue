<script setup lang="ts">
import { ref, nextTick } from 'vue'
import AppButton from '@/components/AppButton.vue'
import type { Event as EventType, DateTime } from '@/types/events.ts'
import MinusButton from '@/components/MinusButton.vue'
import { useAuthStore } from '@/stores/auth.ts'

interface DateRow {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  showActions: boolean
  showHint: boolean
}

const props = defineProps({
  startDates: {
    type: Array<DateTime>,
    default: [],
  },
})

const authStore = useAuthStore()

const dates = ref<EventType['datetime']>(props.startDates)

const emit = defineEmits(['updateDates'])

const rows = ref<DateRow[]>(convertToDateRows(props.startDates))

function convertToDateRows(target: DateTime[]): DateRow[] {
  if (target.length === 0) {
    return [
      {
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        showActions: true,
        showHint: false,
      },
    ]
  }

  return target.map(({ from, to }) => {
    const [startDateRaw, startTimeRaw] = from.split('T')
    const [, startMonth, startDay] = startDateRaw.split('-')
    const startDate = `${startDay}.${startMonth}`

    const startTime = startTimeRaw?.slice(0, 5) || '' // ← обрезаем секунды

    let endDate = ''
    let endTime = ''

    if (to && to.includes('T')) {
      const [endDateRaw, endTimeRaw] = to.split('T')
      const [, endMonth, endDay] = endDateRaw.split('-')
      endDate = `${endDay}.${endMonth}`
      endTime = endTimeRaw?.slice(0, 5) || '' // ← тоже обрезаем
    }

    return {
      startDate,
      startTime,
      endDate,
      endTime,
      showActions: false,
      showHint: false,
    }
  })
}

const formatInput = (value: string, isDate: boolean): string => {
  value = value.replace(/[^0-9_]/g, '')
  const separator = isDate ? '.' : ':'
  let formatted = ''
  value = value.slice(0, 4)
  if (value.length > 2) {
    formatted = value.slice(0, 2) + separator + value.slice(2)
  } else if (value.length > 0) {
    formatted = value
  }
  return formatted
}

const isFieldComplete = (value: string): boolean => {
  return value.length === 5
}

const toIsoDateTime = (dateStr: string, timeStr?: string): string | null => {
  if (!dateStr || dateStr.length !== 5) return null

  const [day, month] = dateStr.split('.').map(Number)
  const year = 2025

  if (timeStr && timeStr.length === 5) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${timeStr}:00`
  } else {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`
  }
}

const updateDatesAndEmit = () => {
  dates.value = rows.value
    .map((row) => {
      const from = toIsoDateTime(row.startDate, row.startTime)
      if (!from) return null

      const to = row.endDate ? toIsoDateTime(row.endDate, row.endTime) : undefined

      return to ? { from, to } : { from }
    })
    .filter((item): item is { from: string; to?: string } => item !== null)

  emit('updateDates', dates.value)
}

const handleInput = async (
  e: Event,
  rowIndex: number,
  field: 'startDate' | 'startTime' | 'endDate' | 'endTime',
  isDate: boolean,
) => {
  const input = e.target as HTMLInputElement
  const value = input.value
  const formatted = formatInput(value, isDate)
  rows.value[rowIndex][field] = formatted

  // Логика для показа действий и подсказок
  if (isDate && formatted.length === 5 && field === 'startDate') {
    rows.value[rowIndex].showActions = true
    await nextTick()
    focusInput(rowIndex, 'startTime')
  }

  if (field !== 'startDate' && rows.value[rowIndex].startDate.length < 5) {
    rows.value[rowIndex].showHint = true
    await nextTick()
    focusInput(rowIndex, 'startDate')
  } else {
    rows.value[rowIndex].showHint = false
  }

  if (field === 'endDate' && rows.value[rowIndex].endDate.length == 5) {
    focusInput(rowIndex, 'endTime')
  }

  if (isFieldComplete(formatted)) {
    updateDatesAndEmit()
  }
}

const focusInput = (rowIndex: number, field: keyof DateRow) => {
  const input = document.querySelectorAll<HTMLInputElement>(
    `.row-${rowIndex} input[data-field="${field}"]`,
  )[0]
  input?.focus()
}

const handleBlur = (rowIndex: number) => {
  const date = rows.value[rowIndex].startDate.replace(/[^0-9]/g, '')
  if (date.length < 4 && rowIndex !== rows.value.length - 1) {
    rows.value.splice(rowIndex, 1)
  }
}
const isRowComplete = (row: DateRow): boolean => {
  return (
    row.startDate.length === 5 &&
    row.startTime.length === 5 &&
    (!row.endDate || row.endDate.length === 5) &&
    (!row.endTime || row.endTime.length === 5)
  )
}

const addDate = async () => {
  const newRow: DateRow = {
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    showActions: true,
    showHint: false,
  }

  rows.value.push(newRow)

  await nextTick()
  focusInput(rows.value.length - 1, 'startDate')

  if (isRowComplete(newRow)) {
    updateDatesAndEmit()
  }
}

const deleteRow = (rowindex: number) => {
  rows.value.splice(rowindex, 1)
  updateDatesAndEmit()
}

const shiftDate = (dateStr: string, days: number): string => {
  if (!dateStr || dateStr.length !== 5) return ''
  const [day, month] = dateStr.split('.').map(Number)
  const date = new Date(2025, month - 1, day + days)
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`
}

const duplicateRowWithShift = async (rowIndex: number, days: number) => {
  const currentRow = rows.value[rowIndex]
  const newStartDate = shiftDate(currentRow.startDate, days)
  const newEndDate = currentRow.endDate ? shiftDate(currentRow.endDate, days) : ''

  const newRow: DateRow = {
    startDate: newStartDate,
    startTime: currentRow.startTime,
    endDate: newEndDate,
    endTime: currentRow.endTime,
    showActions: true,
    showHint: false,
  }
  rows.value.splice(rowIndex + 1, 0, newRow)

  await nextTick()
  focusInput(rowIndex + 1, 'startTime')

  // Если новая строка полностью заполнена — обновляем dates и эмитим
  if (isRowComplete(newRow)) {
    updateDatesAndEmit()
  }
}
</script>

<template>
  <div class="form-group">
    <div class="form-date">
      <div
        class="form-date__row"
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        :class="`row-${rowIndex}`"
      >
        <div class="form-date__item">
          <div class="form-date__element form-item">
            <label class="form-item__label">Начало</label>
            <div class="form-date__dates">
              <div class="form-date__values field" :class="{ filled: row.startDate.length === 5 }">
                <img src="/icons/black-calendar.svg" />
                <input
                  class="form-date__input form-date__input-date"
                  type="text"
                  placeholder="ДД.ММ"
                  v-model="row.startDate"
                  data-field="startDate"
                  @input="(e) => handleInput(e, rowIndex, 'startDate', true)"
                  @blur="() => handleBlur(rowIndex)"
                />
              </div>
              <div
                class="form-date__values field"
                :class="{ filled: row.startTime.length === 5, disabled: row.startDate.length < 5 }"
              >
                <img src="/icons/black-time.svg" />
                <input
                  class="form-date__input form-date__input-time"
                  type="text"
                  placeholder="ЧЧ:ММ"
                  v-model="row.startTime"
                  data-field="startTime"
                  @input="(e) => handleInput(e, rowIndex, 'startTime', false)"
                  :disabled="row.startDate.length < 5"
                />
              </div>
            </div>
          </div>

          <span class="form-date__item-separator"></span>

          <div class="form-date__element form-item">
            <label class="form-item__label">Окончание</label>
            <div class="form-date__dates">
              <div
                class="form-date__values field"
                :class="{ filled: row.endDate.length === 5, disabled: row.startDate.length < 5 }"
              >
                <img src="/icons/black-calendar.svg" />
                <input
                  class="form-date__input form-date__input-date"
                  type="text"
                  placeholder="ДД.ММ"
                  v-model="row.endDate"
                  data-field="endDate"
                  @input="(e) => handleInput(e, rowIndex, 'endDate', true)"
                  :disabled="row.startDate.length < 5"
                />
              </div>
              <div
                class="form-date__values field"
                :class="{ filled: row.endTime.length === 5, disabled: row.startDate.length < 5 }"
              >
                <img src="/icons/black-time.svg" />
                <input
                  class="form-date__input form-date__input-time"
                  type="text"
                  placeholder="ЧЧ:ММ"
                  v-model="row.endTime"
                  data-field="endTime"
                  @input="(e) => handleInput(e, rowIndex, 'endTime', false)"
                  :disabled="row.startDate.length < 5"
                />
              </div>
            </div>
            <p
              v-if="row.showHint"
              class="form-date__hint"
              style="opacity: 1; transform: translateY(0)"
            >
              Введите дату начала!
            </p>
          </div>

          <div v-if="authStore.currentUser?.role == 'organizer'" class="form-date__actions">
            <MinusButton v-if="rowIndex !== 0" @click="deleteRow(rowIndex)" />
            <AppButton mini @click="duplicateRowWithShift(rowIndex, 1)"> + День</AppButton>
            <AppButton mini @click="duplicateRowWithShift(rowIndex, 7)"> + Неделя</AppButton>
          </div>
          <div v-else class="form-date__actions">
            <MinusButton v-if="rowIndex !== 0" @click="deleteRow(rowIndex)" />
          </div>
        </div>
      </div>

      <div
        v-if="authStore.currentUser?.role != 'organizer'"
        class="form-date__actions"
        style="opacity: 1; transform: translateY(0)"
      >
        <AppButton class="form-date__add-day-btn" @click="addDate"> + Добавить дату</AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/helpers' as *;

.button {
  padding: vw(19);
  font-weight: 600;
  font-size: vw(18);
  line-height: 1.11;
  color: var(--color-white);
  background: var(--color-primary-700);
  border-radius: vw(10);
  border: vw(1) solid var(--color-primary-700);
  stroke: currentColor;

  &--icon {
    display: flex;
    align-items: center;
    gap: vw(10);
  }

  &--danger {
    color: var(--color-danger);
  }

  &--outline {
    background: none;
    border-color: currentColor;
  }
}

.form-group {
  padding: vw(20);

  + .form-group {
    border-top: vw(1) solid var(--color-gray-300);
  }
}

.field {
  display: block;
  width: 100%;
  padding: vw(10);
  border: vw(1) solid var(--color-gray-300);
  border-radius: vw(10);
  font-weight: 400;
  font-size: vw(18);
  line-height: 1.11;
  color: #000;
  background: var(--color-gray-100);

  transition:
    border-color 0.33s ease,
    background 0.33s ease;

  &::placeholder {
    color: var(--color-gray-700);
    font-size: inherit;
  }

  &:focus,
  &:has(input:focus) {
    border-color: var(--color-primary-700);
  }

  &--textarea {
    min-height: vw(120);
  }
}

:is(input, textarea).field:not(:placeholder-shown),
.field:has(input:not(:placeholder-shown)) {
  background: var(--color-white);
}

.form-date {
  // .form-date__row
  &__dates {
    display: flex;
    gap: vw(5);
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: vw(10);
  }

  &__row + &__row {
    margin-top: vw(20);
  }

  // .form-date__item

  &__item {
    display: flex;
    align-items: center;
    gap: vw(10);
  }

  // .form-date__element&& rowIndex != 0

  &__element {
    max-width: vw(205);
  }

  // .form-date__values
  .disabled,
  .filled {
    border-color: var(--color-primary-700);
  }

  &__values {
    display: flex;
    gap: vw(5);

    &:disabled {
      border-color: var(--color-primary-700);
    }
  }

  &__hint {
    height: 0;
    font-size: vw(10);
    color: var(--color-danger);
    margin-top: vw(2);
  }

  // .form-date__input

  &__input {
    width: 5ch;
    font-size: inherit;
    font-family: inherit;

    &::placeholder {
      color: var(--color-gray-700);
      font-family: inherit;
      font-size: inherit;
      text-transform: lowercase;
    }
  }

  // .form-date__item-separator

  &__item-separator {
    align-self: flex-end;
    height: vw(1);
    width: vw(10);
    margin: vw(20) 0;
    background: var(--color-gray-600);
  }

  // .form-date__actions

  &__actions {
    display: flex;
    align-items: flex-end;
    gap: vw(10);
    margin-top: vw(20);
  }

  // .form-date__remove-btn

  &__add-day-btn,
  &__remove-btn {
    padding: vw(10);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__remove-btn {
    height: vw(24);
    width: vw(24);
    align-self: self-end;
  }

  &__remove-btn {
    &::before {
      content: '';
      display: block;
      width: vw(14);
      height: vw(2);
      background: var(--color-danger);
      border-radius: 50%;
    }
  }
}
</style>
