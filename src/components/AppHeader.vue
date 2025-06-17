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

  @media (max-width: 991px) {
    display: block;
    font-size: vw(30, $mobile);
    line-height: vw(40, $mobile);
    font-weight: 600;
    margin-bottom: vw(20, $mobile);
    border-bottom: none;
    padding: 0;
    margin: 0;
  }
}
</style>
<style lang="scss">
.title {
  display: flex;
  align-items: center;
  gap: vw(26);
  font-weight: 700;
  font-size: vw(30);
  line-height: 1.33;
  letter-spacing: 0.01em;
  color: var(--color-black);

  @media (max-width: 991px) {
    display: block;
    font-size: vw(30, $mobile);
    line-height: vw(40, $mobile);
    font-weight: 600;
  }
}
</style>
