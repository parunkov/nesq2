<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import type { Event } from '@/types/events.ts'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import { useAuthStore } from '@/stores/auth.ts'

const eventPrices = defineModel<Event['prices']>()

interface PriceValue {
  value: string
  id: number
}

const authStore = useAuthStore()

const prices = ref<PriceValue[]>(
  eventPrices.value && eventPrices.value.length > 0
    ? [
        ...eventPrices.value.map((el) => {
          return { value: el.replace('₽', ''), id: Date.now() }
        }),
      ]
    : [{ value: '', id: Date.now() }],
)

const addPrice = () => prices.value.push({ value: '', id: Date.now() + Math.random() })

const isFree = ref(false)

const handlePriceInput = async (index: number) => {
  if (authStore.currentUser?.role != 'organizer') return
  const string_price = String(prices.value[index].value)
  console.log(string_price.length)
  if (string_price.length > 6) prices.value[index].value = string_price.slice(0, 6)
  const price = prices.value[index]

  const isLast = index === prices.value.length - 1
  const isNotEmpty = price.value !== ''

  if (isLast && isNotEmpty) {
    prices.value.push({ value: '', id: Date.now() + Math.random() })
    await nextTick()
  }

  const isSecondLast = index === prices.value.length - 2
  if (isSecondLast && price.value === '' && prices.value[prices.value.length - 1]?.value === '') {
    prices.value.pop()
    await nextTick()
    return
  }

  if (!isLast && price.value === '') {
    prices.value.splice(index, 1)
    await nextTick()
  }
}

const deletePrice = (index: number) => {
  if (index < prices.value.length - 1) {
    prices.value.splice(index, 1)
  }
}

watch(
  () => prices.value,
  () => {
    eventPrices.value = prices.value.map((item) => String(item.value)).slice(0, -1)
  },
  { deep: true },
)

watch(
  () => isFree.value,
  () => {
    if (!isFree.value) eventPrices.value = prices.value.map((item) => item.value).slice(0, -1)
    else eventPrices.value = ['Не указана']
  },
)
</script>

<template>
  <div class="form-group">
    <div class="form-item">
      <label for="" class="form-item__label">Цена</label>

      <div class="form-price">
        <div class="form-price__values" :class="{ disabled: isFree }">
          <div class="" v-for="(item, index) in prices" :key="item.id">
            <AppInput
              @input="handlePriceInput(index)"
              v-model="item.value"
              type="number"
              :disabled="isFree"
              max="99999"
            >
              <template #left-slot>
                <span class="form-price__caption">₽</span>
              </template>
              <template #right-slot>
                <img
                  src="/icons/delete.svg"
                  class="form-price__delete-button"
                  @click="deletePrice(index)"
                />
              </template>
            </AppInput>
          </div>
          <AppButton v-if="authStore.currentUser?.role != 'organizer'" mini @click="addPrice"
            >+ Цена
          </AppButton>
        </div>

        <div class="form-price__free-checkbox custom-checkbox">
          <label class="custom-checkbox__label">
            <ToggleSwitch v-model="isFree" />
            <span class="custom-checkbox__caption">Бесплатно</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/helpers' as *;

.custom-checkbox {
  // .custom-checkbox__label

  &__label {
    display: flex;
    align-items: center;
    gap: vw(10);
  }

  // .custom-checkbox__checkbox

  &__checkbox {
    display: none;
  }

  &__checkbox:checked + &__decor::before {
    left: calc(100% - vw(27));
  }

  // .custom-checkbox__decor

  &__decor {
    position: relative;
    width: vw(54);
    height: vw(30);
    background: #f2f4f7;
    border-radius: vw(18);

    &::before {
      content: '';
      position: absolute;
      top: vw(3);
      left: vw(3);
      width: vw(24);
      height: vw(24);
      background: var(--color-white);
      box-shadow:
        0 vw(1) vw(3) 0 rgba(16, 24, 40, 0.06),
        0 vw(1) vw(4) 0 rgba(16, 24, 40, 0.1);
      border-radius: 50%;

      transition: left 0.33s ease;
    }
  }

  // .custom-checkbox__caption

  &__caption {
    font-size: vw(18);
    line-height: 1.11;
    color: var(--color-gray-900);
    user-select: none;
  }
}

:is(input, textarea).field:not(:placeholder-shown),
.field:has(input:not(:placeholder-shown)) {
  background: var(--color-white);
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

.form-price {
  // .form-price__values

  &__values {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: vw(20);

    transition: opacity 0.33s ease;

    @include one {
      grid-template-columns: vw(200);
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  // .form-price__value

  &__value {
    display: flex;
    align-items: center;
    padding: vw(19) vw(14);
  }

  // .form-price__caption

  &__caption {
    flex-shrink: 0;
    display: block;
    width: vw(20);
    margin-right: vw(5);
    text-align: center;
    font-size: vw(20);
    line-height: 1;
    color: var(--color-gray-900);
  }

  // .form-price__input

  &__input {
    max-width: 100%;
    width: 100%;
    margin-right: vw(10);
    flex-grow: 1;
  }

  // .form-price__delete

  &__delete-button {
    cursor: pointer;
  }

  // .form-price__free-checkbox

  &__free-checkbox {
    margin-top: vw(15);
  }

  // .form-price__alert

  &__alert {
  }
}
</style>
