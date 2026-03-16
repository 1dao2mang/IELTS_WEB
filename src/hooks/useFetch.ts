import { useState, useEffect, useRef } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

const DEFAULT_TIMEOUT_MS = 15_000

/**
 * Custom hook for fetching data.
 *
 * Features:
 * - 15-second request timeout via AbortController
 * - Safe handling of 204 / empty-body responses
 * - Aborts in-flight requests on unmount or URL change
 *
 * The `options` parameter is tracked via ref and updated on each render,
 * ensuring the latest options are always used for requests.
 */
export function useFetch<T>(url: string, options?: RequestInit): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Update options ref on every render so latest options are used
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    const controller = new AbortController()

    // Timeout — abort if the request takes too long
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url, {
          ...optionsRef.current,
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Handle 204 / empty body safely
        if (response.status === 204 || response.headers.get('content-length') === '0') {
          setData(null)
        } else {
          const json = await response.json()
          setData(json)
        }

        setError(null)
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err)
          setData(null)
        }
      } finally {
        clearTimeout(timeoutId)
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [url])

  return { data, loading, error }
}
