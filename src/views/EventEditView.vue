<script setup lang="ts">
import InfoSection from '@/components/InfoSection.vue'
import CategoriesSection from '@/components/CategoriesSection.vue'
import ContentSection from '@/components/ContentSection.vue'
import PhotoSection from '@/components/PhotoSection.vue'
import type { EventInfo } from '@/types/events.ts'
import { onMounted, ref } from 'vue'
import { useEventsStore } from '@/stores/events.ts'
import router from '@/router'
import { useRoute } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import { useAuthStore } from '@/stores/auth.ts'
import ContactsSection from '@/components/ContactsSection.vue'
import { useModeratorStore } from '@/stores/moderator.ts'

const moderatorStore = useModeratorStore()
const authStore = useAuthStore()
const eventStore = useEventsStore()
let realId = '0'
const currentEvent = ref<EventInfo | null>(null)

onMounted(() => {
  const id = useRoute().params.id as string
  realId = id
  eventStore.getEvent(Number(id)).then((data) => {
    currentEvent.value = data
    if (!currentEvent.value.city) currentEvent.value.city = moderatorStore.cities[0].id
  })
})

const saveEvent = () => {
  if (!currentEvent.value) return
  /*  currentEvent.value.datetime.forEach((el) => (el.event_id = Number(realId)))*/
  console.log(currentEvent.value)
  eventStore.updateEvent(currentEvent.value, Number(realId)).then(() => {
    if (!currentEvent.value) return
    eventStore.uploadImage(currentEvent.value.images, Number(realId))
  })
}

const banEvent = () => {
  eventStore.updateEventsStatus([
    {
      id: Number(realId),
      is_validated: false,
    },
  ])
}

const deleteEvent = () => {
  eventStore.deleteEvent(Number(realId))
  router.back()
}

const publishEvent = () => {
  eventStore.updateEventsStatus([
    {
      id: Number(realId),
      is_validated: true,
    },
  ])
}
</script>

<template>
  <div v-if="currentEvent" class="content-wrap">
    <div class="content-wrap__inner">
      <div class="content-wrap__head">
        <img @click="() => router.back()" src="/icons/back.svg" alt="" class="header-icon" />
        <h2 class="content-wrap__title">Редактирование мероприятия</h2>
      </div>
      <div class="content-wrap__body">
        <div class="content-wrap__column">
          <InfoSection
            v-model:city="currentEvent.city"
            v-model:dates="currentEvent.datetime"
            v-model:prices="currentEvent.prices"
            v-model:address="currentEvent.address"
          />
          <ContactsSection v-model:contacts="currentEvent.contacts" />
          <ContentSection
            v-model:description="currentEvent.description"
            v-model:title="currentEvent.name"
          />
          <PhotoSection v-model="currentEvent.images" />
        </div>
        <div class="content-wrap__column">
          <CategoriesSection v-model="currentEvent.types" />
        </div>
      </div>
      <div v-if="authStore.currentUser?.role == 'organizer'" class="content-wrap__foot">
        <AppButton @click="deleteEvent" outline danger icon>
          <img src="/icons/delete.svg" alt="Удалить" />
          <span>Удалить</span>
        </AppButton>
        <AppButton @click="saveEvent" type="button"> Сохранить</AppButton>
      </div>
      <div v-else class="content-wrap__foot">
        <AppButton @click="banEvent" outline danger icon>
          <span>Забанить</span>
        </AppButton>
        <AppButton @click="publishEvent" type="button"> Опубликовать</AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/helpers/index' as *;

.content-wrap {
  @include one {
    padding-top: 0;
  }

  // .content-wrap__inner

  &__inner {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    border-radius: vw(20) 0 0 0;

    @include one {
      border-radius: 0;
    }
  }

  // .content-wrap__head

  &__head {
    padding: vw(20);
    border-bottom: vw(1) solid var(--color-gray-300);
    display: flex;
    gap: vw(10);
  }

  // .content-wrap__title

  &__title {
    display: flex;
    align-items: center;
    gap: vw(26);
    font-weight: 700;
    font-size: vw(30);
    line-height: 1.33;
    letter-spacing: 0.01em;
    color: #000;
    margin-left: vw(20);
  }

  // .content-wrap__body

  &__body {
    flex-grow: 1;
    display: grid;
    grid-template-columns: vw(680) vw(430);
    padding: vw(20);
    gap: vw(20);

    @include one {
      grid-template-columns: 1fr;
    }
  }

  // .content-wrap__foot

  &__foot {
    display: flex;
    justify-content: space-between;
    padding: vw(20);
    gap: vw(20);
  }
}
</style>
