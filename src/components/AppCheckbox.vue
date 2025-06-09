<script setup lang="ts">

const model = defineModel({
  type: Boolean,
})

</script>

<template>
  <div class="content-wrap">
    <div class="AppCheckbox" :class="{ 'AppCheckbox--checked': model }" @click="model = !model"></div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.content-wrap {
  display: flex;
  flex-direction: row;
  gap: vw(10);
}

.AppCheckbox {
  border-radius: vw(4);
  background-color: var(--color-gray-1);
  border: vw(1) solid var(--color-gray-4);
  min-height: vw(20);
  width: vw(20);
  height: vw(20);
  margin-bottom: vw(10);
  cursor: pointer;

  @media (max-width: 991px) {
    width: vw(20, $mobile);
    height: vw(20, $mobile);
    border-radius: vw(4, $mobile);
    display: block !important;
    margin: 0;
  }
}

.AppCheckbox--checked {
  background-color: var(--color-gray-5);
  border-color: var(--color-primary-1);
  position: relative;
}

.AppCheckbox--checked::after {
  content: "";
  position: absolute;
  top: vw(3);
  left: vw(7);
  width: vw(4);
  height: vw(8);
  border: solid var(--color-primary-1);
  border-width: 0 vw(2) vw(2) 0;
  transform: rotate(45deg);

  @media (max-width: 991px) {
    top: vw(3, $mobile);
    left: vw(7, $mobile);
    width: vw(4, $mobile);
    height: vw(8, $mobile);
    border-width: 0 vw(2, $mobile) vw(2, $mobile) 0;
  }
}
</style>
