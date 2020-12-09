namespace ExchangeRateTypes {
  export interface Currency {
    code: string
    name: string
    symbol: string
  }
  export interface Country {
    name: string
    alpha3Code: string
    currencies: Currency[]
    population: number
  }
}

export default ExchangeRateTypes
