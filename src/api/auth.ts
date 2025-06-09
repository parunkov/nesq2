import client from '@/http/client.ts'
import type { AuthToken } from '@/types/user'
import { AUTH } from './endpoints.ts'

export default class AuthService {
  async login(email: string, password: string): Promise<AuthToken> {
    return client.post( AUTH.LOGIN, {
      email, password
    })
  }
}
