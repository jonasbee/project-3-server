
import express from 'express'
import itemController from '../controllers/item.js'


const router = express.Router()

router.route('/item')
  .get(itemController.index)

router.route('/item/:itemId')
  .get(itemController.show)



export default router

