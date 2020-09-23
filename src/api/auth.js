import { Router } from 'express'
import { user, transaction } from '../models'
import mail from '../assets/mail'
const api = Router()
api
.get('/', (req, res) => {
  const { credential } = req
  res.send(credential)
})
.put('/recharge', (req, res) => {
  const { body, credential } = req
  if ( body.dni != credential.dni || body.doc != credential.doc ) {
    return res.status(401).send('usted no tiene autorizacion para recargar el saldo')
  }
  user.updateByID(credential._id, { amount: parseInt(credential.amount) + parseInt(body.amount)}, (err, doc) => {
    if ( err ) return res.status(400).send(err)
    if ( !doc ) return res.status(404).send('el usuario que trata de actualizar no esta registrado')
    res.status(200).send('se ha recargado el saldo con exito')
  })
})
.post('/transaction', (req, res) => {
  const { body, credential } = req
  user.findByEmail(body.to, (err, doc) => {
    if ( err ) return res.status(400).send(err)
    if ( !doc ) return res.status(404).send('el usuario a que intenta pagarle, no existe')
    if ( body.amont > doc.amount) return res.status(400).send('usted no posee el dinero suficiente para realizar el pago')
    transaction.create({ to: doc._id, from: credential._id, amount: body.amount, status: 'wait'}, (err, doc) => {
      if ( err ) return res.status(400).send(err)
      user.addTranx(doc._id, [{email: body.to}, {email: credential.email}], (err) => {
        if (err) return res.status(400).send(err)
        mail.sendPay(body.to, credential.email, doc._id, body.amount)
        res.status(200).send('la transaccion fue enviada con exito y esta en la espera')
      })
    })
  })
})
export default api