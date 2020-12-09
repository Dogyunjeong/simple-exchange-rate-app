import mongoose from 'mongoose'
import dbConfig from '../configs/dbConfig'

const ObjectId = mongoose.Types.ObjectId

ObjectId.prototype.valueOf = function () {
	return this.toString()
}

const conn = mongoose.createConnection(dbConfig.EXCHANGE_RATE_DB_MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
})

conn.on('error', (err: Error) => {
  console.error('Exchange rate db connection has error: ', { message: err.message, stack: err.stack })
})

conn.on('open', () => {
  console.info('Exchange rate db connection is opened')
})

export default conn
