import externalApiConfig from "../configs/externalApiConfig"
import httpRequestUtil from "../utils/HttpRequestUtil"
import ExchangeRateTypes from "../types/ExchangeRateTypes"
import UserCountryModel from "../models/UserCountryModel"
import ExpectedError from "../utils/ExpectedError"
import _ from "../utils/lodash"
import BPromise from "../utils/BPromise"
import CurrencyDriver from '../drivers/CurrencyDriver'

class ExchangeRateService {
  private _request = httpRequestUtil
  private _userCountryModel: UserCountryModel
  private _currencyDriver: CurrencyDriver
  constructor(
    {
      userCountryModel,
      currencyDriver
    }: {
      userCountryModel: UserCountryModel,
      currencyDriver: CurrencyDriver,
    },
    { request }: { request?: any } = {}
  ) {
    if (request) {
      this._request = request
    }
    this._userCountryModel = userCountryModel
    this._currencyDriver = currencyDriver
  }

  private _trimRawCountries = async (
    couontires: any[],
    includeRateOverSEK: boolean
  ): Promise<ExchangeRateTypes.Country[]> => {
    return BPromise.map(couontires, async (rawCountry) => {
      const mostRelevantCurrency: ExchangeRateTypes.Currency = _.get(rawCountry, 'currencies[0]')
      if (!mostRelevantCurrency) {
        console.error(`Failed to find mostrelevant Currency for ${rawCountry.alpha3Code}: `, rawCountry)
        return null
      }
      const country: ExchangeRateTypes.Country = {
        name: rawCountry.name,
        alpha3Code: rawCountry.alpha3Code,
        population: rawCountry.population,
        currency: mostRelevantCurrency,
      }
      if (includeRateOverSEK){
        const rateOverSEK = await this._currencyDriver.getCurrencyForSEK(mostRelevantCurrency.code)
        country.currency = _.merge({}, mostRelevantCurrency, { rateOverSEK })
      }
      return country
    })
  }

  private _listCountriesByAlpha3Codes = async (alpha3Codes: string[]) => {
    if (!alpha3Codes || alpha3Codes.length === 0) {
      return []
    }
    try {
      const response = await this._request.get(
        `${externalApiConfig.REST_COUNTRY_API.URL}/alpha?codes=${alpha3Codes.join(
          ";"
        )}`
      )
      return this._trimRawCountries(response.body, true)
    } catch (err) {
      console.error('Fiaeld to fetch country information', err)
      throw new Error('Failed to fetch country informattiosn by alpha3Code')
    }
  }

  public searchCountryByName = async (
    countryName: string
  ): Promise<ExchangeRateTypes.Country[]> => {
    const response = await this._request.get(
      `${externalApiConfig.REST_COUNTRY_API.URL}/name/${countryName}`
    )
    const countries: ExchangeRateTypes.Country[] = await this._trimRawCountries(
      response.body,
      false
    )
    return countries
  }

  public listCountry = async (userId: string) => {
    const countries = await this._userCountryModel.listByUserId(userId)
    return this._listCountriesByAlpha3Codes(
      countries.map(({ alpha3Code }) => alpha3Code)
    )
  }
  public addUserCountry = async (
    userId: string,
    country: ExchangeRateTypes.Country
  ) => {
    const foundUserCountry = await this._userCountryModel.findByAlpha3Code(
      userId,
      country.alpha3Code
    )
    if (foundUserCountry) {
      throw new ExpectedError(`${country.name} is existing in your list`)
    }
    const addedUserCountry = await this._userCountryModel.save({
      userId,
      alpha3Code: country.alpha3Code,
    })
    return addedUserCountry
  }
}

export default ExchangeRateService
