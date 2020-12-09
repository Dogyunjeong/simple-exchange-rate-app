import express from 'express'
import { exchangeRateController } from '../controllers/ExcnahgeRateController'

const exchangeRateRouter = express.Router()

exchangeRateRouter.get('/country/search', exchangeRateController.searchCountryByName)
exchangeRateRouter.get('/country/', exchangeRateController.listCountry)
exchangeRateRouter.post('/country/', exchangeRateController.addCountry)


export default exchangeRateRouter
