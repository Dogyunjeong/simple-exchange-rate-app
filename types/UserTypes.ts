namespace UserTypes {
  export interface UserCreate {
    email: string
  }
  export interface User extends UserCreate {
    _id: string
  }
}

export default UserTypes
