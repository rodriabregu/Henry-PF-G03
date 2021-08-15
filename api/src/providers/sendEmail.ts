import { transporter } from '../lib/transporter'
import { appUser } from '../@app'
import { User } from '../db'

const html = (accion: string): string => {
  switch (accion) {
    case "Welcome":
      return "<h4> Helo {firstName} welcome to club crotones your user is {userName} </h4>";
    case "Created": case "Processing": case "Cancelled": case "Complete":
      return "<h4> Helo {firstName} your sale number: {saleId} now is {state} </h4>";
    default: return "<p> message club crotones </p>";
  }
}

/**
 * user
 * accion
 */
export default async (userId: number, accion: string, saleId: number = 0) => {
  const user = await User.findByPk(userId)
  if (!user) throw Error(`sent imail - user ${userId} is not`)
  const { email, firstName, userName } = user.get()
  await transporter.sendMail({
    from: '"club crotones" <clubcrotones@gmail.com>', // sender address
    to: email, // list of receivers
    subject: accion,  // Subject line
    //text: "esto es el texto", // plain text body
    html: html(accion)
      .replace(/\{firstName\}/g, firstName)
      .replace(/\{userName\}/g, userName)
      .replace(/\{saleId\}/g, `${saleId}`)
      .replace(/\{state\}/g, accion)
  });
}