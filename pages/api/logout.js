import { magicAdmin } from '../../lib/magicAdmin'
import { removeTokenCookie } from '../../lib/auth-cookies'
import { getLoginSession } from '../../lib/auth'

export default async function logout(req, res) {
  try {
    const session = await getLoginSession(req)

    if (session) {
      await magicAdmin.users.logoutByIssuer(session.issuer)
      removeTokenCookie(res)
    }
  } catch (error) {
    console.error(error)
  }

  res.writeHead(302, { Location: '/' })
  res.end()
}
