import mongoose from 'mongoose'
import user from './user'
import transaction from './transation'
const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})

export { user, transaction }