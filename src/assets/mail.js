import sgMail from '@sendgrid/mail'
import hash from './hash'
const key = process.env.SENDGRID_APIKEY || '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'

sgMail.setApiKey(key)

const sendMail = (msg) => sgMail.send({...msg, from: process.env.EMAIL || 'robertmontilla94@gmail.com'})

const sendPay = (to, from, id, amount) => {
  const { HOSTNAME } = process.env
  let href = HOSTNAME || 'http://localhost:3000'
  let confirm = hash.encrypt(JSON.stringify({id, status: 'accepted'}))
  let reject = hash.encrypt(JSON.stringify({id, status: 'rejected'}))
  let msg = {
    to,
    subject: 'Se te ha enviado un pago.',
    html: `El usuario: ${from}, te ha enviado $${amount} a tu billetera. Por favor, ingrene a la siguiente direcction y confirme la transaccion: <a href="${href}/transaction/${confirm}">Confirmar</a> o <a href="${href}/transaction/${reject}">rechazar</a>`,
  }
  return sendMail(msg)
}

export default { sendPay }