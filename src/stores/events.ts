import { defineStore } from 'pinia'
import { ref } from 'vue'
import EventService from '@/api/events.ts'
import { requestWrapper } from '@/utils/requestWrapper'
import type { EventsFilter, EventData, EventStatus, EventInfo, EventCard } from '@/types/events.ts'

export const useEventsStore = defineStore('events', () => {
  const isLoading = ref(true)
  const eventService = new EventService()
  const filters = ref<EventsFilter>({ page: 1 })
  const nextPage = ref(true)

  async function getEvents() {
    filters.value.page = 0
    nextPage.value = true
    return loadMore()
  }

  async function loadMore() {
    if (nextPage.value) {
      return await requestWrapper(isLoading, () => eventService.getEvents(filters.value)).then(
        (data) => {
          filters.value.page = data.next
          nextPage.value = data.next !== null
          data.results.forEach((event: EventCard) => (event.image = 'https://' + event.image))
          return data.results
        },
      )
    }
    return []
  }

  async function deleteEvent(id: number) {
    return requestWrapper(isLoading, () => eventService.deleteEvent(id))
      .then(() => true)
      .then(() => false)
  }

  async function addEvent(event: EventData) {
    return requestWrapper(isLoading, () => eventService.addEvent(event))
  }

  async function uploadImage(images: string[], id: number) {
    return requestWrapper(isLoading, () => eventService.uploadPics(images, id))
  }

  async function updateEventsStatus(eventsStatus: EventStatus[]) {
    return requestWrapper(isLoading, () => eventService.updateEventStatus(eventsStatus))
  }

  async function getEvent(id: number) {
    return requestWrapper(isLoading, () => eventService.getEvent(id)).then((event: EventInfo) => {
      if (event.images) {
        event.images = event.images.map((image) => 'https://' + image)
      }
      return event
    })
  }

  async function updateEvent(event: EventInfo, id: number) {
    return requestWrapper(isLoading, () => eventService.updateEvent(event, id))
  }

  return {
    isLoading,
    getEvents,
    getEvent,
    loadMore,
    deleteEvent,
    addEvent,
    uploadImage,
    updateEventsStatus,
    updateEvent,
    nextPage,
    filters,
  }
})
