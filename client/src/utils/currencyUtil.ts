import ExchangeRateTypes from '../types/ExchangeRateTypes'
import _ from './lodash'

namespace currencyUtil {
  export const getAmountForSEK = (currentSEK: number, currency: ExchangeRateTypes.Currency): number | string => {
    if (!currency || !currency.rateOverSEK) {
      return 'Not available'
    }
    return  _.round(_.multiply(currentSEK, currency.rateOverSEK), 6).toLocaleString()
  }
}

export default currencyUtil

