<script setup lang="ts">
import { onMounted, reactive, ref, watch, watchEffect } from 'vue'
import AppAccordion from '@/components/AppAccordion.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'
import { useModeratorStore } from '@/stores/moderator.ts'

const selectedID = defineModel<number[]>()

const moderatorStore = useModeratorStore()
const closeOthers = (index: number, flag: boolean = false) => {
  for (let i = 0; i < model.value.length; i++) {
    model.value[i] = i == index ? flag : false
  }
}

const model = ref<boolean[]>(moderatorStore.rubrics.map((_, index) => index == 0))
const selectedFilters = reactive<Record<string, Record<number, boolean>>>({})
watchEffect(() => {
  moderatorStore.rubrics.forEach((filter) => {
    if (!selectedFilters[filter.group_name]) {
      selectedFilters[filter.group_name] = {}
    }
    filter.group_content.forEach((item) => {
      if (selectedFilters[filter.group_name][item.id] === undefined) {
        selectedFilters[filter.group_name][item.id] = false
      }
    })
  })
})

watch(
  () => selectedFilters,
  () => {
    const selected: number[] = []
    for (const selectedFiltersKey in selectedFilters) {
      for (const id in selectedFilters[selectedFiltersKey]) {
        if (selectedFilters[selectedFiltersKey][id]) selected.push(Number(id))
      }
    }
    selectedID.value = selected
  },
  { deep: true },
)

function resetSelectedFilters() {
  for (const filter of moderatorStore.rubrics) {
    if (!selectedFilters[filter.group_name]) {
      selectedFilters[filter.group_name] = {}
    }

    for (const item of filter.group_content) {
      selectedFilters[filter.group_name][item.id] = selectedID.value?.includes(item.id) ?? false
    }
  }
}

onMounted(() => {
  resetSelectedFilters()
})
</script>

<template>
  <div class="content-card">
    <div class="content-card__inner">
      <div class="content-card__head">
        <h3 class="content-card__title">Категории</h3>
      </div>

      <div class="content-card__body">
        <div @click.stop class="filters__list">
          <AppAccordion @closeOthers="(flag: boolean = false) => closeOthers(filterIndex, flag)"
            v-for="(filter, filterIndex) of moderatorStore.rubrics" class="filters__item" v-model="model[filterIndex]"
            :key="filterIndex">
            <template #btn>
              {{ filter.group_name }}
            </template>
            <template #content>
              <div class="filters__item-main">
                <AppCheckbox @click.stop v-for="(item, itemIndex) of filter.group_content"
                  class="filters__item-checkbox" v-model="selectedFilters[filter.group_name][item.id]" :key="itemIndex">
                  {{ item.type_name }}
                </AppCheckbox>
              </div>
            </template>
          </AppAccordion>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/helpers' as *;

.content-card {
  box-shadow: 0 vw(5) vw(15) 0 rgba(39, 18, 47, 0.1);
  border-radius: vw(20);
  background: var(--color-white);

  @media (max-width: 991px) {
    border-radius: vw(20, $mobile);
  }

  +.content-card {
    margin-top: vw(20);
  }

  // .content-card__inner

  &__inner {}

  // .content-card__head

  &__head {
    padding: vw(10) vw(20);
    background: var(--color-gray-300);
    border-radius: vw(20) vw(20) 0 0;

    @media (max-width: 991px) {
      padding: vw(15, $mobile) vw(20, $mobile);
      border-radius: vw(20, $mobile) vw(20, $mobile) 0 0;
      border-top: none;
    }
  }

  // .content-card__title

  &__title {
    font-weight: 600;
    font-size: vw(18);
    line-height: 1.67;
    color: var(--color-gray-1000);

    @media (max-width: 991px) {
      font-size: vw(22, $mobile);
      line-height: vw(30, $mobile);
      font-weight: 600;
    }
  }

  // .content-card__body

  &__body {
    padding: vw(20);
    font-size: vw(16);
    line-height: vw(25);

    @media (max-width: 991px) {
      padding: vw(20, $mobile);
      font-size: vw(18, $mobile);
      line-height: vw(25, $mobile);
    }
  }
}
</style>
