import { RequestHandler } from 'express'
import appConfig from '../configs/appConfig'

export const requestLoggingMiddleware: RequestHandler = (req, res, next) => {
  if (!appConfig.IS_PRODUCTION) {
    console.log('\n## Req.url: ', req.url)
    console.log(
      '## Req.body: ',
      JSON.stringify(req.body, null, 3),
      '\n',
    )
  }
  next()
}