<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  outline?: boolean
  danger?: boolean
  icon?: boolean
  mini?: boolean
}>()

const classes = computed(() => ({
  btn: true,
  'btn--outline': props.outline,
  'btn--danger': props.danger,
  'btn--icon': props.icon,
  'btn--mini': props.mini,
}))
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  padding: vw(19);
  font-weight: 600;
  font-size: vw(18);
  line-height: 1.11;
  color: var(--color-white);
  background: var(--color-primary-700);
  border-radius: vw(10);
  border: vw(1) solid var(--color-primary-700);
  stroke: currentColor;
  transition: 0.2s ease;

  &--icon {
    display: flex;
    align-items: center;
    gap: vw(10);
  }

  &--danger {
    color: var(--color-danger);
    border-color: var(--color-danger);
    background: var(--color-white);
  }

  &--outline {
    background: none;
    border-color: currentColor;
  }

  &--mini {
    padding: vw(10);
    height: min-content;
    width: min-content;
    white-space: nowrap;
    align-self: center;
  }

  @media (max-width: 991px) {
    padding: vw(19, $mobile);
    font-size: vw(18, $mobile);
    border-radius: vw(10, $mobile);
    border-width: vw(1, $mobile);

    &--icon {
      gap: vw(10, $mobile);
    }

    &--mini {
      padding: vw(10, $mobile);
    }
  }
}
</style>
