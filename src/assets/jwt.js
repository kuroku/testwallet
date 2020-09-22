import jwt from 'jwt-simple'
const key = process.env.KEY || "prueba12345"

const create = payload => jwt.encode(payload, key)
const decode = token => new Promise((resolve, reject) => {
  try {
   let payload = jwt.decode(token, key)
   resolve(payload)
  } catch (err) {
    reject(err)
  }
})

export default { create, decode }