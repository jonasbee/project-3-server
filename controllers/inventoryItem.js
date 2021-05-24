import InventoryItem from '../models/inventoryItem.js'
// import { NotFound } from '../middleware/errorHandler.js'
import Item from '../models/item.js'


async function index(req, res, next) {
  try {
    // ! we only want the logged in users inventoryItems, not all
    // ! set filter within find() to users ID
    const currentUserId = req.currentUser._id
    // ? Add populate to populate item details on inventoryItem
    const inventoryItemList = await InventoryItem.find({ user: `${currentUserId}` }).populate('item')

    res.status(200).json(inventoryItemList)
  } catch (e) {
    next(e)
  }
}


async function show(req, res, next) {
  try {
    const id = req.params.inventoryItemId
    const inventoryItem = await InventoryItem.findById(id).populate('item')

    if (!inventoryItem) {
      console.log('Error, no item found') 
    }

    res.status(200).json(inventoryItem)
  } catch (e) {
    next(e)
  }
}

async function create(req, res, next) {
  // ? attach new user to item
  req.body.user = req.currentUser
  // ? attach item to inventoryItem
  const item = await Item.findById(req.params.itemId)
  req.body.item = item
  try {
    const newInventoryItem = await InventoryItem.create(req.body)
    res.status(201).json(newInventoryItem)
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    const currentUserId = req.currentUser._id
    // ? get item to be potentially deleted
    const inventoryItem = await InventoryItem.findById(req.params.inventoryItemId)
    
    if (!inventoryItem) {
      console.log('no plant found')
    }

    if (!currentUserId.euquals(inventoryItem.user)) {
      return res.status(401).json({ message: 'Unauthorized, you must be author of plant to delete it' })
    }

    await inventoryItem.deleteOne()

    res.sendStatus(204)
    
  } catch (error) {
    next(error)
  }
}

export default {
  index,
  show,
  create,
  remove,
}