import ExchangeRateTypes from '../types/ExchangeRateTypes'
import valiator from '../utils/validator'
import _ from '../utils/lodash'

class ExchangeRateValidator {
  public static validateCountry = async (country: ExchangeRateTypes.Country) => {
    const errors = []
    if (!country) {
      errors.push('country is incorrect')
    }
    if (!country.alpha3Code) {
      errors.push('Alpha 3 Code is missing')
    }
    if (!/^([a-zA-Z]){2,3}$/.test(country.alpha3Code)) {
      errors.push('Alpha 3 Code must be 2 to 3 alphabet')
    }
    if (!country.name) {
      errors.push('Country name is missing')
    }
    if (!country.population) {
      errors.push('population is missing')
    }
    return {
      isValid: errors.length === 0,
      errors,
    }
  }
}

export default ExchangeRateValidator