<script setup lang="ts">
import MenuLink from '@/components/MenuLink.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth.ts'
import { ref } from 'vue'

const authStore = useAuthStore()
const isMenuOpen = ref(false)

const showTab = (pageName: string) => {
  const route = router.getRoutes().find((r) => r.name === pageName)

  if (!route) {
    console.warn(`Маршрут с именем "${pageName}" не найден`)
    return false
  }

  const requiredRoles = route.meta?.requiredRoles
  const userRole = authStore.currentUser?.role

  if (!requiredRoles || requiredRoles.length === 0) {
    return true
  }

  return userRole && requiredRoles.includes(userRole)
}

const goTo = (name: string) => {
  router.push({ name: name })
  isMenuOpen.value = false
}

const logout = () => {
  useAuthStore().logout()
  goTo('login')
}
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar--active': isMenuOpen }">
    <div class="sidebar__top">
      <div class="logo-container">
        <img src="/icons/logo.png" class="logo" alt="Logo" />
        <div class="burger" @click="isMenuOpen = !isMenuOpen" :class="{ 'burger--active': isMenuOpen }">
          <img v-if="isMenuOpen" src="/icons/burger-cross.svg" class="burger__cross" alt="Меню" />
          <img v-else src="/icons/menu.svg" class="burger__icon" alt="Меню" />
        </div>
      </div>
      <nav class="navigation" :class="{ 'navigation--active': isMenuOpen }">
        <MenuLink v-if="showTab(`events`)" icon="/icons/calendar.svg" title="Мероприятия" @click="goTo('events')"
          :isActive="router.currentRoute.value.name == `events`" />
        <MenuLink v-if="showTab(`events-statistics`)" icon="/icons/stat.svg" title="Стат / мероприятия"
          @click="goTo('events-statistics')" :isActive="router.currentRoute.value.name == `events-statistics`" />
        <MenuLink v-if="showTab(`users`)" icon="/icons/user.svg" title="Пользователи" @click="goTo('users')"
          :isActive="router.currentRoute.value.name == `users`" />
        <MenuLink v-if="showTab(`cities-statistics`)" icon="/icons/stat.svg" title="Стат / города"
          @click="goTo('cities-statistics')" :isActive="router.currentRoute.value.name == `cities-statistics`" />
        <MenuLink v-if="showTab(`days-statistics`)" icon="/icons/stat.svg" title="Стат / по дням"
          @click="goTo('days-statistics')" :isActive="router.currentRoute.value.name == `days-statistics`" />
        <MenuLink v-if="showTab(`organizer-events`)" icon="/icons/calendar.svg" title="Мероприятия О"
          @click="goTo('organizer-events')" :isActive="router.currentRoute.value.name == `organizer-events`" />
      </nav>
    </div>
    <MenuLink icon="/icons/exit.svg" :title="authStore.currentUser?.email || `Выйти`" @click="logout" />
  </aside>
</template>
<style scoped lang="scss">
.sidebar {
  background-color: var(--color-primary-900);
  height: 100vh;
  padding: vw(30);
  width: vw(330);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: flex-start;

  @media (max-width: 991px) {
    background-color: var(--color-gray-100);
    padding: vw(20, $mobile);
    height: vw(100, $mobile);
  }

  &--active {
    @media (max-width: 991px) {
      background-color: var(--color-primary-900);
      height: 100vh;
    }
  }
}

.sidebar__top {
  width: 100%;
}

.logo-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 991px) {
    justify-content: space-between;
  }
}

.logo {
  aspect-ratio: 5.49;
  object-fit: contain;
  object-position: center;
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;

  @media (max-width: 991px) {
    width: vw(220, $mobile);
  }
}

.burger {
  display: none;

  @media (max-width: 991px) {
    display: block;
    width: vw(60, $mobile);
    height: vw(60, $mobile);
    background-color: var(--color-primary-100);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &--active {
      background-color: var(--color-primary-600);
    }
  }

  &__icon {
    width: vw(26, $mobile);
  }

  &__cross {
    width: vw(30, $mobile);
  }
}

.navigation {
  margin-top: vw(40);
  width: 100%;

  font-size: vw(20);
  color: var(--color-white);
  font-weight: 500;
  white-space: nowrap;
  letter-spacing: vw(0.2);
  line-height: 1;

  @media (max-width: 991px) {
    display: none;
    margin-top: vw(51, $mobile);
  }

  &--active {
    @media (max-width: 991px) {
      display: block;
    }
  }
}

.user-profile {
  font-size: vw(18);
  color: var(--color-white);
  font-weight: 500;
  white-space: nowrap;
  letter-spacing: vw(0.18);
  line-height: 1;
  justify-content: flex-start;
}

.menu-link {
  @media (max-width: 991px) {
    display: none;
  }
}

.sidebar--active {
  .menu-link {
    @media (max-width: 991px) {
      display: block;
    }
  }
}
</style>
