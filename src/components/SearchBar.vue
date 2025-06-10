<script setup lang="ts">
import { watch } from 'vue'

const searchQuery = defineModel<string>('searchQuery')
const activeOnly = defineModel<boolean>('activeOnly')
const emits = defineEmits(['search'])

// const search = () =>{
//   console.log(activeOnly.value);
//   emits('search', activeOnly.value);
// }

watch(
  () => activeOnly.value,
  () => emits('search'),
)
</script>

<template>
  <div class="search-container">
    <div class="search-bar">
      <div class="search-bar__content">
        <img src="/icons/mail.svg" class="search-bar__icon" alt="Search icon" />
        <input
          type="text"
          class="search-bar__input"
          placeholder="Поиск по e-mail или названию"
          @change="emits('search')"
          v-model="searchQuery"
        />
        <img
          src="/icons/search.svg"
          class="search-bar__icon"
          alt="Clear search"
          @click="emits('search')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-container {
  min-width: vw(700);
  display: flex;
  align-items: center;
  gap: vw(20);
  justify-content: flex-start;

  @media (max-width: 991px) {
    min-width: 100%;
    width: 100%;
  }
}

.search-bar {
  border-radius: vw(10);
  background-color: var(--color-gray-100);
  border: vw(1) solid var(--color-gray-400);
  align-self: stretch;
  display: flex;
  min-width: vw(240);
  margin-top: auto;
  margin-bottom: auto;
  flex-direction: column;
  align-items: stretch;

  font-size: vw(16);
  color: var(--color-gray-900);
  font-weight: 400;
  line-height: 1;
  justify-content: center;
  width: vw(460);

  @media (max-width: 991px) {
    width: 100%;
    font-size: vw(16, $mobile);
    line-height: vw(20, $mobile);
    border-radius: vw(16, $mobile);
    padding: 0 vw(6, $mobile);
    background-color: var(--color-gray-1);
    border-color: var(--color-gray-300);
  }
}

.search-bar__content {
  display: flex;
  width: 100%;
  padding: vw(8.5) vw(10);
  align-items: center;
  gap: vw(10);
  overflow: hidden;
  justify-content: flex-start;
  width: 100%;
}

.search-bar__icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: vw(20);
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  flex-shrink: 0;

  @media (max-width: 991px) {
    width: vw(20, $mobile);
  }
}

.search-bar__input {
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  flex: 1;
  flex-basis: 0;
  background: transparent;
  border: none;
  outline: none;

  font-size: vw(16);
  color: var(--color-gray-800);
  min-width: 0;
  width: 100%;

  @media (max-width: 991px) {
    border-radius: vw(16, $mobile);
    font-size: vw(16, $mobile);
    line-height: vw(20, $mobile);
    padding: vw(20, $mobile) vw(7, $mobile);
  }
}

.toggle-label {
  color: var(--color-gray-800);
  font-size: vw(16);

  font-weight: 400;
  line-height: 1;
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
}

@media (max-width: 991px) {
  .search-container {
    max-width: 100%;
    flex-wrap: wrap;
  }
}
</style>
