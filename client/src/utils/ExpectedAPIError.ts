
class ExpectedAPIError {
  private _isExpected: boolean = true 
  private _status: number 
  private _message: string | undefined
  constructor(message: string, status: number) {
    this._message = message
    this._status = status
  }

  public get isExpected () {
    return this._isExpected
  }
  public get status () {
    return this._status
  }
  public get message () {
    return this._message
  }
}

export default ExpectedAPIError
