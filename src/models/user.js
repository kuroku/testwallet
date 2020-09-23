import mongoose, { Schema } from 'mongoose'

const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
}

const schema = new Schema({
  name: { type: String, required: true, lowercase: true },
  dni: { type: String, required: true, lowercase: true },
  doc: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  amount: { type: Number, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }]
})

const Model = mongoose.model('User', schema)

function create(data, callback) {
  return Model.create({...data, amount: 200}, callback)
}
function findByAuth(email, password, callback) {
  Model.findOne({ email, password }, callback)
}
function findByEmail(email, callback) {
  return Model.findOne({ email }, callback)
}

function findByID(id, callback) {
  return Model.findById(id).select('-password').populate({
    path: 'transactions', 
    select: 'amount status -_id',
    populate: {
      path: 'to from',
      select: 'email name -_id'
    }
  }).exec(callback)
}

function updateByID(id, nv, callback) {
  return Model.findByIdAndUpdate(id, {$set: nv}, callback)
}

function addTranx(id, users, callback) {
  return Model.updateMany({$or: users}, {$addToSet: {transactions: id }}, callback)
}

function debitTransaction(to, from, amount, callback) {
  Model.findById(to, (err, doc) => {
    updateByID(to, {amount: doc.amount + amount}, err => {
      Model.findById(from, (err, doc) => {
        updateByID(from, {amount: doc.amount - amount}, err => {
          callback()
        })
      })
    })
  })
}

export default { create, findByEmail, findByAuth, findByID, updateByID, addTranx, debitTransaction }