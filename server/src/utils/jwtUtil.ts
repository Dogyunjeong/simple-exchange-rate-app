import jsonwebtoken from 'jsonwebtoken'
import UserTypes from '../types/UserTypes'
import  jwtConfig from '../configs/jwtConfig'

const signForUser = (user: UserTypes.User): string => {
  return jsonwebtoken.sign({
    _id: user._id,
  }, jwtConfig.JWT_SECRET, {
    issuer: jwtConfig.JWT_ISSUER,
    expiresIn: jwtConfig.JWT_MAX_AGE,
  })
}
const verify = (jwt: string): { _id: string } => {
  return jsonwebtoken.verify(jwt, jwtConfig.JWT_SECRET, {
    issuer: jwtConfig.JWT_ISSUER
  }) as { _id: string }
}

export default {
  signForUser,
  verify,
}