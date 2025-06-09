<script setup lang="ts">
const ANIMATION_DURATION = 1000
import { computed, ref } from 'vue'

const emit = defineEmits(['delete'])

const isLoading = ref(false)
const timeoutId = ref<number | null>(null)
const animationDurationSec = computed(() => `${ANIMATION_DURATION / 1000}s`)

const handleClick = () => {
  if (isLoading.value) {
    // При повторном нажатии отменяем таймаут и сбрасываем состояние
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
    isLoading.value = false
    return
  }

  isLoading.value = true

  timeoutId.value = window.setTimeout(() => {
    emit('delete')
    timeoutId.value = null
  }, ANIMATION_DURATION)
}
</script>

<template>
  <button
    class="delete-button"
    :class="{ loading: isLoading }"
    @click.stop="handleClick"
    :style="{ '--animation-duration': animationDurationSec }"
  >
    <!-- Анимированный прогресс-круг по краю кнопки -->
    <svg v-if="isLoading" class="progress-ring" viewBox="0 0 40 40">
      <circle class="progress-ring__circle" cx="20" cy="20" r="18" fill="transparent" />
    </svg>

    <!-- Иконка -->
    <div class="icon-wrapper" :class="{ 'loading-icon': isLoading }">
      <img v-if="!isLoading" src="/icons/delete.svg" />
      <img v-else src="/icons/cansel.svg" />
    </div>
  </button>
</template>

<style scoped lang="scss">
.delete-button {
  margin: 0;
  width: vw(40);
  height: vw(40);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s;

  @media (max-width: 991px) {
    width: vw(30, $mobile);
    height: vw(30, $mobile);
  }
}

.icon-wrapper {
  position: relative;
  width: vw(30);
  height: vw(30);
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: vw(15);
  transition: background-color 0.3s;

  @media (max-width: 991px) {
    width: vw(30, $mobile);
    height: vw(30, $mobile);

    img {
      width: vw(30, $mobile) !important;
      height: vw(30, $mobile) !important;
    }
  }

  &.loading-icon {
    background: var(--color-primary-100);

    @media (max-width: 991px) {
      width: vw(30, $mobile) !important;
      height: vw(30, $mobile) !important;
      border-radius: vw(15, $mobile);
    }

    img {
      width: vw(10);
      height: vw(10);

      @media (max-width: 991px) {
        width: vw(10, $mobile) !important;
        height: vw(10, $mobile) !important;
      }
    }
  }

  img {
    margin: 0;
    width: vw(20);
    height: vw(20);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.progress-ring {
  position: absolute;
  width: vw(40);
  height: vw(40);
  transform: rotate(-90deg);
  z-index: 1;
  pointer-events: none;

  @media (max-width: 991px) {
    width: vw(40, $mobile);
    height: vw(40, $mobile);
  }
}

.progress-ring__circle {
  stroke: var(--color-primary-700);
  stroke-width: 2;
  stroke-dasharray: 113.1;
  stroke-dashoffset: 113.1;
  animation: draw-circle var(--animation-duration) linear forwards;
}

@keyframes draw-circle {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
