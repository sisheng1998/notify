import admin from 'firebase-admin'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export const sendEmail = async (
  userId: string,
  mailOptions: nodemailer.SendMailOptions
) => {
  try {
    const user = await admin.auth().getUser(userId)

    if (user && user.email) {
      await transporter.sendMail({
        from: 'Notify <hello@sisheng.my>',
        to: user.email,
        ...mailOptions,
      })

      return `Email sent to user (email: ${user.email}).`
    } else {
      return `User (userId: ${userId}) email not found.`
    }
  } catch (error) {
    return `${error}`
  }
}
