<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'changeValue', value: Option): void
}>()
type Option = {
  id: number | string
  value: string
}

const props = defineProps({
  options: {
    type: Array<Option>,
    required: true,
  },
  startValue: {
    type: [Number, String],
    default: 0,
  },
})

const selected = ref(props.options.find((el) => el.id === props.startValue))
if (!selected.value) selected.value = props.options[0]
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: Option) => {
  selected.value = option
  emit('changeValue', option)
  isOpen.value = false
}
</script>

<template>
  <div v-if="options.length > 0 && selected" class="dropdown dropdown--select" :class="{ 'dropdown--active': isOpen }">
    <div class="dropdown__trigger field" @click="toggleDropdown">
      {{ selected.value }}
    </div>

    <div class="dropdown__wrapper" v-if="isOpen">
      <div class="dropdown__inner">
        <div class="dropdown__content">
          <ul class="dropdown-list">
            <li v-for="option in options" :key="option.id" class="dropdown-list__item" @click="selectOption(option)">
              {{ option.value }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Нативный <select>, скрытый -->
    <select class="dropdown__select-native" v-model="selected">
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option.value }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/helpers' as *;

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
  background: #f9f6fa;

  transition:
    border-color 0.33s ease,
    background 0.33s ease;

  &::placeholder {
    color: var(--color-gray-700);
    font-size: inherit;
  }

  &:focus,
  &:has(input:focus) {
    border-color: #9218c0;
  }

  &--textarea {
    min-height: vw(120);
  }
}

:is(input, textarea).field:not(:placeholder-shown),
.field:has(input:not(:placeholder-shown)) {
  background: var(--color-white);
}

.dropdown * {
  margin: 0;
}

.dropdown-list {
  border: vw(1) solid var(--color-gray-300);
  border-radius: vw(10);
  background: var(--color-white);
  overflow: hidden;

  list-style: none;
  padding: 0;
  margin: 0;

  // .dropdown-list__item

  &__item {
    cursor: pointer;
    padding: vw(10);

    transition: background 0.33s ease;

    &:hover {
      background: var(--color-primary-100);
    }
  }
}

.dropdown {
  margin: 0;
  position: relative;

  // .dropdown__trigger

  &--active &__trigger {
    border-color: var(--color-primary-100);

    &::after {
      transform: rotate(180deg);
    }
  }

  &__trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: vw(10);
    margin: 0;
    cursor: pointer;

    &.field {
      background: var(--color-gray-100);

      @media (max-width: 991px) {
        width: 100%;
        padding: vw(14, $mobile) vw(20, $mobile);
        font-size: vw(20, $mobile);
        line-height: vw(30, $mobile);
        border-radius: vw(15, $mobile);
      }
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
    margin: 0;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.5s ease-in-out;

    &[aria-hidden='false'] {
      grid-template-rows: 1fr;
    }
  }

  // .dropdown__inner

  &__inner {
    margin: 0;
    z-index: 100;
  }

  // .dropdown__content

  &__content {
    padding-top: vw(8);
    margin: 0;

    @media (max-width: 991px) {
      font-size: vw(20, $mobile);
      line-height: vw(30, $mobile);
      border-radius: vw(15, $mobile);
    }
  }

  &-list {
    @media (max-width: 991px) {
      font-size: vw(20, $mobile);
      line-height: vw(30, $mobile);
      border-radius: vw(15, $mobile);

      &__item {
        padding: vw(5, $mobile) vw(20, $mobile);
      }
    }
  }

  // .dropdown__select-native

  &__select-native {
    position: absolute;
    width: vw(1);
    height: vw(1);
    margin: vw(-1);
    padding: 0;
    border: 0;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    clip-path: inset(50%);
  }
}
</style>
