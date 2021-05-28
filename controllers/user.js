import User from '../models/user.js'
import { NotValid } from '../lib/errors.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import { getCoordinates } from '../lib/api.js'

// ! New structure
async function register(req, res, next) {
  try {
    // ? get coordinates of entered address
    // ? via API
    // ? add coordinates to body before creating user

    const { data } = await getCoordinates(
      req.body.postalCode.replace(' ', '+'),
      req.body.city.replace(' ', '+'),
      req.body.street.replace(' ', '+'),
      req.body.streetNo.replace(' ', '+'),
      req.body.region.replace(' ', '+'),
      req.body.country.replace(' ', '+')
    )
    // if (data.length === 0) {
    //   return res.status(401).json({ message: 'Address not found' })
    // }
    const { lat, lon } = data[0]
    req.body.coordinates = [lat, lon]

    const user = await User.create(req.body)
    res.status(200).json(user)
  } catch (e) {
    next(e)
  }
}

// async function register(req, res, next) {
//   // ? get coordinates of entered address
//   // ? via API
//   // ? add coordinates to body before creating user

//   // ! not need due to change of model
//   // const address = req.body.addressDetails
//   // console.log('address:', address)

//   try {
//     const { data } = await getCoordinates((req.body.postalCode).replace(' ', '+'), (req.body.city).replace(' ', '+'), (req.body.street).replace(' ', '+'), (req.body.streetNo).replace(' ', '+'), (req.body.region).replace(' ', '+'), (req.body.country).replace(' ', '+'))

//     // if (data.length === 0) {
//     //   res.status(401).json({ message: 'Address not found' })
//     // }

//     if (data.length === 0) {
//       console.log('Address is incorrect')
//       throw new NotValid('Address is incorrect')
//     }
  
//     console.log('geocodeArray:', data)
//     const latitude = data[0].lat
//     console.log('latitude:', latitude)
//     const longitude = data[0].lon
//     console.log('longitude:', longitude)
//     console.log(req.body)
//     req.body.coordinates[0] = latitude
//     req.body.coordinates[1] = longitude

//   } catch (e) {
//     next(e)
//     // res.status(401).json({ message: 'Error when creating coordinates' })
//   }

//   try {
//     const user = await User.create(req.body)
//     console.log(req.body)
//     res.status(201).json(user)
//   } catch (e) {
//     next(e)
//   }
// }

async function login(req, res, next) {
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