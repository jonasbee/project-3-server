// ? Tell mongoose what a valid item should be
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, required: true },
})

// ? Export the model as an Item
export default mongoose.model('Item', itemSchema)