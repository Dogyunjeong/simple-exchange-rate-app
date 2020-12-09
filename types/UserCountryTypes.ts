namespace UserCountryTypes {
  export interface UserCountryCreate {
    userId: string
    alpha3Code: string
  }
  export interface UserCountry extends UserCountryCreate {
    _id: string
  }

  export interface UserCountryItem extends UserCountryCreate {}
}

export default UserCountryTypes
