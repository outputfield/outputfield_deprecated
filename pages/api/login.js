import { magicAdmin } from '../../lib/magicAdmin'
import { setLoginSession } from '../../lib/auth'

export default async function login(req, res) {
  try {
    // const didToken = req.headers.authorization.substr(7)
    const didToken = magicAdmin.utils.parseAuthorizationHeader(req.headers.authorization)
    const metadata = await magicAdmin.users.getMetadataByToken(didToken)
    const session = { ...metadata }
    await setLoginSession(res, session)

    res.status(200).send({ done: true })
  } catch (error) {
    // res.status(error.status || 500).end(error.message)
    console.log(`/api failed to login user: ${error}`)
    throw error
  }
}
