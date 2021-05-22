// import Item from ........ models/item.js ?

import { NotFound } from '../middleware/errorHandler'

async function index(req, res, next) {
  try {
    const itemList = await Item.find()

    res.status(200).json(itemList)
  } catch (e) {
    next(e)
  }
}


async function show(req, res, next) {
  try {
    const id = req.params.id
    const item = await Item.findById(id)

    if (!item) {
      throw new NotFound('No food found.')
    }

    res.status(200).json(item)
  } catch (e) {
    next(e)
  }
}

export {
  index,show
}