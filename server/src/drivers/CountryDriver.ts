import ExchangeRateTypes from '../types/ExchangeRateTypes'
import externalApiConfig from '../configs/externalApiConfig'
import httpRequestUtil from '../utils/HttpRequestUtil'

class CountryDriver {
  private _request = httpRequestUtil

  public searchByName = async (countryName: string): Promise<ExchangeRateTypes.Country[]> => {
    try {
      const response = await this._request.get(
        `${externalApiConfig.REST_COUNTRY_API.URL}/name/${countryName}`
      )
      return response.body
    } catch (err) {
      console.error('Fiaeld to search countries by name', err)
      throw new Error('Failed to search countries information by name')
    }
  }

  public listCountriesByAlpha3Codes = async (alpha3Codes: string[]): Promise<ExchangeRateTypes.Country[]> => {
    try {
      const response = await this._request.get(
        `${externalApiConfig.REST_COUNTRY_API.URL}/alpha?codes=${alpha3Codes.join(
          ";"
        )}`
      )
      return response.body
    } catch (err) {
      console.error('Fiaeld to fetch countries information', err)
      throw new Error('Failed to fetch countries information by alpha3Code')
    }
  }
}

export default CountryDriver
