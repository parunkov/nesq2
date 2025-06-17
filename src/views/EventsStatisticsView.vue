<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppTable from '@/components/AppTable.vue'
import { useEventsStore } from '@/stores/events.ts'
import type { EventCard } from '@/types/events.ts'
import AppHeader from '@/components/AppHeader.vue'
import { formatDate } from '@/utils/dateConverter.ts'

const infiniteScrollTrigger = ref(null)
let observer: IntersectionObserver
const eventStore = useEventsStore()

const tableData = ref<EventCard[]>([])

eventStore.getEvents().then((res) => {
  tableData.value.push(...res)
  eventStore.loadMore().then((res) => tableData.value.push(...res))
})

const filteredEvents = ref(tableData.value)

let firstCall = true
onMounted(() => {
  setTimeout(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        console.log('hey')
        if (entry.isIntersecting && eventStore.nextPage && !firstCall) {
          eventStore.loadMore().then((res) => tableData.value.push(...res))
        }
        firstCall = false
      },
      {
        rootMargin: '200px',
      },
    )

    if (infiniteScrollTrigger.value) observer.observe(infiniteScrollTrigger.value)
  }, 600)
})

onBeforeUnmount(() => {
  if (observer && infiniteScrollTrigger.value) observer.unobserve(infiniteScrollTrigger.value)
})

// const statusToogle = (event: EventCard) => {
//   eventStore.updateEventsStatus([
//     {
//       id: event.id,
//       is_validated: false,
//       is_hidden: event.is_hidden,
//       top: event.top,
//     },
//   ])
// }
</script>

<template>
  <AppHeader>
    <hi class="title">Статистика по мероприятиям</hi>
  </AppHeader>
  <AppTable class="event-table">
    <template #thead>
      <tr>
        <th class="table-cell--id">
          <div>ID</div>
        </th>
        <th class="table-cell--date">
          <div>Дата начала</div>
        </th>
        <th class="table-cell--email">
          <div>E-mail</div>
        </th>
        <th class="table-cell--title">
          <div>Название</div>
        </th>
        <th class="table-cell--views">
          <div>Просмотры<br>pwa/tg</div>
        </th>
        <th class="table-cell--redirect">
          <div>Переходы</div>
        </th>
        <th class="table-cell--favorite">
          <div>Избранное</div>
        </th>
      </tr>
    </template>
    <template #tbody>
      <tr v-for="row in filteredEvents" :class="{
        'is-warning': row.is_validated === null || row.is_validated === undefined,
        'is-error': row.is_validated === false,
      }" :key="row.id">
        <td class="table-cell--id">
          <div class="mobile-text">ID:</div>
          <div>{{ row.id }}</div>
          <div class="mobile-text mobile-text--separator">|</div>
        </td>
        <td class="table-cell--date">
          <div>
            <div class="date-text">{{ formatDate(row.date_from) }}</div>
            <div class="cell action-cell">
              <DeleteButton class="delete" />
            </div>
          </div>
        </td>
        <td class="table-cell--email">
          <div>{{ row.user_name }}</div>
        </td>
        <td class="table-cell--title">
          <div>{{ row.name }}</div>
        </td>
        <td class="table-cell--views">
          <div class="mobile-text">Статистика:</div>
          <div>{{ row.stat_view_pwa + `/` + row.stat_view_tg }}</div>
        </td>
        <td class="table-cell--redirect">
          <div>{{ row.stat_redirect }}</div>
        </td>
        <td class="table-cell--favorite">
          <div>{{ row.stat_fave }}</div>
        </td>
      </tr>
    </template>
  </AppTable>
  <div class="scroll" ref="infiniteScrollTrigger"></div>
</template>

<style scoped lang="scss">
.scroll {
  min-height: vw(20);
}

.table-cell {
  &--id {
    text-align: center;
  }

  &--user {
    text-align: center;
    min-width: vw(100);
  }

  &--date {
    width: vw(98);

    div {
      width: vw(98);
    }
  }
}

.table-cell--date>div {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .action-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
}

.controls {
  background-color: var(--color-white);
  border-radius: vw(20) 0 0 0;
  padding: vw(20);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: vw(20);
}

.search-bar {
  display: flex;
  align-items: center;
  gap: vw(10);
  padding: vw(10);
  background-color: var(--color-gray-100);
  border: vw(1) solid var(--color-gray-300);
  border-radius: vw(10);
  width: vw(235);
}

.create-button {
  background-color: var(--color-primary-700);
  color: var(--color-white);
  border: none;
  border-radius: vw(10);
  padding: vw(10);
  font-size: vw(18);
  font-weight: 500;
  cursor: pointer;
}

.table-container {
  background-color: var(--color-gray-100);
  overflow: hidden;
  flex: 1;
}
</style>
