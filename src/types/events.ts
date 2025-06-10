export type DateTime = {
  from: string
  to?: string
}

export type DateTimeInfo = {
  from: string
  to?: string
}

export type EventData = {
  city: number
  types: number[]
  name: string
  contacts?: string[]
  datetime: DateTime[]
  prices?: string[]
  address?: string
  description?: string
  images: string[]
}

export type EventsFilter = {
  page: number | null
  types?: string
  cities?: string
  date_from?: string
  date_to?: string
}

export type EventCard = {
  id: number
  is_hidden: boolean
  is_validated: boolean | null
  user_id: string
  user_name: string
  top: boolean
  address: string
  name: string
  date_from: string // ISO-8601 datetime string
  date_to: string | null
  modified_at: string // ISO-8601 datetime string
  image: string
  stat_view_pwa: number
  stat_view_tg: number
  stat_redirect: number
  stat_fave: number
}

export type Event = {
  city: number
  types: number[]
  name: string
  contacts?: string[]
  datetime: DateTime[]
  prices?: string[]
  images?: string[]
  address: string
  description?: string
}

export type EventStatus = {
  id: number
  top?: boolean
  is_hidden?: boolean
  is_validated?: boolean
}

export type EventInfo = {
  name: string
  types: number[]
  contacts: string[]
  datetime: DateTimeInfo[]
  prices: string[]
  address: string
  images: string[]
  description: string
  city: number
}
