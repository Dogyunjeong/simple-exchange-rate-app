import express from 'express'
import { exchangeRateController } from '../controllers/ExcnahgeRateController'

const exchangeRateRouter = express.Router()

exchangeRateRouter.get('/country/search', exchangeRateController.searchCountryByName)

export default exchangeRateRouter
