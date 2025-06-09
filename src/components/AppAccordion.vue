<script lang="ts" setup>
import { ref, computed, nextTick, watch } from 'vue'

const emits = defineEmits(['closeOthers'])
const mustBeOpen = defineModel<boolean>()
const open = ref(mustBeOpen.value)
watch(
  () => mustBeOpen,
  () => {
    toggle().then(() => (open.value = mustBeOpen.value))
  },
  { deep: true },
)
const $content = ref<HTMLElement | null>(null)
const $main = ref<HTMLElement | null>(null)
const isBtnActive = ref(false)
const isActivating = ref(false)
const height = ref<number | null>(null)

const contentStyles = computed(() => (height.value !== null ? { height: height.value + 'px' } : {}))

async function toggle() {
  if (!open.value) {
    isActivating.value = true
    isBtnActive.value = true
    await nextTick()
    if ($main.value) {
      height.value = $main.value.getBoundingClientRect().height
    }
  } else {
    if ($main.value) {
      height.value = $main.value.getBoundingClientRect().height
    }
    isBtnActive.value = false
    isActivating.value = true
    setTimeout(() => (height.value = 0), 0)
  }
}

function transitionendHandler(event: Event) {
  if (event.target !== $content.value) return
  isActivating.value = false
  if (!open.value) height.value = null
}

function clickHandler() {
  if (open.value) {
    toggle().then(() => emits('closeOthers', false))
  } else {
    toggle().then(() => {
      emits('closeOthers', true)
    })
  }
}

const styles = computed(() => {
  return { 'accordion--active': open.value, 'accordion--activating': isActivating.value }
})
</script>

<template>
  <div class="accordion" :class="styles">
    <button
      class="accordion__btn"
      :class="{ 'accordion__btn--active': isBtnActive }"
      @click="clickHandler"
    >
      <slot @click.stop name="btn"></slot>
      <div class="img"></div>
    </button>
    <div
      class="accordion__content"
      ref="$content"
      :style="contentStyles"
      @transitionend="transitionendHandler"
    >
      <div class="accordion__main" ref="$main">
        <slot @click.stop name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accordion {
  overflow: hidden;

  &__btn {
    display: flex;
    justify-content: space-between;
    user-select: none;
    cursor: pointer;
    width: 100%;

    .img {
      content: '';
      flex: 0 0 auto;
      margin-left: vw(0);
      width: vw(24);
      height: vw(24);
      background: url('/public/icons/arrow.svg') center / contain no-repeat;
      background-size: vw(12);
      transition: transform 0.4s;
    }

    &--active {
      .img {
        transform: rotate(-180deg);
      }
    }
  }

  &__content {
    display: none;
  }

  &--activating &__content {
    height: 0;
    display: block;
    overflow: hidden;
    transition: height 0.5s;
  }

  &--active &__content {
    display: block;
  }
}
</style>
