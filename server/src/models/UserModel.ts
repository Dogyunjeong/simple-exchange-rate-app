import mongoose from 'mongoose'

import UserTypes from '../types/UserTypes'
import exchangeRateDb from '../db/exchangeRateDb'
import _ from '../utils/lodash'
import { convertObjectIdToString } from '../utils/mongodbUtil'

export type UserDocument = mongoose.Document & UserTypes.User & {
  
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
}, { timestamps: true })

userSchema.plugin(convertObjectIdToString(['_id']))

const User = exchangeRateDb.model<UserDocument>('User', userSchema)

const userProjection = {
  _id: 1, email: 1,
}

class UserModel {
  public async save(user: UserTypes.UserCreate): Promise<UserTypes.User> {
    const createdUser = new User(user)
    await createdUser.save()
    return _.pick(
      createdUser.toObject(),
      Object.keys(userProjection),
    ) as UserTypes.User
  }

  public async findByEmail(email: string): Promise<UserTypes.User>{
    const user = await User.findOne({ email }, userProjection).lean()
    return user
  }
  
  public async findById(userId: string): Promise<UserTypes.User>{
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) }, userProjection).lean()
    return user
  }
}

export default UserModel
