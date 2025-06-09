<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AppTable from '@/components/AppTable.vue'
import { useEventsStore } from '@/stores/events.ts'
import type { EventCard } from '@/types/events.ts'
import DeleteButton from '@/components/DeleteButton.vue'
import { formatDate } from '@/utils/dateConverter.ts'
import router from '@/router'

const infiniteScrollTrigger = ref(null)
let observer: IntersectionObserver
const eventStore = useEventsStore()

const tableData = ref<EventCard[]>([])

eventStore.getEvents().then((res) => tableData.value.push(...res))

const filteredEvents = ref(tableData.value)

const eventsOnModeration = computed(() =>
  filteredEvents.value.filter((el) => el.is_validated === undefined),
)
const eventsBanned = computed(() => filteredEvents.value.filter((el) => el.is_validated === false))
const eventApproved = computed(() => filteredEvents.value.filter((el) => el.is_validated === true))
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

const goTo = (name: string) => router.push({ name: name })

const editEvent = (id: number) => router.push({ name: 'event-edit', params: { id: id } })
</script>

<template>
  <header class="controls">
    <h1 class="title">Мероприятия</h1>
    <button @click="goTo('event-create')" class="create-button">+ Создать Мероприятие</button>
  </header>
  <AppTable class="event-table">
    <template #thead>
      <tr class="table-header">
        <th class="table-cell--image">
          <div>Фото</div>
        </th>
        <th class="table-cell--name">
          <div>Название</div>
        </th>
        <th class="table-cell--start-date">
          <div>Дата начала</div>
        </th>
        <th class="table-cell--end-date">
          <div>Дата окончания</div>
        </th>
      </tr>
    </template>
    <template #tbody>
      <tr class="sub-header">
        <td class="sub-header-cell" colspan="4">
          <div>На модерации</div>
        </td>
      </tr>
      <tr v-for="(row, index) in filteredEvents.filter(
        (el) => el.is_validated === null || el.is_validated === undefined,
      )" @click.stop="editEvent(row.id)" :key="row.id">
        <td class="table-cell--image">
          <img :src="row.image" />
        </td>
        <td class="table-cell--name">
          {{ row.name }}
        </td>
        <td class="table-cell--start-date">
          <span class="table-cell--date-text">Дата начала: </span>
          <div>{{ formatDate(row.date_from) }}</div>
        </td>
        <td class="table-cell--end-date">
          <span class="table-cell--date-text">Дата окончания: </span>
          <div>
            <div>{{ row.date_to ? formatDate(row.date_to) : '' }}</div>
            <div class="cell action-cell">
              <DeleteButton @delete="deleteEvent(row.id, index)" class="delete" />
            </div>
          </div>
        </td>
      </tr>
      <tr class="sub-header">
        <td class="sub-header-cell" colspan="4">
          <div>Опубликованные</div>
        </td>
      </tr>
      <tr v-for="(row, index) in filteredEvents.filter((el) => el.is_validated === true)"
        @click.stop="editEvent(row.id)" :key="row.id">
        <td class="table-cell--image">
          <img :src="row.image" />
        </td>
        <td class="table-cell--name">
          {{ row.name }}
        </td>
        <td class="table-cell--start-date">
          {{ formatDate(row.date_from) }}
        </td>
        <td class="table-cell--end-date">
          <div>
            <div>{{ row.date_to ? formatDate(row.date_to) : '' }}</div>
            <div class="cell action-cell">
              <DeleteButton @delete="deleteEvent(row.id, index)" class="delete" />
            </div>
          </div>
        </td>
      </tr>
      <tr class="sub-header">
        <td class="sub-header-cell" colspan="4">
          <div>Не прошедшие модерацию</div>
        </td>
      </tr>
      <tr v-for="(row, index) in filteredEvents.filter((el) => el.is_validated === false)"
        @click.stop="editEvent(row.id)" :key="row.id">
        <td class="table-cell--image">
          <img :src="row.image" />
        </td>
        <td class="table-cell--name">
          {{ row.name }}
        </td>
        <td class="table-cell--start-date">
          {{ formatDate(row.date_from) }}
        </td>
        <td class="table-cell--end-date">
          <div>
            <div>{{ row.date_to ? formatDate(row.date_to) : '' }}</div>
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

  .table-cell--image {
    width: vw(110);
    width: 110px;
    text-align: left;
    font-size: vw(15);
    font-weight: 500;
    line-height: vw(20);

    div {
      font-weight: 500;
    }
  }

  .table-cell--name,
  .table-cell--start-date,
  .table-cell--end-date {
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

.sub-header {
  margin: 0;
  height: vw(23) !important;
  display: block;

  @media (max-width: 991px) {
    height: vw(20, $mobile) !important;
    min-height: vw(23, $mobile) !important;
    padding: 0 !important;
    margin-top: 0;
  }
}

.sub-header-cell {
  position: relative;
  overflow: visible;
  width: vw(110);
  height: 0;
  margin: 0;

  div {
    position: absolute;
    top: vw(-10);
    left: 0;
    width: vw(300);
    margin: 0;
    font-size: vw(15);
    font-weight: 500;
    line-height: vw(20);

    @media (max-width: 991px) {
      font-size: vw(15, $mobile);
      line-height: vw(20, $mobile);
      top: 0;
      width: vw(300, $mobile);
    }
  }
}


.table-cell--end-date>div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 0;

  .action-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
}

