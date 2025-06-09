import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import ModeratorService from '@/api/moderator.ts'
import { requestWrapper } from '@/utils/requestWrapper'
import type { User, UsersFilters } from '@/types/user'
import type { CityInfo } from '@/types/city.ts'
import type { RubricsGroup } from '@/types/rubrics.ts'

export const useModeratorStore = defineStore('moderator', () => {
  const isLoading = ref(true)
  const moderatorService = new ModeratorService()
  const filters = ref<Partial<UsersFilters>>({ page: 1 })
  const nextPage = ref(true)
  const cities = ref<CityInfo[]>([])
  const rubrics = ref<RubricsGroup[]>([])

  async function getUsers() {
    filters.value.page = 0
    nextPage.value = true
    return loadMoreUsers()
  }

  async function loadMoreUsers() {
    if (nextPage.value) {
      return requestWrapper(isLoading, () =>
        moderatorService.getUsers().then((data) => {
          //filters.value.page = data.next
          //nextPage.value = data.next !== null
          nextPage.value = false
          return data
        }),
      )
    }
  }

  async function getCitiesStatistics() {
    return requestWrapper(isLoading, () => moderatorService.getCityStatistics())
  }

  async function getDaysStatistics() {
    return requestWrapper(isLoading, () => moderatorService.getDaysStatistics())
  }

  async function patchUsersStatus(usersStatus: Pick<User, 'id' | 'role'>[]) {
    return requestWrapper(isLoading, () => moderatorService.patchUsersStatus(usersStatus))
  }

  function getDictionary() {
    isLoading.value = true
    moderatorService.getDictionary().then((data) => {
      if (data?.types) rubrics.value.push(...data.types)
      if (data?.cities) {
        data.cities.sort((a, b) => Number(b.is_active) - Number(a.is_active))
        cities.value.push(...data.cities)
      }
      isLoading.value = false
    })
  }

  onMounted(() => {
    getDictionary()
  })

  return {
    isLoading,
    getUsers,
    loadMoreUsers,
    nextPage,
    filters,
    getCitiesStatistics,
    getDaysStatistics,
    patchUsersStatus,
    cities,
    rubrics,
  }
})
