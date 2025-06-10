<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import AppTable from '@/components/AppTable.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'
import { useEventsStore } from '@/stores/events.ts'
import type { EventCard } from '@/types/events.ts'
import DeleteButton from '@/components/DeleteButton.vue'
import router from '@/router'
import { formatDate } from '@/utils/dateConverter.ts'

const infiniteScrollTrigger = ref(null)
let observer: IntersectionObserver
const eventStore = useEventsStore()

const tableData = ref<EventCard[]>([])

eventStore.getEvents().then((res) => tableData.value.push(...res))

const searchQuery = ref('')
const activeOnly = ref(false)

const filterEvents = () => {
  filteredEvents.value = tableData.value.filter(
    (el) =>
      (activeOnly.value === el.is_hidden || !activeOnly.value) &&
      el.user_name.includes(searchQuery.value),
  )
}

const filteredEvents = ref(tableData.value)
let firstCall = true
onMounted(() => {
  setTimeout(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && eventStore.nextPage && !firstCall) {
          eventStore.loadMore().then((res) => tableData.value.push(...res))
        }
        firstCall = false
      },
      {
        rootMargin: '100px',
      },
    )

    if (infiniteScrollTrigger.value) observer.observe(infiniteScrollTrigger.value)
  }, 600)
})

onBeforeUnmount(() => {
  if (observer && infiniteScrollTrigger.value) observer.unobserve(infiniteScrollTrigger.value)
})

const deleteEvent = (id: number, index: number) => {
  eventStore.deleteEvent(id).then(() => {
    tableData.value.splice(index, 1)
  })
}

const statusToogle = (
  event: EventCard,
  data: { [key in keyof Pick<EventCard, 'is_hidden' | 'top'>]?: boolean },
) => {
  eventStore.updateEventsStatus([
    {
      id: event.id,
      ...data,
    },
  ])
}

const goTo = (name: string) => router.push({ name: name })

const editEvent = (id: number) => router.push({ name: 'event-edit', params: { id: id } })

const isHiddenChange = (row: EventCard, newValue: boolean) => {
  row.is_hidden = newValue
  statusToogle(row, { is_hidden: newValue })
}
</script>

<template>
  <h1 class="title">Мероприятия</h1>
  <header class="controls">
    <SearchBar v-model:search-query="searchQuery" v-model:activeOnly="activeOnly" @search="filterEvents" />
    <button @click="goTo('event-create')" class="create-button">+ Создать Мероприятие</button>
  </header>
  <AppTable class="event-table">
    <template #thead>
      <tr class="table-header">
        <th class="table-cell--id">
          <div>ID</div>
        </th>
        <th class="table-cell--active">
          <div>Active</div>
        </th>
        <th class="table-cell--top">
          <div>Топ</div>
        </th>
        <th class="table-cell--user">
          <div>Создано</div>
        </th>
        <th class="table-cell--email">
          <div>E-mail</div>
        </th>
        <th class="table-cell--title">
          <div>Название</div>
        </th>
        <th class="table-cell--date">
          <div>Дата начала</div>
        </th>
      </tr>
    </template>
    <template #tbody>
      <tr v-for="(row, index) in filteredEvents" @click.stop="editEvent(row.id)" :class="{
        'is-warning': row.is_validated === null || row.is_validated === undefined,
        'is-error': row.is_validated === false,
      }" :key="row.id">
        <td class="table-cell--id">
          <div class="mobile-text">ID:</div>
          <div>{{ row.id }}</div>
          <div class="mobile-text mobile-text--separator">|</div>
        </td>
        <td class="table-cell--active">
          <div>
            <AppCheckbox :model-value="!row.is_hidden" @update:model-value="() => isHiddenChange(row, !row.is_hidden)"
              @click.stop />
          </div>
          <div class="mobile-text">Active</div>
        </td>
        <td class="table-cell--top">
          <div>
            <AppCheckbox @click.stop="statusToogle(row, { top: row.top })" v-model="row.top" />
          </div>
          <div class="mobile-text">Топ</div>
        </td>
        <td class="table-cell--user">
          <div class="mobile-text">опубликовано </div>
          <div>{{ row.user_id }}</div>
          <div class="mobile-text"> часа. назад</div>
        </td>
        <td class="table-cell--email">
          <div>{{ row.user_name }}</div>
        </td>
        <td class="table-cell--title">
          <div>{{ row.name }}</div>
        </td>
        <td class="table-cell--date">
          <div>
            <div class="date-text">{{ formatDate(row.date_from) }}</div>
            <div class="cell action-cell">
              <DeleteButton @delete="deleteEvent(row.id, index)" class="delete" />
            </div>
          </div>
        </td>
      </tr>
    </template>
  </AppTable>
  <div ref="infiniteScrollTrigger"></div>
</template>

<style scoped lang="scss">
.title {
  display: none;

  @media (max-width: 991px) {
    display: block;
    font-size: vw(30, $mobile);
    line-height: vw(40, $mobile);
    font-weight: 600;
    margin-bottom: vw(20, $mobile);
  }
}

