namespace apiConfig {
  export const PUBLIC_API_BASE_URL = process.env.REACT_APP_PUBLIC_API_BASE_URL
  export const INTERNAL_API_BASE_URL = process.env.REACT_APP_INTERNAL_API_BASE_URL
  export const API_BASE_TIMEOUT: number = parseInt(process.env.REACT_APP_API_BASE_TIMEOUT || '1000', 10) || 1000
}

export default apiConfig
