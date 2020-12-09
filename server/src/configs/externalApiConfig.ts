namespace externalApiConfig {
  export const REST_COUNTRY_API = {
    URL: process.env.REST_COUNTRY_API_URL
  }

  export const REST_CURRENCY_API = {
    URL: process.env.REST_CURRENCY_API_URL,
    ACCESS_KEY: process.env.REST_CURRENCY_API_ACCESS_KEY,
  }
}

export default externalApiConfig
