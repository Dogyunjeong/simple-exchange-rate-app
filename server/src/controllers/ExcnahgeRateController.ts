import { RequestHandler } from 'express'
import ExpectedError from '../utils/ExpectedError'
import { handleResponse, handleError } from '../utils/responseHandler'
import { defaultServiceScope } from '../services'
import ExchangeRateService from '../services/ExchangeRateService'
import API_ERRORS from '../constants/apiErrors'

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
}

export default ExchangeRateController
export const exchangeRateController = new ExchangeRateController(defaultServiceScope)