.table-header {
  font-size: vw(15);
  font-weight: 500;
  line-height: vw(20);
  background-color: var(--color-gray-2);

  th {
    border: vw(1) solid var(--color-gray-3);
    border-bottom-color: var(--color-gray-3);
    padding: vw(9) vw(10);

    &:first-child {
      border-left-color: var(--color-gray-3);
    }

    &:last-child {
      border-right-color: var(--color-gray-3);
    }
  }

  .table-cell--email {
    font-size: vw(15);
    font-weight: 500;
    line-height: vw(20);
    border-left: vw(1) solid var(--color-gray-3);
    text-align: left;

    div {
      font-weight: 500;
    }
  }

  .table-cell--start-date {
    width: vw(155);
  }

  .table-cell--end-date {
    width: vw(225);
  }
}

tr {
  @media (max-width: 991px) {
    position: relative;
    height: auto;
    min-height: vw(160, $mobile);
    padding: vw(15, $mobile) vw(20, $mobile);
    padding-right: vw(68, $mobile);
    padding-top: vw(45, $mobile);
    padding-bottom: vw(83, $mobile);
    border: none;
    border-radius: vw(16, $mobile);
  }
}

.table-cell {
  &--title {
    @media (max-width: 991px) {
      order: 2;
      font-size: vw(22, $mobile);
      line-height: vw(30, $mobile);
      font-weight: 600;
      padding: 0;
      border: none;

      div {
        margin: 0;
      }
    }
  }

  &--id {
    text-align: center;
    width: vw(73);

    @media (max-width: 991px) {
      position: absolute;
      bottom: vw(49, $mobile);
      left: vw(20, $mobile);
      width: vw(71, $mobile);
      display: flex;
      flex-direction: row;
      gap: vw(4, $mobile);
      font-size: vw(16, $mobile);
      line-height: vw(20, $mobile);
      color: var(--color-gray-700);
    }

    div {
      margin: 0;
    }

    .mobile-text {
      display: none;

      @media (max-width: 991px) {
        display: block;
      }
    }

    .mobile-text--separator {
      display: none;

      @media (max-width: 991px) {
        display: block;
        color: var(--color-gray-600);
        transform: translateY(-2px);
        flex: auto;
        text-align: right;
      }
    }
  }

  &--active,
  &--top {
    width: vw(66);

    @media (max-width: 991px) {
      position: absolute;
      bottom: vw(13, $mobile);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: vw(5, $mobile);
      flex-direction: row;
    }

    .mobile-text {
      display: none;

      @media (max-width: 991px) {
        display: block;
        font-size: vw(16, $mobile);
        line-height: vw(20, $mobile);
        margin-left: vw(2, $mobile);
      }
    }

    div {
      margin: 0;
    }

    .content-wrap {
      display: block !important;

      @media (max-width: 991px) {
        width: vw(20, $mobile);
        height: vw(20, $mobile);

        div {
          margin: 0;
          display: block !important;
        }
      }
    }
  }

  &--active {
    &>div {
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 991px) {
        display: block;
      }
    }

    @media (max-width: 991px) {
      left: vw(18, $mobile);
      width: vw(80, $mobile);
    }
  }

  &--top {
    &>div {
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 991px) {
        display: block;
      }
    }

    @media (max-width: 991px) {
      left: vw(105, $mobile);
      width: vw(80, $mobile);
    }
  }

  &--user {
    text-align: center;
    width: vw(84);

    div {
      margin: 0;
    }

    @media (max-width: 991px) {
      position: absolute;
      top: vw(15, $mobile);
      left: vw(114, $mobile);
      width: vw(180, $mobile);
      display: flex;
      flex-direction: row;
      font-size: vw(12, $mobile);
      line-height: vw(20, $mobile);
      gap: vw(4, $mobile);
      color: var(--color-gray-600);
    }

    .mobile-text {
      display: none;

      @media (max-width: 991px) {
        display: block;
      }
    }
  }

  &--email {
    width: 20%;

    @media (max-width: 991px) {
      position: absolute;
      bottom: vw(47, $mobile);
      left: vw(101, $mobile);
      font-size: vw(20, $mobile);
      line-height: vw(30, $mobile);
      color: var(--color-gray-700);
    }

    div {
      margin: 0;
    }
  }

  &--date {
    width: vw(205);
    padding-left: vw(10);

    div {
      margin: 0;
      margin-right: vw(10);
    }
  }
}

.date-text {
  @media (max-width: 991px) {
    position: absolute;
    top: vw(15, $mobile);
    left: vw(20, $mobile);
    font-size: vw(16, $mobile);
    line-height: vw(20, $mobile);
  }
}

.delete-button {
  @media (max-width: 991px) {
    position: absolute;
    right: vw(20, $mobile);
    top: 50%;
    transform: translateY(-50%);
    width: vw(40, $mobile);
    height: vw(40, $mobile);
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
  padding: vw(19) vw(20);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: vw(20);

  @media (max-width: 991px) {
    padding: 0;
  }
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
  border: vw(1) solid var(--color-primary-700);
  border-radius: vw(10);
  padding: vw(10);
  font-size: vw(18);
  font-weight: 500;
  line-height: vw(20);
  letter-spacing: vw(0.4);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  @media (max-width: 991px) {
    display: none;
  }

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
}
</style>
