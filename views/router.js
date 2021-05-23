
import express from 'express'
import itemController from '../controllers/item.js'


const router = express.Router()

router.route('/item')
  .get(itemController.index)
  .post(itemController.create)

router.route('/item/:id')
  .get(itemController.show)

export default router

