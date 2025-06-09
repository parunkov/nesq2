<script setup lang="ts">
const modelValue = defineModel<boolean>()
</script>

<template>
  <div class="toggle" :class="{ 'toggle--active': modelValue }" @click="modelValue = !modelValue">
    <div class="toggle__button"></div>
  </div>
</template>

<style scoped lang="scss">
.toggle {
  position: relative;
  width: vw(36);
  height: vw(20);
  border-radius: vw(12);
  padding: vw(2);
  background-color: var(--color-gray-600);
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.toggle--active {
  background-color: var(--color-primary-600);
}

.toggle__button {
  position: absolute;
  top: vw(2);
  left: vw(2);
  width: vw(16);
  height: vw(16);
  border-radius: 50%;
  background-color: var(--color-white);
  transition: transform 0.3s ease;
  transform: translateX(0);
}

.toggle--active .toggle__button {
  transform: translateX(vw(16)); // плавно едет вправо
}
</style>
