import { Router } from 'express'
import auth from './auth'
import { decodeAuthentication } from '../assets/middlewares'
import jwt from '../assets/jwt'
import { user } from '../models'
const api = Router()
api
.use('/auth/:token', decodeAuthentication, auth)

.post('/', (req, res) => {
  const { body } = req
  user.create(body, (err, doc) => {
    if ( err ) return status(400).send(err)
    res.status(200).send({ doc, token: jwt.create(doc._id) })
  })
})

.get('/:email&:password', (req, res) => {
  const { email, password } = req.params
  user.findByAuth(email, password, (err, doc) => {
    if ( err ) return res.status(400).send(err)
    else if ( !doc ) return res.status(404).send('autenticacion invalida')
    res.status(200).send({ doc, token: jwt.create(doc._id) })
  })
})

.get('/:email', (req, res) => {
  let { email } = req.params
  user.findByEmail(email, (err, doc) => {
    if ( err ) return res.status(400).send(err)
    if ( !doc ) return res.status(404).send('usuario no existe')
    res.status(200).send(doc)
  })
})
export default api