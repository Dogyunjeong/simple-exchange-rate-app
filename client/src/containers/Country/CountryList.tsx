import React from 'react'
import CountrySearch from './CountrySearch'

export interface CountryListProps { }

const CountryList: React.FC<CountryListProps> = () => {

  return (
    <div>
      <h1>Country list</h1>
      <CountrySearch />
    </div>
  )
}

export default CountryList