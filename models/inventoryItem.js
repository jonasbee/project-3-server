// ? Tell mongoose what a valid inventoryItem should be
import mongoose from 'mongoose'

const InventoryItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

// ? Export the model as an Item
export default mongoose.model('InventoryItem', InventoryItemSchema)


