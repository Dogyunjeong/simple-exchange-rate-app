import CountryDriver from '../drivers/CountryDriver'
import CurrencyDriver from '../drivers/CurrencyDriver'
import UserCountryModel from '../models/UserCountryModel'
import UserModel from '../models/UserModel'
import AuthService from './AuthService'
import ExchangeRateService from './ExchangeRateService'

const defaultModelScope = {
  userModel: new UserModel(),
  userCountryModel: new UserCountryModel(),
  currencyDriver: new CurrencyDriver(),
  countryDriver: new CountryDriver(),
}
export const defaultServiceScope = {
  authService: new AuthService(defaultModelScope),
  exchangeRateService: new ExchangeRateService(defaultModelScope),
}
