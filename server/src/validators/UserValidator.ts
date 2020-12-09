import valiator from '../utils/validator'

class UserValidator {
  public static validateEmail = async (email: string) => {
    const errors = []
    if (!email) {
      errors.push('Email is missing')
    }
    if (email && !valiator.isEmail(email)) {
      errors.push('Email should be validate format')
    }
    return {
      isValid: errors.length === 0,
      errors,
    }
  }
}

export default UserValidator