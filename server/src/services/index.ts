import UserModel from '../models/UserModel'
import AuthService from './AuthService'
import ExchangeRateService from './ExchangeRateService'

const defaultModelScope = {
  userModel: new UserModel()
}
export const defaultServiceScope = {
  authService: new AuthService(defaultModelScope),
  exchangeRateService: new ExchangeRateService(defaultModelScope),
}
