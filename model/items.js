// ? Tell mongoose what a valid item should be
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, required: true },
  quantity: { type: Number, required: false },
  expiryDate: { type: Date, required: false },
  // ? Referenced relationship. Each item is linked to a particular user.
  // ? The type is a unique Object in MongoDB
  // ? Ref - Use the User schema
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

// ? Export the model as an Item
export default mongoose.model('Item', itemSchema)