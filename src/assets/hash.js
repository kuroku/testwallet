import Cryptr from 'cryptr'
const cryptr = new Cryptr(process.env.KEY_HASH || 'myTotalySecretKey')

const encrypt = payload => cryptr.encrypt(payload)
const decrypt = hash => cryptr.decrypt(hash)

export default { encrypt, decrypt }