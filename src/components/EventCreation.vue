<script setup lang="ts">
import CategoriesSection from '@/components/CategoriesSection.vue'
import ContentSection from '@/components/ContentSection.vue'
import PhotoSection from '@/components/PhotoSection.vue'
import type { Event } from '@/types/events.ts'
import { type PropType, ref, watch } from 'vue'
import { useEventsStore } from '@/stores/events.ts'
import router from '@/router'
import AppButton from '@/components/AppButton.vue'
import { useModeratorStore } from '@/stores/moderator.ts'
import ContactsSection from '@/components/ContactsSection.vue'
import InfoSection from '@/components/InfoSection.vue'
import { useAuthStore } from '@/stores/auth.ts'

const props = defineProps({
  role: {
    type: String as PropType<'moderator' | 'organizer'>,
    required: true,
  },
})

const moderatorStore = useModeratorStore()
const eventStore = useEventsStore()

const newEvent = ref<Event | null>(null)

watch(
  () => moderatorStore.cities,
  (cities) => {
    if (cities.length && !newEvent.value) {
      newEvent.value = {
        city: cities[0].id,
        types: [],
        name: '',
        contacts: [],
        datetime: [],
        prices: [''],
        address: '',
        description: '',
        images: [],
      }
    }
  },
  { immediate: true, deep: true },
)

const saveEvent = () => {
  if (!newEvent.value) return
  const { images, ...eventWithoutImages } = newEvent.value
  eventStore.addEvent({ ...eventWithoutImages }).then((res) => {
    if (images) eventStore.uploadImage(images, res.id).then(() => goToEvents())
  })
}

const banEvent = () => {
  router.push({ name: 'events' })
}
const publishEvent = () => {
  if (!newEvent.value) return
  const { images, ...eventWithoutImages } = newEvent.value
  eventStore.addEvent({ ...eventWithoutImages }).then((res) => {
    eventStore.updateEventsStatus([{ id: res.id, is_validated: true, is_hidden: false }])
    if (images) eventStore.uploadImage(images, res.id).then(() => router.push({ name: 'events' }))
  })
}

const goToEvents = () => {
  if (useAuthStore().currentUser?.role != 'organizer') router.push({ name: 'events' })
  else router.push({ name: 'organizer-events' })
}
</script>

<template>
  <div v-if="newEvent" class="content-wrap">
    <div class="content-wrap__inner">
      <div class="content-wrap__head">
        <img @click="() => router.back()" src="/icons/back.svg" alt="" class="header-icon" />
        <h2 class="content-wrap__title">Новое Мероприятие</h2>
      </div>
      <div v-if="!moderatorStore.isLoading" class="content-wrap__body">
        <div class="content-wrap__column">
          <InfoSection
            v-model:city="newEvent.city"
            v-model:dates="newEvent.datetime"
            v-model:prices="newEvent.prices"
            v-model:address="newEvent.address"
          />
          <ContactsSection v-model:contacts="newEvent.contacts" />
          <ContentSection
            v-model:description="newEvent.description"
            v-model:title="newEvent.name"
          />
          <PhotoSection v-model="newEvent.images" />
        </div>
        <div class="content-wrap__column">
          <CategoriesSection v-model="newEvent.types" />
        </div>
      </div>
    </div>
    <div v-if="props.role == 'organizer'" class="content-wrap__foot">
      <AppButton @click="router.back()" outline danger icon>
        <img src="/icons/delete.svg" alt="Удалить" />
        <span>Удалить</span>
      </AppButton>
      <AppButton @click="saveEvent" type="button"> Сохранить</AppButton>
    </div>
    <div v-if="props.role == 'moderator'" class="content-wrap__foot">
      <AppButton @click="banEvent" outline danger icon>
        <span>Забанить</span>
      </AppButton>
      <AppButton @click="publishEvent" type="button"> Опубликовать</AppButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/helpers/index' as *;

.content-wrap {
  @include one {
    padding-top: 0;
  }

  @media (max-width: 991px) {
    background-color: var(--color-gray-100);
  }

  // .content-wrap__inner

  &__inner {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: vw(20) 0 0 0;

    @media (max-width: 991px) {
      gap: vw(20, $mobile);
      background-color: var(--color-gray-100);
    }

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
    background-color: var(--color-white);
    border-radius: vw(20) 0 0 0;

    @media (max-width: 991px) {
      background-color: var(--color-gray-100);
      padding: 0;
      padding-bottom: vw(33, $mobile);
      border-bottom: none;
    }

    img {
      @media (max-width: 991px) {
        width: vw(22.5, $mobile);
      }
    }
  }

  // .content-wrap__title

  &__title {
    display: flex;
    align-items: center;
    gap: vw(26);
    font-weight: 700;
    font-size: vw(30);
    line-height: vw(40);
    letter-spacing: vw(0.03);
    color: var(--color-black);
    margin-left: vw(17);

    @media (max-width: 991px) {
      font-size: vw(30, $mobile);
      line-height: vw(40, $mobile);
      letter-spacing: vw(0.03, $mobile);
      margin-left: vw(20, $mobile);
    }
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

    @media (max-width: 991px) {
      display: flex;
      flex-direction: column;
      background-color: var(--color-gray-100);
      padding: 0;
      gap: vw(20, $mobile);
    }
  }

  // .content-wrap__column

  &__column {
  }

  // .content-wrap__foot

  &__foot {
    position: sticky;
    bottom: 0;
    background-color: var(--color-white);
    display: flex;
    justify-content: space-between;
    padding: vw(20);
    gap: vw(20);
    font-size: vw(18);
    line-height: vw(20);
    font-weight: 600;

    @media (max-width: 991px) {
      background: var(--color-white);
      margin-left: vw(-20, $mobile);
      margin-right: vw(-20, $mobile);
      padding: vw(20, $mobile);
    }

    .btn {
      padding: vw(19) vw(24);

      @media (max-width: 991px) {
        padding: vw(20, $mobile);
        font-size: vw(16, $mobile);
        line-height: vw(20, $mobile);
        border-radius: vw(10, $mobile);
        font-weight: 600 !important;
      }
    }

    img {
      display: none;
    }
  }
}

.button-text {
  @media (max-width: 991px) {
    font-weight: 600 !important;
  }
}
</style>
<style lang="scss">
.content {
  padding-bottom: 0 !important;
}

.content-wrap__foot .btn {
  @media (max-width: 991px) {
    padding: vw(20, $mobile);
    font-size: vw(16, $mobile);
    line-height: vw(20, $mobile);
    border-radius: vw(10, $mobile);
    font-weight: 600 !important;
  }
}
</style>
