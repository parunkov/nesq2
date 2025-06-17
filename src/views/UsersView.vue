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
    <div class="title">Пользователи</div>
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
            <div>Email/tg-name</div>
          </th>
        </tr>
      </template>

      <template #tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td class="table-cell--id">
            <div class="mobile-text">ID:</div>
            <div>{{ user.id }}</div>
            <div class="mobile-text mobile-text--separator">|</div>
          </td>
          <td class="table-cell--role">
            <div>
              <AppDropDown @change-value="(newRole) => changeRole(user.id, newRole.id)" :start-value="user.role"
                :options="rolesOptions" />
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

.title {
  display: none;

  @media (max-width: 991px) {
    display: block;
    background: var(--color-gray-100);
    margin-bottom: vw(20, $mobile);
  }
}

.user-table {
  box-sizing: content-box;
  width: vw(510);

  @media (max-width: 991px) {
    width: 100%;
  }
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

  @media (max-width: 991px) {
    background: var(--color-gray-100);
    padding: 0;
  }
}

tr {
  @media (max-width: 991px) {
    padding-top: vw(55, $mobile);
    padding-bottom: vw(10, $mobile);
    min-height: vw(105, $mobile);
  }
}

.table-cell--id {
  text-align: center;
  min-width: vw(60);

  @media (max-width: 991px) {
    bottom: auto;
    top: vw(21, $mobile);
  }
}

.table-cell--role {
  width: vw(180);

  @media (max-width: 991px) {
    order: 2;
  }
}

.table-cell--name {
  @media (max-width: 991px) {
    position: absolute;
    bottom: auto;
    top: vw(15, $mobile);
    left: vw(101, $mobile);
    font-size: vw(20, $mobile);
    line-height: vw(30, $mobile);
    color: var(--color-gray-700);
  }
}
</style>
<style lang="scss">
 td .dropdown__trigger.field {
  width: vw(180);
  background: #ffffff !important;

  @media (max-width: 991px) {
    padding: vw(2, $mobile) vw(10, $mobile) !important;
    border-radius: vw(10, $mobile) !important;
  }
}

.search-header {
  background: var(--color-gray-100);
}
</style>
