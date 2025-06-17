<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarMenu from '@/components/SidebarMenu.vue'
import { useModeratorStore } from '@/stores/moderator.ts'

useModeratorStore()
</script>

<template>
  <main class="user-management">
    <SidebarMenu />

    <div class="dashboard">
      <div class="content">
        <RouterView></RouterView>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.dashboard {
  height: 100%;
  display: flex;
  background-color: var(--color-primary-900);
  flex: 1;
  padding-top: vw(20);
  align-self: stretch;
  box-sizing: content-box;
  overflow-y: auto;
}

.content {
  min-height: 100%;
  height: fit-content;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--color-gray-100);
  border-radius: vw(20) 0 0 0;

  @media (max-width: 991px) {
    padding: vw(20, $mobile);
    padding-top: vw(100, $mobile);
  }
}

.user-management {
  height: 100vh;
  background-color: var(--color-primary-900);
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 100vh;

  @media (max-width: 991px) {
  }
}

@media (max-width: 991px) {
  .user-management {
    flex-direction: column;
    align-items: stretch;
  }

  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
