import ExchangeRateTypes from "../types/ExchangeRateTypes"
import UserCountryModel from "../models/UserCountryModel"
import ExpectedError from "../utils/ExpectedError"
import _ from "../utils/lodash"
import BPromise from "../utils/BPromise"
import CurrencyDriver from '../drivers/CurrencyDriver'
import CountryDriver from '../drivers/CountryDriver'

class ExchangeRateService {
  private _userCountryModel: UserCountryModel
  private _currencyDriver: CurrencyDriver
  private _countryDriver: CountryDriver
  constructor(
    {
      userCountryModel,
      currencyDriver,
      countryDriver,
    }: {
      userCountryModel: UserCountryModel,
      currencyDriver: CurrencyDriver,
      countryDriver: CountryDriver 
    },
  ) {
    this._userCountryModel = userCountryModel
    this._currencyDriver = currencyDriver
    this._countryDriver = countryDriver
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
    const rawCountries = await this._countryDriver.listCountriesByAlpha3Codes(alpha3Codes)
    return this._trimRawCountries(rawCountries, true)
  }

  public searchCountryByName = async (
    countryName: string
  ): Promise<ExchangeRateTypes.Country[]> => {
    const rawCountries = await this._countryDriver.searchByName(countryName)
    const countries: ExchangeRateTypes.Country[] = await this._trimRawCountries(
      rawCountries,
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
