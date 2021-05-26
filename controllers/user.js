import User from '../models/user.js'
import { NotValid } from '../lib/errors.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import { getCoordinates } from '../lib/api.js'

async function register(req, res, next) {
  try {
    
    // ? get coordinates of entered address
    // ? via API
    // ? add coordinates to body before creating user
    const address = req.body.addressDetails
    console.log('address:', address)
    const { data } = await getCoordinates(address)
    console.log('geocodeArray:', data)
    const latitude = data[0].lat
    console.log('latitude:', latitude)
    const longitude = data[0].lon
    console.log('longitude:', longitude)
    console.log(req.body)
    req.body.coordinates.latitude = latitude
    req.body.coordinates.longitude = longitude

    const user = await User.create(req.body)
    console.log(req.body)
    res.status(201).json(user)
  } catch (e) {
    next(e)
  }
}

async function login(req,res,next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    
 
    if (!user) {
      throw new NotValid('There was a problem logging in.')
    }
    const isValidPw = user.validatePassword(req.body.password)
    if (!isValidPw) {
      throw new NotValid('There was a problem logging in.')
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