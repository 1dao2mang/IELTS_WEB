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

  // Mock authentication for demo purposes
  async mockLogin(email: string): Promise<AuthResponse> {
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
