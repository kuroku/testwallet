import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  to: { type: Schema.Types.ObjectId, required: true },
  from: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['wait', 'accepted', 'rejected'], required: true }
})

const Model = mongoose.model('Transaction', schema)

const create = (tranx, callback) => Model.create(tranx, callback)

export default { create }