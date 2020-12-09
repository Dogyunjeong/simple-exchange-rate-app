import React, { useState, useEffect } from 'react'
import { TextField, Button, Menu, MenuItem } from '../../components/MaterialUI'
import ExchangeRateTypes from '../../types/ExchangeRateTypes'
import { internaRequest } from '../../utils/request'

export interface CountrySearchProps {
  // onAdded: () => void
}
 
const CountrySearch: React.FC<CountrySearchProps> = () => {
  const [countryName, setCountryName] = useState('')
  const [errCountryName, setErrCountryName] = useState('')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [searchedList, setSearchedList] = useState<ExchangeRateTypes.Country[]>([])
  useEffect(() => {
    let err
    if (countryName.length < 3) {
      err ='Country name must contain more than 3 charactter'
      setErrCountryName(err)
      return
    }
    setErrCountryName('')
  }, [countryName])

  const handleAddCountryInList = async (country: ExchangeRateTypes.Country) => {

  }

  const handleSearch = async () => {
    if (errCountryName) {
      return alert(errCountryName)
    }
    try {
      const result = await internaRequest.get<ExchangeRateTypes.Country[]>(
        '/exchange-rate/country/search',
        { params: { name: countryName}}
      )
      setSearchedList(result.data)
    } catch (err) {
      alert('Failed to search country list')
    }
  }
  return (
    <div>
      <TextField
        label="Country Name"
        error={!!countryName && !!errCountryName}
        type="search"
        variant="outlined"
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
      <Button onClick={handleSearch}>Search</Button>
      {/* {searchedList.length > 0 && (
        <SearchOptionList
        
          list={searchedList.map(({ name, alpha3Code }) => ({
            name,
            value: alpha3Code,
          }))}
          onSelect={(item) => handleAddCountryInList(item.value)}
        />
      )} */}
      <Menu
        anchorEl={anchorEl}
        open={searchedList.length > 0}
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
