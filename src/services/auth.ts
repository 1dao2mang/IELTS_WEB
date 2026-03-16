/**
 * Auth Service — DEMO ONLY.
 *
 * ⚠️  This is client-side mock authentication using localStorage tokens.
 * It does NOT provide real security and must NOT be used in production.
 *
 * For production, replace with:
 * - Server-issued httpOnly cookies
 * - CSRF protection
 * - Session rotation on login/logout
 * - A real identity provider (Auth0, Supabase Auth, NextAuth, etc.)
 */

import { apiService } from './api'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
}

interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
  }
  token: string
}

class AuthService {
  private tokenKey = 'ielts_auth_token'

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials)
    this.setToken(response.token)
    return response
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', data)
    this.setToken(response.token)
    return response
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  /**
   * Mock authentication for demo/development purposes.
   * ⚠️  This generates a fake token — it is NOT authenticated by any server.
   */
  async mockLogin(email: string): Promise<AuthResponse> {
    if (import.meta.env.DEV) {
      console.warn('[AuthService] mockLogin() used — this is NOT real authentication.')
    }

    return new Promise(resolve => {
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          user: {
            id: '1',
            name: 'Demo User',
            email,
          },
          token: 'mock-jwt-token-' + Date.now(),
        }
        this.setToken(mockResponse.token)
        resolve(mockResponse)
      }, 1000)
    })
  }
}

export const authService = new AuthService()
