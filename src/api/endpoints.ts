const AUTH = {
  LOGIN: '/account/mail/login',
  LIST: '/admin/super/user/list/',
} as const

const MODERATOR = {
  USERS_STATUS: '/admin/moderator/user/status/',
  STATS_CITIES: '/admin/moderator/stats/cities/',
  STAT_DAYS: '/admin/moderator/stats/days/',
  LIST: '/admin/moderator/user/list/',
  DICTIONARY: '/dictionary/',
} as const

const EVENT = {
  PICS: '/admin/event/{id}/pics/',
  UPDATE: '/admin/event/{id}/update/',
  DELETE: '/admin/event/{id}/',
  ADD_EVENT: '/admin/event/new/',
  LIST: '/admin/event/list/',
  STATUS: '/admin/event/status/',
  EVENT: 'event/{id}/',
} as const

export { MODERATOR, EVENT, AUTH }
