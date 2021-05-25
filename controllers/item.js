import Item from '../models/item.js'
import { NotFound } from '../lib/errors.js'


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
    const id = req.params.itemId
    const item = await Item.findById(id)

    if (!item) {
      throw new NotFound('No item found.')
      
    }

    res.status(200).json(item)
  } catch (e) {
    next(e)
  }
}


async function search(req, res, next) {
  try {
    // ? get all query parameters
    const searchParams = req.query
    console.log(searchParams)
    // ? only match exact values
    // TODO add more logic to match substrings
    const itemList = await Item.find(searchParams)
    res.status(200).json(itemList)
  } catch (error) {
    next(error)
  }
}


export default {
  index,
  show,
  search,
}