import { RequestHandler } from 'express'
import ExpectedError from '../utils/ExpectedError'
import { handleError } from '../utils/responseHandler'
import { defaultServiceScope } from '../services'


export const jwtAuthenticateMiddleware: RequestHandler = async (req, res, next) => {
  try {
    // Has been authencaticated
    if (req.user?._id) {
      return next()
    }
    const token = req.cookies.jwt
    if (!token) {
      return handleError(req, res, new ExpectedError('Unauthriased', ExpectedError.HTTP_STATUS.UNAUTHORIZED))
    }
    const user = await defaultServiceScope.authService.jwtAuthenticate(token)
    req.user = user
    next()
  } catch (err) {
    return handleError(req, res, new ExpectedError(err.message, ExpectedError.HTTP_STATUS.UNAUTHORIZED))
  }
}
