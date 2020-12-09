import ms from 'ms'
import { RequestHandler } from 'express'
import AuthService from '../services/AuthService'
import UserValidator from '../validators/UserValidator'
import ExpectedError from '../utils/ExpectedError'
import { handleResponse, handleError, setJwtCookie} from '../utils/responseHandler'
import jwtConfig from '../configs/jwtConfig'
import { defaultServiceScope } from '../services'
import API_ERRORS from '../constants/apiErrors'

class AuthController {
  private _authService: AuthService
  constructor ({ authService }: { authService: AuthService }) {
    this._authService = authService
  }
  public login: RequestHandler = async (req, res) => {
    try {
      const email = req.body.email
      const validResult = await UserValidator.validateEmail(email)
      if (!validResult.isValid) {
        throw new ExpectedError(validResult.errors[0])
      }
      const { jwt, user } = await this._authService.loginByEmail(email)
      setJwtCookie(res, jwt, ms(jwtConfig.JWT_MAX_AGE))
      res.status(200)
      handleResponse(req, res, user)
    } catch (err) {
      handleError(req, res, err, API_ERRORS.AUTH.LOGIN)
    }
  }

  public signOut: RequestHandler = async (req, res) => {
    setJwtCookie(res, '', 0)
    return handleResponse(req, res, null, 'Successfully signed out')
  }

  public checkLogin: RequestHandler = async (req, res) => {
    handleResponse(req, res, {
      _id: req.user._id,
      email: req.user.email,
    })
  }
}

export default AuthController
export const authController = new AuthController(defaultServiceScope)
