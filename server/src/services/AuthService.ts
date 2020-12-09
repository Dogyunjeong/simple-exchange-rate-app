import UserTypes from '../types/UserTypes'
import UserModel from '../models/UserModel'
import jwtUtil from '../utils/jwtUtil'
import ExpectedError from '../utils/ExpectedError'

class AuthService {
  private _userModel: UserModel
  constructor({
    userModel,
  }: {
    userModel: UserModel
  }) {
    this._userModel = userModel
  }
  
  public loginByEmail = async (email: string): Promise<{ jwt: string, user: UserTypes.User }> => {
    let user = await this._userModel.findByEmail(email)
    if (!user) {
      user = await this._userModel.save({ email })
    }
    const jwt = await jwtUtil.signForUser(user)
    return { jwt, user }
  }

  public jwtAuthenticate = async (token: string): Promise<UserTypes.User> => {
    let encoredUser
    try {
      encoredUser = jwtUtil.verify(token)
    } catch (err) {
      throw new ExpectedError('Invalid json web token')
    }
    const user = await this._userModel.findById(encoredUser._id)
    return user
  }
}

export default AuthService
