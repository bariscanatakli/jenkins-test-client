import { ref } from 'vue'
import type { Ref } from 'vue'

export interface ApiStatus {
  status: string
  message: string
  timestamp: string
}

export interface ApiResponse<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  execute: () => Promise<void>
}

export function useApiService() {
  const apiStatus = ref<ApiStatus | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function checkApiStatus(): Promise<ApiStatus | null> {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('http://localhost:3000/api/status')
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }
      const data = await response.json()
      apiStatus.value = data
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('API error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Generic data fetching method
  function useFetch<T>(url: string): ApiResponse<T> {
    const data: Ref<T | null> = ref(null)
    const fetchLoading = ref(false)
    const fetchError = ref<string | null>(null)
    
    const execute = async (): Promise<void> => {
      fetchLoading.value = true
      fetchError.value = null
      
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }
        data.value = await response.json()
      } catch (err) {
        fetchError.value = err instanceof Error ? err.message : 'Unknown error'
        console.error(`Error fetching ${url}:`, err)
      } finally {
        fetchLoading.value = false
      }
    }
    
    return {
      data,
      loading: fetchLoading,
      error: fetchError,
      execute
    }
  }

  return {
    apiStatus,
    loading,
    error,
    checkApiStatus,
    useFetch
  }
}