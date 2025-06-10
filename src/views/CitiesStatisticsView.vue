<script setup lang="ts">
import { ref } from 'vue'
import AppTable from '@/components/AppTable.vue'
import { useModeratorStore } from '@/stores/moderator.ts'
import type { CityStatistics } from '@/types/city.ts'
import AppHeader from '@/components/AppHeader.vue'

const moderatorStore = useModeratorStore()

const tableData = ref<CityStatistics[]>([])

moderatorStore.getCitiesStatistics().then((res) => tableData.value.push(...res))
</script>
<template>
  <AppHeader>
    <hi class="title">Статистика</hi>
  </AppHeader>
  <AppTable class="event-table">
    <template #thead>
      <tr>
        <th class="table-cell--id">
          <div>ID</div>
        </th>
        <th class="table-cell--active">
          <div>Активных мероприятий</div>
        </th>
        <th class="table-cell--top">
          <div>Просмотры pwa/tg</div>
        </th>
        <th class="table-cell--user">
          <div>Переходы</div>
        </th>
        <th class="table-cell--email">
          <div>В избранном</div>
        </th>
      </tr>
    </template>
    <template #tbody>
      <tr v-for="row in tableData" :key="row.id">
        <td class="table-cell--id">
          {{ row.id }}
        </td>
        <td id="tr-body" class="table-cell--active">
          {{ row.events_active }}
        </td>
        <td class="table-cell--top">
          {{ row.stat_view_pwa + '/' + row.stat_view_tg }}
        </td>
        <td class="table-cell--user">
          {{ row.stat_redirect }}
        </td>
        <td class="table-cell--email">
          {{ row.stat_fave }}
        </td>
      </tr>
    </template>
  </AppTable>
</template>

<style scoped lang="scss">
.table-cell {
  &--id {
    text-align: center;
    min-width: vw(100);
  }

  &--user {
    text-align: center;
    min-width: vw(100);
  }

  &--email {
    width: 20%;
  }

  &--title {
    width: 30%;
  }

  &--views {
    text-align: center;
  }

  &--redirect {
    text-align: center;
  }

  &--favorite {
    text-align: center;
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

.event-table {
  border-radius: vw(20) 0 0 0;
}

.header {
  padding: vw(20);
  border-bottom: vw(1) solid var(--color-gray-300);
  display: flex;
  gap: vw(10);
}

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
