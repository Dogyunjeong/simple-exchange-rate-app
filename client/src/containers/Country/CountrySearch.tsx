import React, { useState, useEffect } from 'react'
import { TextField, Button, Menu, MenuItem } from '../../components/MaterialUI'
import { useAppNotificationContext } from '../../contexts/AppNotificationContext'
import ExchangeRateTypes from '../../types/ExchangeRateTypes'
import { internaRequest } from '../../utils/request'

export interface CountrySearchProps {
  onAdded: (country: ExchangeRateTypes.Country) => void
}

const CountrySearch: React.FC<CountrySearchProps> = ({ onAdded }) => {
  const notificationCtx = useAppNotificationContext()
  const [countryName, setCountryName] = useState('')
  const [errCountryName, setErrCountryName] = useState('')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [searchedList, setSearchedList] = useState<ExchangeRateTypes.Country[]>([])
  useEffect(() => {
    let err
    if (countryName.length < 3) {
      err = 'Country name must contain more than 3 charactter'
      setErrCountryName(err)
      return
    }
    setErrCountryName('')
  }, [countryName])

  const handleAddCountryInList = async (country: ExchangeRateTypes.Country) => {
    try {
      await internaRequest.post('/exchange-rate/country', country)
      onAdded(country)
      setSearchedList([])
      setCountryName('')
    } catch (err) {
      notificationCtx.logError(err)
    }
  }

  const handleSearch = async () => {
    if (errCountryName) {
      return alert(errCountryName)
    }
    try {
      const result = await internaRequest.get<ExchangeRateTypes.Country[]>(
        '/exchange-rate/country/search',
        { params: { name: countryName } }
      )
      setSearchedList(result.data)
    } catch (err) {
      notificationCtx.logError(err)
    }
  }
  return (
    <div>
      <TextField
        label="Country Name"
        error={!!countryName && !!errCountryName}
        type="search"
        variant="outlined"
        value={countryName}
        placeholder="Type country name to search"
        helperText={!!countryName && errCountryName}
        onChange={(e) => {
          if (!anchorEl) {
            setAnchorEl(e.target)
          }
          setCountryName(e.target.value)
        }}
        aria-controls="country-search"
      />
      <Button variant="outlined" onClick={handleSearch}>Search</Button>
      <Menu
        anchorEl={anchorEl}
        open={searchedList.length > 0}
        onClose={() => setSearchedList([])}
      >
        {searchedList.map((country) => (
          <MenuItem
            onClick={() => handleAddCountryInList(country)}
          >{country.name}</MenuItem>
        ))}
      </Menu>
    </div>

  )
}

export default CountrySearch
