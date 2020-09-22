import jwt from './jwt'
import { user } from '../models'
const decodeAuthentication = (req, res, next) => {
  const { token } = req.params
  if ( !token ) return res.status(401).send('token no declarado')
  jwt.decode(token)
  .then(payload => {
    user.findByID(payload)
    .then(doc => {
      if ( !doc ) return res.status(401).send('usuario no encontrado como autenticado')
      req.credential = doc
      next()
    })
    .catch(err => res.status(400).send(err))
  })
  .catch(err => res.status(401).send(err))
}
export { decodeAuthentication }