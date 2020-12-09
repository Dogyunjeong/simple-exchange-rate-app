import { RequestHandler } from 'express'
import ExpectedError from '../utils/ExpectedError'
import { handleResponse, handleError } from '../utils/responseHandler'
import { defaultServiceScope } from '../services'
import ExchangeRateService from '../services/ExchangeRateService'
import API_ERRORS from '../constants/apiErrors'
import ExchangeRateTypes from '../types/ExchangeRateTypes'
import ExchangeRateValidator from '../validators/ExchangeRateValidator'

class ExchangeRateController {
  private _exchangeRateService: ExchangeRateService
  constructor ({ exchangeRateService }: { exchangeRateService: ExchangeRateService }) {
    this._exchangeRateService = exchangeRateService
  }
  public searchCountryByName: RequestHandler<null, null, null, { name?: string}> = async (req, res) => {
    try {
      const name: string = req.query.name
      if (!name) {
        throw new ExpectedError('Country name must be provided')
      }
      const countries = await this._exchangeRateService.searchCountryByName(name)
      handleResponse(req, res, countries)
    } catch (err) {
      handleError(req, res, err, API_ERRORS.EXCHANGE_RATE.SEARCH_COUNTRY)
    }
  }
  public listCountry: RequestHandler = async (req, res) => {
    try {
      const userId = req.user._id
      const counries = await this._exchangeRateService.listCountry(userId)
      handleResponse(req, res, counries)
    } catch (err) {
      handleError(req, res, err, API_ERRORS.EXCHANGE_RATE.LIST_COUNTRY)
    }
  }
  public addCountry: RequestHandler<ExchangeRateTypes.Country> = async (req, res) => {
    try {
      const userId = req.user._id
      const country = req.body
      const validResult = await ExchangeRateValidator.validateCountry(country)
      if (!validResult.isValid) {
        throw new ExpectedError(validResult.errors[0])
      }
      const addedUserCountry = await this._exchangeRateService.addUserCountry(userId, country)
      handleResponse(req, res, addedUserCountry)
    } catch (err) {
      handleError(req, res, err, API_ERRORS.EXCHANGE_RATE.ADD_COUNTRY)
    }
  }

}

export default ExchangeRateController
export const exchangeRateController = new ExchangeRateController(defaultServiceScope)
