import client from '@/http/client.ts'
import type { EventCard, EventData, EventsFilter, EventStatus, EventInfo } from '@/types/events'
import { EVENT } from '@/api/endpoints.ts'

export default class EventService {
  async addEvent(eventData: Omit<EventData, 'images'>): Promise<{ id: number }> {
    return client.post(EVENT.ADD_EVENT, eventData)
  }

  async getEvents(params: EventsFilter): Promise<{ next: number | null; results: EventCard[] }> {
    return client.get(EVENT.LIST, { params })
  }

  async getEvent(id: number): Promise<EventInfo> {
    console.log(EVENT.EVENT)
    return client.get(EVENT.EVENT.replace('{id}', String(id)))
  }

  async deleteEvent(id: number): Promise<void> {
    return client.delete(EVENT.DELETE.replace('{id}', String(id)))
  }

  async uploadPics(pics: string[], id: number): Promise<void> {
    const formData = new FormData()

    const filePromises: Promise<File | null>[] = pics.map(async (source, index) => {
      if (!source) return null

      if (source.startsWith('http://') || source.startsWith('https://')) {
        const response = await fetch(source)
        const blob = await response.blob()
        const extension = blob.type.split('/')[1] || 'jpg'
        return new File([blob], `image_${index}.${extension}`, { type: blob.type })
      }

      const [meta, data] = source.split(',')
      const mime = meta.match(/:(.*?);/)?.[1] || 'image/png'
      const binary = atob(data)
      const array = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i)
      }
      const blob = new Blob([array], { type: mime })
      return new File([blob], `image_${index}.${mime.split('/')[1]}`, { type: mime })
    })

    const files = await Promise.all(filePromises)
    files.forEach((file) => {
      if (file) formData.append('image', file)
    })

    return client.patch(EVENT.PICS.replace('{id}', String(id)), formData, {
      'Content-Type': 'multipart/form-data',
    })
  }

  async updateEventStatus(updateStatusData: EventStatus[]): Promise<void> {
    return client.patch(EVENT.STATUS, updateStatusData)
  }

  async updateEvent(event: EventInfo, id: number): Promise<[]> {
    return client.put(EVENT.UPDATE.replace('{id}', String(id)), event)
  }
}
