import 'vue-router'
import type { Roles } from '@/types/user.ts'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    authRequired?: boolean
    onlyForGuests?: boolean
    requiredRoles?: Roles[]
  }
}
