import User from '../model/users.js'

import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (e) {
    next(e)
  }
}


async function login(req,res,next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    
 
    if (!user) {
      console.log('there is a problem loggin in/user details or user does not exict')
    }
    const isValidPw = user.validatePassword(req.body.password)
    if (!isValidPw) {
      console.log('Not valid password.')
    }

    const token = jwt.sign(
      { userId: user._id },
      secret,
      { expiresIn: '72h' }
    )
    
    console.log('Success!')
    res.status(202).json({ message: 'Login successful', token })

  } catch (e) {
    next(e)
  }
}


export default {
  register,
  login,
}