// ? Tell mongoose what a valid item should be
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import mongooseHidden from 'mongoose-hidden'

import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, hide: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  streetNo: { type: String, required: true },
  country: { type: String, required: true },
  // ? array order: lat, long
  coordinates: {
    type: [String], 
    required: true,
    validate: [
      { validator: (types) => (types.length === 2) }
    ],
  },
  preference: { 
    type: String, 
    required: false, 
    enum: {
      values: ['vegetarian', 'vegan', 'pescetarian'],
      message: '{VALUE} is not supported',
    },
  },
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

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })
userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
      this.invalidate('passwordConfirmation', 'should match password')
    }
    next()
  })

userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))
userSchema.plugin(uniqueValidator)


// ? Export the model as an Item
export default mongoose.model('User', userSchema)