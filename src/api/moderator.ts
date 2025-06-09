import client from '@/http/client.ts'
import type { CityInfo, CityStatistics } from '@/types/city.ts'
import { MODERATOR } from '@/api/endpoints.ts'
import type { User } from '@/types/user.ts'
import type { RubricsGroup } from '@/types/rubrics.ts'
import type { ChartStatistics } from '@/types/staticstics.ts'

export default class ModeratorService {
  async getUsers(): Promise<User[]> {
    return client.get(MODERATOR.LIST)
  }

  async getCityStatistics(): Promise<CityStatistics[]> {
    return client.get(MODERATOR.STATS_CITIES)
  }

  async getDaysStatistics(): Promise<ChartStatistics> {
    return client.get(MODERATOR.STAT_DAYS)
  }

  async patchUsersStatus(statusIndo: Pick<User, 'id' | 'role'>[]): Promise<unknown> {
    return client.patch(MODERATOR.USERS_STATUS, statusIndo)
  }

  async getDictionary(): Promise<{ cities: CityInfo[]; types: RubricsGroup[] }> {
    return client.get(MODERATOR.DICTIONARY)
  }
}
