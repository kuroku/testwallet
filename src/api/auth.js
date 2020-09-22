import { Router } from 'express'
const api = Router()
api
.get('/', (req, res) => {
  const { credential } = req
  res.send(credential)
})
.post('/pay', (req, res) => {
  
})
export default api