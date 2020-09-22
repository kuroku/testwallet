import { Router, json } from 'express'
import user from './user'
const api = Router()
api
.use(json())
.use('/user', user)
export default api