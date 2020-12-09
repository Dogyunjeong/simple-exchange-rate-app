import UserTypes from './types/UserTypes'

declare global {
  namespace Express {
    interface User extends UserTypes.User {}
  }
}
