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
    <hi class="title">Статистика по городам</hi>
  </AppHeader>
  <AppTable class="event-table">
    <template #thead>
      <tr>
        <th class="table-cell--city">
          <div>Город</div>
        </th>
        <th class="table-cell--active">
          <div>Активных</div>
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
      <tr v-for="row in tableData" :key="row.id">
        <td class="table-cell--city">
          {{ row.id }}
        </td>
        <td id="tr-body" class="table-cell--active">
          <div class="mobile-text">Активных:</div>
          {{ row.events_active }}
        </td>
        <td class="table-cell--views">
          <div class="mobile-text">Статистика:</div>
          {{ row.stat_view_pwa + '/' + row.stat_view_tg }}
        </td>
        <td class="table-cell--redirect">
          {{ row.stat_redirect }}
        </td>
        <td class="table-cell--favorite">
          {{ row.stat_fave }}
        </td>
      </tr>
    </template>
  </AppTable>
</template>

<style scoped lang="scss">
tbody tr {
  @media (max-width: 991px) {
    min-height: vw(125, $mobile);
    padding-top: vw(15, $mobile);
    padding-bottom: vw(80, $mobile);
  }
}

.table-cell {
  &--city {
    text-align: center;
    width: vw(115);

    @media (max-width: 991px) {
      font-size: vw(22, $mobile);
      line-height: vw(30, $mobile);
      font-weight: 600;
      padding: 0;
      border: none;
    }
  }

  &--active {
    text-align: left;
    padding-left: vw(40);

    @media (max-width: 991px) {
      position: absolute;
      bottom: vw(44, $mobile);
      left: vw(20, $mobile);
      width: vw(230, $mobile);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: vw(39, $mobile);
      font-size: vw(16, $mobile);
      line-height: vw(20, $mobile);
      color: var(--color-gray-700);
      padding: 0;

      .mobile-text {
        width: vw(86, $mobile);
      }
    }
  }
}
</style>
