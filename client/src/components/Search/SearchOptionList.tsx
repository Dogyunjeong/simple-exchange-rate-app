import React from 'react'
import { Menu, MenuItem } from '../MaterialUI'

type Item = { value: any, name: string }
export interface SearchOptionListProps {
  open?: boolean
  list: Item[]
  onSelect: (item: Item) => void
}
 
const SearchOptionList: React.SFC<SearchOptionListProps> = ({
  open = true,
  list = [],
  onSelect
}) => {
  return (
    <Menu open={open}>
      {list.map((item) => (
        <MenuItem
          onClick={() => onSelect(item)}
        >{item.name}</MenuItem>
      ))}
    </Menu>
  )
}
 
export default SearchOptionList;