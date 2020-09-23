import mongoose, { Schema } from 'mongoose'
import user from './user'
const schema = new Schema({
  to: { type: Schema.Types.ObjectId, required: true, ref:"User" },
  from: { type: Schema.Types.ObjectId, required: true, ref:"User" },
  amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['wait', 'accepted', 'rejected'], required: true }
})

const Model = mongoose.model('Transaction', schema)

const create = (tranx, callback) => Model.create(tranx, callback)

const changeStatus = (id, status, callback) => {
  Model.findByIdAndUpdate(id, {$set: { status }}, (err, doc) => {
    if ( err || status == 'rejected') return callback(err)
    user.debitTransaction(doc.to, doc.from, doc.amount, callback)
  })
}

export default { create, changeStatus }