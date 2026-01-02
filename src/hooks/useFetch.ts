import { useState, useEffect, useRef } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * Custom hook for fetching data
 * Note: options are captured on first render only. If you need dynamic options,
 * use a different approach (e.g., useCallback with fetch directly)
 */
export function useFetch<T>(url: string, options?: RequestInit): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  // Store options in ref to avoid dependency issues
  const optionsRef = useRef(options)

  useEffect(() => {
    const controller = new AbortController()

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
        const json = await response.json()
        setData(json)
        setError(null)
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err)
          setData(null)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
