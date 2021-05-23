
import express from 'express'
import itemController from '../controllers/item.js'
import userController from '../controllers/user.js'

import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

router.route('/item')
  .get(itemController.index)
  .post(secureRoute, itemController.create)

router.route('/item/:id')
  .get(itemController.show)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

export default router

