import { useState, useEffect, useRef } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * Custom hook for fetching data.
 * The options parameter is tracked via ref and updated on each render,
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
