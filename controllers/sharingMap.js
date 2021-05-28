import InventoryItem from '../models/inventoryItem.js'

async function index(req, res, next) {
  try {
    const listOfAllSharedInventoryItemsOfAllUsers = await InventoryItem.find({ isShared: true })
      .populate('user')
      .populate('item')
    res.status(200).json(listOfAllSharedInventoryItemsOfAllUsers)
  } catch (error) {
    next(error)
  }
}

export default {
  index,
}