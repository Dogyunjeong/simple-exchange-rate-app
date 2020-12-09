namespace UserTypes {
  export interface UserCreate {
    email: string
  }
  export interface User {
    _id: string
    email: string
  }
}

export default UserTypes
