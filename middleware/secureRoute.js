import jwt from 'jsonwebtoken'
import User from '../model/user.js'
import { secret } from '../config/environment.js'

export default function secureRoute(req, res, next) {

  const rawToken = req.headers.authorization
  if (!rawToken || !rawToken.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized ' })
  }

  const token = rawToken.replace('Bearer ', '')
  console.log(token)


  jwt.verify(token, secret, async (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized ' })
    }
    const user = User.findById(payload.userId)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized ' })
    }
    req.currentUser = user
    next()
  })
}
