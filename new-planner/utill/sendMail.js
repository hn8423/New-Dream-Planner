import * as nodemailer from 'nodemailer'

/**@type {(args: {userEmail:string, html:string, subject:string})=>Promise<void>} */
export default async function sendMail({ userEmail, html, subject }) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  })
  // let target = 'http://example.com'
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `noreply@rndasia.co.kr`,
    to: userEmail,
    subject,
    html,
  })

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
