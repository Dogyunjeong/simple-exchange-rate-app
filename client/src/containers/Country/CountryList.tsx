import React, { useState } from 'react'
import CountrySearch from './CountrySearch'
import { useCountryList } from '../../hooks/ExchangeRateHooks'
import { Grid, List, ListItem, InputAdornment, Box, Divider, TextField } from '../../components/MaterialUI'
import currencyUtil from '../../utils/currencyUtil'

export interface CountryListProps { }

const CountryList: React.FC<CountryListProps> = () => {
  const [countryList, reFetchCountries] = useCountryList()
  const [currentSEK, setCurrentSEK] = useState<number| null>(null)
  const handleCountryAdded = () => {
    reFetchCountries()
  }
  return (
    <div>
      <h1>Country list</h1>
      <CountrySearch
        onAdded={handleCountryAdded}
      />
      <Divider />
      <Grid container direction="column">
        <h4>Check how much value SEK has</h4>
        <Grid item>
          <TextField
            label="SEK"
            placeholder="Type amount of SEK"
            InputProps={{
              endAdornment: <InputAdornment position="end">Kr</InputAdornment>
            }}
            value={currentSEK}
            onChange={(e) => setCurrentSEK(parseInt(e.target.value, 10))}
          />
        </Grid>
      </Grid>
      <Divider />
      <List>
        {countryList.length > 0 && countryList.map((country, idx) => {
          return (
            <ListItem key={`country-${idx}`}>
              <Box component="span" width="30%">
                {country.name}
              </Box>
              <Box component="span" m={3} width="30%">
                Population: {country.population.toLocaleString()}
              </Box>
              <Box component="span" m={2} width="10%">
                {country.currency.symbol} {country.currency.code}
              </Box>
              <Box component="span" m={2} >
                {currentSEK ? currencyUtil.getAmountForSEK(currentSEK, country.currency) : ''}
              </Box>                  
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default CountryList