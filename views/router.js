
import express from 'express'
import itemController from '../controllers/item.js'
import userController from '../controllers/user.js'


const router = express.Router()

router.route('/item')
  .get(itemController.index)

router.route('/item/:id')
  .get(itemController.show)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

export default router

