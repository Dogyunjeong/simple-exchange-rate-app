import HTTP_STATUS from '../constants/httpStatus'

class ExpectedError extends Error {
  private _httpStatus: number

  public static HTTP_STATUS = HTTP_STATUS

  constructor (
    errMsg: string = null,
    httpStatus: number = 400,
  ) {
    super(errMsg)
    this._httpStatus = httpStatus
  }

  public get isExpected (): boolean {
    return true
  }

  public get httpStatus (): number {
    return this._httpStatus
  }
}

export default ExpectedError
export { HTTP_STATUS }
