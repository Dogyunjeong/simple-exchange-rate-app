import { Response, Request } from 'express'
import ExpectedError from './ExpectedError'
import HTTP_STATUS from '../constants/httpStatus'
import appConfig from '../configs/appConfig'

const handleError = (req: Request<any>, res: Response, error: ExpectedError | Error, defaultErrMsg?: string) => {
  const devError: any = { errMessage: error.message }
  const errJSON: { [key:string]: any} = {
    message: error.message || defaultErrMsg || 'Client error',
  }
  if (!appConfig.IS_PRODUCTION) {
    devError.stack = error.stack
    if(error instanceof ExpectedError) {
      console.error('Error: ', devError)
    } else {
      console.error('Internal error: ', devError)
    }
    errJSON.devError = devError
  }
  if (error instanceof ExpectedError) {
    return res
      .status(error.httpStatus)
      .json(errJSON)
  }
  return res
    .status(HTTP_STATUS.INTERNAL_ERROR)
    .json(errJSON)
}

const handleResponse = (req: Request<any>, res: Response, data?: any, successMessage?: string): Response => {
  if (data || successMessage) {
    return res
      .status(HTTP_STATUS.OK)
      .json({
        message: successMessage,
        data,
      })
  }
  return res
    .status(HTTP_STATUS.OK)
    .send()
}

const setJwtCookie = (res: Response, jwt: string, maxAge: number) => {
  res.cookie('jwt', jwt, { httpOnly: true, maxAge })
}

export {
  handleError,
  handleResponse,
  setJwtCookie,
}