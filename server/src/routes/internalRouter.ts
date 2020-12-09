import express from 'express'
import exchangeRateRouter from './exchangeRateRouter'

const interRouter = express.Router()
interRouter.use('/exchange-rate/',  exchangeRateRouter)

export default interRouter
