<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: false,
  },
  icon: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="menu-link" :class="{ 'menu-link--active': isActive }">
    <div class="menu-link__content">
      <img :src="icon" class="menu-link__icon" alt="" />
      <span class="menu-link__title">{{ title }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-link {
  border-radius: vw(10);
  display: flex;
  min-height: vw(60);
  width: 100%;
  padding: vw(15) vw(8) vw(15) vw(10);
  align-items: center;
  gap: vw(12);
  justify-content: flex-start;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: vw(10);

  font-size: vw(20);
  color: var(--color-white);
  font-weight: 500;
  white-space: nowrap;
  letter-spacing: vw(0.2);
  line-height: 1;

  @media (max-width: 991px) {
    font-size: vw(20, $mobile);
    line-height: vw(25, $mobile);
    margin-bottom: vw(10, $mobile);
    padding: vw(15, $mobile) vw(10, $mobile);
    border-radius: vw(10, $mobile);
  }
}

.menu-link--active {
  background-color: var(--color-primary-800);
}

.menu-link:hover:not(.menu-link--active) {
  background-color: var(--color-primary-800);
}

.menu-link__content {
  align-self: stretch;
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
  align-items: center;
  gap: vw(10);
  justify-content: flex-start;
  flex: 1;
  flex-basis: 0;
}

.menu-link__icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: vw(30);
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  flex-shrink: 0;

  @media (max-width: 991px) {
    width: vw(30, $mobile);
    margin-right: vw(10, $mobile);
  }
}

.menu-link__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  flex: 1;
  flex-basis: 0;
  line-height: 1.2;
}
</style>
