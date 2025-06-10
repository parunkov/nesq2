<script lang="ts" setup></script>

<template>
  <div class="header">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.header {
  padding: vw(20);
  border-bottom: vw(1) solid var(--color-gray-300);
  display: flex;
  gap: vw(10);
}
</style>
