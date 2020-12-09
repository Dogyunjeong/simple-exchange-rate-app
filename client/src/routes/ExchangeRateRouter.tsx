import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CountryList from '../containers/Country/CountryList'
import Landing from '../containers/Landing/Landing'

export interface ExchangeRateRouterProps {}

const ExchangeRateRouter: React.FC<ExchangeRateRouterProps> = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing}/>
      <Route paht="/exchange-rate" exact component={CountryList} />
    </Switch>
  )
}

export default ExchangeRateRouter