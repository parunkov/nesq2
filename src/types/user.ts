export type AuthToken = {
  access_token: string
  token_type: string
  role: Roles
}

export type Roles = 'user' | 'organizer' | 'moderator' | 'owner'

export type User = {
  id: number
  name: string
  role: Roles
}

export type UsersFilters = Partial<Omit<User, 'id'>> & { page: number }
