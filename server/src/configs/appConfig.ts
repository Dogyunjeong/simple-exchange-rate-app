namespace appConfig {
  export const APP_PORT: number = parseInt(process.env.APP_PORT, 10)
  export const IS_TEST: boolean = process.env.NODE_ENV === 'test'
  export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === 'production'
  export const IS_PRODUCTION: boolean = !IS_TEST && !IS_DEVELOPMENT
  export const API_RATE_WINDOW_TIME: number = (parseInt(process.env.API_RATE_LIMIT, 10) || 1 ) * 60 * 1000 // Mins
  export const API_RATE_LIMIT: number = 30
  export const CORS_WHITE_LIST: string[] = [process.env.CLIENT_BASE_URL]
}

export default  appConfig
