import ms from 'ms'
import externalApiConfig from '../configs/externalApiConfig'
import httpRequestUtil from '../utils/HttpRequestUtil'
import ExpectedError from '../utils/ExpectedError'
import _ from '../utils/lodash'

const ONE_DAY_IN_MS = ms('1d')

class CurrencyDriver {
  private _request = httpRequestUtil
  private _cachedTimetamp: number
  private _base = 'EUR'
  private _cacheRates: { [key: string]: number }

  constructor() {
    this._getRates()
  }
  
  private _getRates = async () => {
    if (this._cachedTimetamp && (this._cachedTimetamp + ONE_DAY_IN_MS) < new Date().getTime()) {
      return this._cacheRates
    }
    try {
      const response =  await this._request.get(`${externalApiConfig.REST_CURRENCY_API.URL}?access_key=${externalApiConfig.REST_CURRENCY_API.ACCESS_KEY}`)
      if (!response.body.success) {
        console.error('Currency API response: ', response)
        throw new Error('Currency API send response body with success = false')
      }
      if (this._base !== response.body.base) {
        console.error('Currency API response: ', response)
        throw new Error('Currency API base is changed')
      }
      this._cachedTimetamp = response.body.timestamp
      this._cacheRates = response.body.rates
      console.info('Fetched currnecy rates')
    } catch (err) {
      console.error('Fiaeld to fetch currency information', err)
      throw new Error('Failed to fetch currency informattiosn ')
    }
  }

  public getCurrencyForSEK = async(currencyCodes: string): Promise<number> => {
    const rates = await this._getRates()
    if (_.isNil(rates[currencyCodes])) {
      return null
    }
    return _.round(
      _.divide(rates[currencyCodes],  rates['SEK']),
      6
    )
  }
}

export default CurrencyDriver
