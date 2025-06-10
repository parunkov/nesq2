<script setup lang="ts">
import AppDropDown from '@/components/AppDropDown.vue'
import EventDates from '@/components/EventDates.vue'
import PriceInput from '@/components/PriceInput.vue'
import { useModeratorStore } from '@/stores/moderator.ts'
import type { Event } from '@/types/events.ts'
import { computed } from 'vue'
import AppInput from '@/components/AppInput.vue'

const moderatorStore = useModeratorStore()

const cities = computed(() => {
  return moderatorStore.cities.map((el) => {
    return { id: el.id, value: el.city_name }
  })
})

const dates = defineModel<Event['datetime']>('dates')
const address = defineModel<Event['address']>('address')
const prices = defineModel<Event['prices']>('prices')
const city = defineModel<Event['city']>('city')
const changeCity = (id: number) => {
  city.value = id
}
const updateDates = (datesData: Event['datetime']) => {
  dates.value = datesData
}
</script>

<template>
  <div class="content-card">
    <div class="content-card__inner">
      <div class="content-card__head">
        <h3 class="content-card__title">Информация</h3>
      </div>

      <div class="content-card__body">
        <div class="form-group">
          <div class="form-item">
            <label for="" class="form-item__label">Город</label>

            <AppDropDown
              class="input"
              :start-value="city"
              :options="cities"
              @change-value="(option) => changeCity(Number(option.id))"
            />
          </div>
          <div class="form-item">
            <label for="" class="form-item__label">Адрес</label>
            <AppInput v-model="address" placeholder=" " />
          </div>
        </div>

        <EventDates
          :start-dates="dates"
          @update-dates="(datesData: Event['datetime']) => updateDates(datesData)"
        />

        <PriceInput v-model="prices" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-card {
  box-shadow: 0 vw(5) vw(15) 0 rgba(39, 18, 47, 0.1);
  border-radius: vw(20);
  background: var(--color-white);

  + .content-card {
    margin-top: vw(20);
  }

  // .content-card__inner

  &__inner {
  }

  // .content-card__head

  &__head {
    padding: vw(10) vw(20);
    background: var(--color-gray-300);
    border-radius: vw(20) vw(20) 0 0;
  }

  // .content-card__title

  &__title {
    font-weight: 600;
    font-size: vw(18);
    line-height: 1.67;
    color: var(--color-gray-1000);
  }

  // .content-card__body

  &__body {
  }
}

.form-group {
  padding: vw(20);

  + .form-group {
    border-top: vw(1) solid var(--color-gray-300);
  }
}

.form-item {
  // .form-block__label

  &__label {
    display: block;
    margin-bottom: vw(5);
    font-weight: 500;
    font-size: vw(16);
    line-height: 1.56;
    color: var(--color-gray-900);
  }
}

.dropdown {
  position: relative;

  // .dropdown__trigger

  &--active &__trigger {
    border-color: var(--color-primary-700);

    &::after {
      transform: rotate(180deg);
    }
  }

  &__trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: vw(10);
    cursor: pointer;

    &.field {
      background: var(--color-white);
    }

    &::after {
      content: url('data:image/svg+xml,<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="%23444145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>');
      line-height: 0;
      transition: transform 0.33s ease;
    }
  }

  // .dropdown__wrapper

  &__wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.5s ease-in-out;

    &[aria-hidden='false'] {
      grid-template-rows: 1fr;
    }
  }

  // .dropdown__inner

  &__inner {
    overflow: hidden;
  }

  // .dropdown__content

  &__content {
    padding-top: vw(8);
  }

  // .dropdown__select-native

  &__select-native {
    position: absolute;
    width: vw(1);
    height: vw(1);
    margin: vw(-1);
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    clip-path: inset(50%);
  }
}

.dropdown-list {
  border: vw(1) solid var(--color-gray-300);
  border-radius: vw(10);
  background: var(--color-white);
  overflow: hidden;

  // .dropdown-list__item

  &__item {
    cursor: pointer;
    padding: vw(10);

    transition: background 0.33s ease;

    &:hover {
      background: var(--color-primary-300);
    }
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
  color: var(--color-black);
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
</style>
