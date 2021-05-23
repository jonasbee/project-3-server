
import express from 'express'
import itemController from '../controllers/item.js'
import userController from '../controllers/user.js'


const router = express.Router()

router.route('/item')
  .get(itemController.index)
  .post(itemController.create)

router.route('/item/:id')
  .get(itemController.show)

<<<<<<< HEAD
router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

=======
>>>>>>> development
export default router

