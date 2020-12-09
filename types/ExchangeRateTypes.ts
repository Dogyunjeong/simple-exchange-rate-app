namespace ExchangeRateTypes {
  export interface Currency {
    code: string
    name: string
    symbol: string
    rateOverSEK?: number
  }
  export interface Country {
    name: string
    alpha3Code: string
    currency: Currency
    population: number
  }
}

export default ExchangeRateTypes
