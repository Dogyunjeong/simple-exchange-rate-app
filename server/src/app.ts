// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config() 
import express, { RequestHandler } from 'express'
import cors, { CorsOptions } from 'cors'
import rateLimit from 'express-rate-limit'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import appConfig from './configs/appConfig'

import publicRouter from './routes/publicRouter'
import internalRouter from './routes/internalRouter'
import { jwtAuthenticateMiddleware } from './middleware/authMiddleware'
import { requestLoggingMiddleware } from './middleware/logMiddleware'

const rateLimitOption: rateLimit.Options = {
  windowMs: appConfig.API_RATE_WINDOW_TIME,
  max: appConfig.API_RATE_LIMIT,
  keyGenerator: (req) => {
    return req.cookies.jwt
  }
}

const corsOptions: CorsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!appConfig.IS_PRODUCTION) {
      return callback(null, true)
    }
    if (appConfig.CORS_WHITE_LIST.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS.'))
    }
  }
}

const app = express()

app.set('port', appConfig.APP_PORT || 3444)

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(requestLoggingMiddleware)

app.get('/health', (req, res) => {
  res.send('OK')
})

// Only works in whent it is not Production

app.use(publicRouter)
app.use('/api/v1', rateLimit(rateLimitOption), jwtAuthenticateMiddleware, internalRouter)

export default app

