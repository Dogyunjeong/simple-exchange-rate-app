import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CountryList from '../containers/Country/CountryList'
import Landing from '../containers/Landing/Landing'

export interface ExchangeRateRouterProps {}

const ExchangeRateRouter: React.FC<ExchangeRateRouterProps> = () => {
  return (
    <Switch>
      <Route paht="/exchange-rate" exact component={CountryList} />
      <Route path="/" component={Landing}/>
    </Switch>
  )
}

export default ExchangeRateRouter