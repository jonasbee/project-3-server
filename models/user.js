// ? Tell mongoose what a valid item should be
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import mongooseHidden from 'mongoose-hidden'

import bcrypt from 'bcrypt'

const addressSchema = new mongoose.Schema({
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  streetNo: { type: String, required: true },
  region: { type: String, required: true },
  country: { type: String, required: true },
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, hide: true },
  addressDetails: addressSchema,
})


userSchema.pre('save', function encryptPassword(next) {

  if (this.isModified('password')) {
  
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

userSchema.methods.validatePassword = function validatePassword(password) {
  
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, _id: true, addressDetails: true } }))
userSchema.plugin(uniqueValidator)


// ? Export the model as an Item
export default mongoose.model('User', userSchema)