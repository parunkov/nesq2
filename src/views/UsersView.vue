<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import type { Roles, User } from '@/types/user'
import AppTable from '../components/AppTable.vue'
import AppDropDown from '@/components/AppDropDown.vue'
import { useModeratorStore } from '@/stores/moderator.ts'

const searchQuery = ref('')
const showActiveOnly = ref(false)

const moderatorStore = useModeratorStore()

const users = ref<User[]>([])

moderatorStore.getUsers().then((data) => (data ? (users.value = data) : (users.value = [])))

const roleNames: Record<Roles, string> = {
  user: 'Пользователь',
  organizer: 'Организатор',
  moderator: 'Администратор',
  owner: 'Владелец',
}

const roles: Roles[] = ['user', 'organizer', 'moderator', 'owner']

const rolesOptions = roles.map((role) => ({
  id: role,
  value: roleNames[role],
}))

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    return (
      searchQuery.value === '' || user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

const changeRole = (id: number, newRole: string | number) => {
  const role = newRole as string as User['role']
  moderatorStore.patchUsersStatus([{ id, role }])
}
</script>

<template>
  <header class="search-header">
    <SearchBar v-model:active-only="showActiveOnly" v-model:search-query="searchQuery" />
  </header>
  <div class="wrapper">
    <AppTable class="user-table">
      <template #thead>
        <tr>
          <th class="table-cell--id">
            <div>ID</div>
          </th>
          <th class="table-cell--role">
            <div>Роль</div>
          </th>
          <th class="table-cell--name">
            <div>Email/tg</div>
          </th>
        </tr>
      </template>

      <template #tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td class="table-cell--id">
            <div>{{ user.id }}</div>
          </td>
          <td class="table-cell--role">
            <div>
              <AppDropDown
                @change-value="(newRole) => changeRole(user.id, newRole.id)"
                :start-value="user.role"
                :options="rolesOptions"
              />
            </div>
          </td>
          <td class="table-cell--name">
            <div>{{ user.name }}</div>
          </td>
        </tr>
      </template>
    </AppTable>
  </div>
</template>
<style scoped lang="scss">
.wrapper {
  background-color: var(--color-gray-100);
}

.user-table {
  box-sizing: content-box;
  width: vw(460);
}

.search-header {
  border-radius: vw(20) 0 0 0;
  background-color: var(--color-white);
  display: flex;
  width: 100%;
  padding: vw(20);
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.table-cell--id {
  text-align: center;
  min-width: vw(100);
}

.table-cell--role {
  text-align: center;
  width: 100%;
}

.table-cell--name {
  min-width: vw(215);
  width: 100%;
}
</style>
