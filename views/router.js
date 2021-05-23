
import express from 'express'
import itemController from '../controllers/item.js'


const router = express.Router()

router.route('/item')
  .get(itemController.index)

router.route('/item/:id')
  .get(itemController.show)



export default router

