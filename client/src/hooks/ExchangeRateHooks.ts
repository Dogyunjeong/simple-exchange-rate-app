import { useState, useEffect } from "react"
import { useAppNotificationContext } from "../contexts/AppNotificationContext"
import ExchangeRateTypes from "../types/ExchangeRateTypes"
import { internaRequest } from "../utils/request"

export const useCountryList = (): [ExchangeRateTypes.Country[], () => void] => {
  const notificationCtx = useAppNotificationContext()
  const [countryList, setCountryList] = useState<ExchangeRateTypes.Country[]>(
    []
  )
  const fetchCountryList = async () => {
    try {
      const result = await internaRequest.get<ExchangeRateTypes.Country[]>(
        "/exchange-rate/country"
      )
      setCountryList(result.data)
    } catch (err) {
      notificationCtx.logError(err)
    }
  }
  useEffect(() => {
    fetchCountryList()
  }, [])
  return [
    countryList,
    fetchCountryList,
  ]
}
