// ? Tell mongoose what a valid item should be
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, hide: true },
})

// ? Export the model as an Item
export default mongoose.model('User', userSchema)