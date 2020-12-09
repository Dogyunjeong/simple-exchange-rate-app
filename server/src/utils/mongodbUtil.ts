import { Schema } from 'mongoose'

export const convertObjectIdToString = (keys: string[]) => (schema: Schema) => {
  function convertObjectIds(doc: any){
    if (doc === null) {
      return doc
    }
    
    if (this._mongooseOptions.lean) {
      keys.forEach((key) => {
        if (doc[key]) {
          doc[key] = doc[key].toString()
        }
      })
    }

  }
  schema.post('findOne', convertObjectIds)
  schema.post('findOneAndUdate', convertObjectIds)
}