.table-cell {
  &--image {
    text-align: center;
    padding: vw(9) vw(10) !important;
    padding-right: 0 !important;
    box-sizing: border-box;
    height: vw(110);
    line-height: 1;

    img {
      object-fit: contain;
      width: vw(100);
      height: vw(90);
      margin: 0 !important;
      padding: 0 !important;
      border: none;
      display: block;

      @media (max-width: 991px) {
        display: none;
      }
    }
  }

  &--name {
    padding: vw(10);
    color: var(--color-gray-900);
    font-size: vw(16);
    font-weight: 400;
    line-height: vw(20);
  }

  &--start-date {
    padding: vw(10);
    color: var(--color-gray-900);
    font-size: vw(16);
    font-weight: 400;
    line-height: vw(20);

    @media (max-width: 991px) {
      font-size: vw(16, $mobile);
      line-height: vw(20, $mobile);
    }
  }

  &--end-date {
    text-align: left;
    color: var(--color-gray-900);
    font-size: vw(16);
    font-weight: 400;
    line-height: vw(20);
    min-width: vw(100);
    padding: vw(10);

    @media (max-width: 991px) {
      font-size: vw(16, $mobile);
      line-height: vw(20, $mobile);
    }

    div>div {
      font-weight: 400;
    }

    div {
      margin-left: 0;
    }
  }

  &--date-text {
    display: none;

    @media (max-width: 991px) {
      display: inline-block;
      font-size: vw(16, $mobile);
      line-height: vw(20, $mobile);
      width: vw(135, $mobile);
      margin: 0;
      margin-right: vw(20, $mobile);
    }
  }

  &--email {
    width: 20%;
  }

  &--title {
    width: 30%;
  }
}

.table-cell--date > div {
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
  padding: vw(20) vw(40);
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
  gap: vw(10);

  @media (max-width: 991px) {
    background-color: var(--color-gray-100);
    padding: 0;
    border-radius: 0;
  }

  .title {
    font-weight: 700;
    font-size: vw(30);
    line-height: vw(40);
    letter-spacing: vw(0.3);
    color: var(--color-black);
    margin: 0;
    flex: 1;
    display: flex;
    align-items: center;

    @media (max-width: 991px) {
      font-size: vw(30, $mobile);
      line-height: vw(40, $mobile);
      font-weight: 600;
      margin-bottom: vw(5, $mobile);
    }
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

th {
  .table-cell--end-date {
    text-align: left;
  }
}

.event-table {
  tbody tr {
    height: vw(108);

    @media (max-width: 991px) {
      position: relative;
      height: auto;
      min-height: vw(115, $mobile);
      padding: vw(15, $mobile) vw(20, $mobile);
      padding-right: vw(68, $mobile);
      padding-bottom: vw(10, $mobile);
      border: none;
    }
  }

  .table-cell--image {
    height: vw(108);
    width: vw(110);
    width: 110px;

    @media (max-width: 991px) {
      display: none;
    }

    * {
      margin: 0 !important;
    }
  }

  .table-cell--name {
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

  .table-cell--start-date {
    @media (max-width: 991px) {
      padding: 0;
      border: none;
      margin-bottom: vw(10, $mobile);

      div {
        margin: 0;
        display: inline-block;
      }
    }
  }

  .table-cell--end-date {
    @media (max-width: 991px) {
      padding: 0;
      border: none;
      margin-bottom: vw(10, $mobile);

      div {
        margin: 0;
        display: inline-block;
      }
    }
  }

  .action-cell {
    @media (max-width: 991px) {
      position: absolute;
      right: vw(20, $mobile);
      top: 50%;
      transform: translateY(-50%);
      width: vw(40, $mobile);
      height: vw(40, $mobile);

      .delete-button {
        width: vw(40, $mobile);
        height: vw(40, $mobile);
      }
    }
  }
}

.event-table .table-header {
  height: vw(40) !important;

  .table-cell--image {
    height: vw(40) !important;
  }
}
</style>
