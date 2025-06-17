import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '@/views/UsersView.vue'
import EventsView from '@/views/EventsView.vue'
import ModeratorCreationView from '@/views/ModeratorCreationView.vue'
import OrganizerCreateView from '@/views/OrganizerCreateView.vue'
import ModeratorEditView from '@/views/ModeratorEditView.vue'
import OrganizerEditView from '@/views/OrganizerEditView.vue'
import LoginView from '@/views/LoginView.vue'
import EventsStatisticsView from '@/views/EventsStatisticsView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import CitiesStatisticsView from '@/views/CitiesStatisticsView.vue'
import DaysStatistics from '@/views/DaysStatistics.vue'
import EventsOrganizerView from '@/views/EventsOrganizerView.vue'
import { useAuthStore } from '@/stores/auth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardLayout,
      meta: {
        authRequired: true,
        onlyForQuests: false,
        meta: {
          requiredRoles: ['organizer', 'moderator', 'owner'],
        },
      },
      children: [
        {
          path: 'event/list',
          name: 'events',
          component: EventsView,
          meta: {
            requiredRoles: ['moderator', 'owner'],
          },
        },
        {
          path: 'user/list',
          name: 'users',
          component: UsersView,
          meta: {
            requiredRoles: ['owner'],
          },
        },
        {
          path: 'redact/new',
          name: 'moderator-event-create',
          component: ModeratorCreationView,
          meta: {
            requiredRoles: ['moderator', 'owner'],
          },
        },
        {
          path: 'redact/:id',
          name: 'moderator-event-edit',
          component: ModeratorEditView,
          meta: {
            requiredRoles: ['moderator', 'owner'],
          },
        },

        {
          path: 'org/redact/new',
          name: 'organizer-event-create',
          component: OrganizerCreateView,
          meta: {
            requiredRoles: ['organizer', 'moderator', 'owner'],
          },
        },
        {
          path: 'org/redact/:id',
          name: 'organizer-event-edit',
          component: OrganizerEditView,
          meta: {
            requiredRoles: ['organizer', 'moderator', 'owner'],
          },
        },
        {
          path: 'org/event/list',
          name: 'organizer-events',
          component: EventsOrganizerView,
          meta: {
            requiredRoles: ['organizer', 'owner'],
          },
        },

        // Statistics pages under /stat/*
        {
          path: 'stat/events',
          name: 'events-statistics',
          component: EventsStatisticsView,
          meta: {
            requiredRoles: ['moderator', 'owner'],
          },
        },
        {
          path: 'stat/cities',
          name: 'cities-statistics',
          component: CitiesStatisticsView,
          meta: {
            requiredRoles: ['moderator', 'owner'],
          },
        },
        {
          path: 'stat/days',
          name: 'days-statistics',
          component: DaysStatistics,
          meta: {
            requiredRoles: ['moderator', 'owner'],
          },
        },
      ],
    },
    {
      path: '/auth',
      component: AuthLayout,
      meta: {
        authRequired: false,
        onlyForGuests: true,
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginView,
          meta: {
            authRequired: false,
            onlyForGuests: true,
          },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta?.title) {
    document.title = to.meta.title
  }

  const layoutRequiresAuth = to.matched.some((record) => record.meta.authRequired)
  const layoutOnlyForGuests = to.matched.some((record) => record.meta.onlyForGuests)

  if (layoutRequiresAuth && !authStore.currentUser) {
    if (to.name !== 'login') {
      return next({ name: 'login' })
    } else {
      return next()
    }
  }

  if (layoutOnlyForGuests && authStore.currentUser) {
    if (to.name !== 'events') {
      return next({ name: 'events' })
    } else {
      return next()
    }
  }

  const requiredRoles = to.meta.requiredRoles
  if (
    requiredRoles &&
    authStore.currentUser &&
    !requiredRoles.includes(authStore.currentUser.role)
  ) {
    if (to.name !== 'home') {
      return next({ name: 'home' })
    } else {
      return next()
    }
  }

  next()
})

export default router
