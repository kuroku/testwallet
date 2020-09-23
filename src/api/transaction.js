import { Router } from 'express'
import hash from '../assets/hash'
import { transaction, user } from '../models'
const api = Router()
api
.put('/:token', (req, res) => {
  const { token } = req.params
  const {id, status} = JSON.parse(hash.decrypt(token))
  transaction.changeStatus(id, status, err => {
    if ( err ) return res.status(400).send(err)
    if ( status == 'rejected' ) return res.status(200).send({message: 'la transaccion ha sido rechazada con exito'})
    res.status(200).send({message: 'la transaccion ha sido acceptada con exito'})
  })
})
export default api