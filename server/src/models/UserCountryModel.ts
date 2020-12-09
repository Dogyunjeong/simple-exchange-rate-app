import mongoose, { Schema } from 'mongoose'

import UserCountryTypes from '../types/UserCountryTypes'
import exchangeRateDb from '../db/exchangeRateDb'
import _ from '../utils/lodash'
import { convertObjectIdToString } from '../utils/mongodbUtil'

export type UserCounrtyDocument = mongoose.Document & UserCountryTypes.UserCountry & {
}

const UserCounrtySchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  alpha3Code: { type: String, required: true, index: true }
}, { timestamps: true })

UserCounrtySchema.plugin(convertObjectIdToString(['_id']))

const UserCountry = exchangeRateDb.model<UserCounrtyDocument>('UserUserCountry', UserCounrtySchema)

const counrtyProjection = {
  _id: 1, alpha3Code: 1
}

class UserUserCountryModel {
  public async save(counrty: UserCountryTypes.UserCountryCreate): Promise<UserCountryTypes.UserCountryItem> {
    const createdUserCountry = new UserCountry(counrty)
    await createdUserCountry.save()
    return _.pick(
      createdUserCountry.toObject(),
      Object.keys(counrtyProjection),
    ) as UserCountryTypes.UserCountryItem
  }

  public async findByAlpha3Code(userId: string, alpha3Code: string): Promise<UserCountryTypes.UserCountryItem> {
    const userUserCountry = await UserCountry.findOne({ userId, alpha3Code }, counrtyProjection).lean()
    return userUserCountry
  }

  public async listByUserId(userId: string): Promise<UserCountryTypes.UserCountryItem[]>{
    const countries = await UserCountry.find({ userId }, counrtyProjection).lean()
    return countries
  }
}

export default UserUserCountryModel
