import externalApiConfig from '../configs/externalApiConfig'
import httpRequestUtil from '../utils/HttpRequestUtil'
import ExchangeRateTypes from '../types/ExchangeRateTypes'

class ExchangeRateService {
  private _request = httpRequestUtil
  constructor ({}, { request }: { request?: any } = {}) {
    if (request) {
      this._request = request
    }

  }

  public searchCountryByName = async (countryName: string):Promise<ExchangeRateTypes.Country[]> => {
    const response = await this._request.get(`${externalApiConfig.REST_COUNTRY_API.URL}/name/${countryName}`)
    const countries: ExchangeRateTypes.Country[] = response.body
      .map(({ name, alpha3Code, currencies, population }: any) => ({ name, alpha3Code, currencies, population }))
    return countries
  } 
}

export default ExchangeRateService
