/**
 * API Service — HTTP client for backend communication.
 *
 * ⚠️  No backend exists yet. This service is scaffolding for when a real
 * API server is deployed. All current data comes from `src/data/mockData.ts`.
 *
 * Features:
 * - 15-second request timeout via AbortController
 * - Safe 204 No Content handling (no JSON parse on empty body)
 * - Dev-only error logging (production should use Sentry/equivalent)
 */

const DEFAULT_TIMEOUT_MS = 15_000

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.ieltsweb.com'

// Warn once in development if using fallback URL
if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
  console.warn(
    '[ApiService] VITE_API_URL is not set — using fallback:',
    API_BASE_URL,
    '\nSet it in .env to point to your backend.'
  )
}

interface RequestOptions extends RequestInit {
  token?: string
  /** Request timeout in milliseconds. Defaults to 15 000. */
  timeoutMs?: number
}

class ApiService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { token, timeoutMs = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string>),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    // Timeout via AbortController
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      // Handle 204 No Content & empty bodies safely
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return undefined as unknown as T
      }

      return await response.json()
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('API Request failed:', error)
      }
      throw error
    } finally {
      clearTimeout(timeoutId)
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(endpoint: string, data: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const apiService = new ApiService(API_BASE_URL)
