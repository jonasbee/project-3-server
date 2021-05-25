
import express from 'express'
import itemController from '../controllers/item.js'
import inventoryItemController from '../controllers/inventoryItem.js'
import userController from '../controllers/user.js'

import secureRoute from '../middleware/secureRoute.js'

import recipeController from '../controllers/recipe.js'



const router = express.Router()

// ! stock items
router.route('/items')
  .get(itemController.index)

router.route('/items/:itemId')
  .get(itemController.show)

// ! recipes
router.route('/recipes')
  .get(recipeController.index)

router.route('/recipe/:recipeId')
  .get(recipeController.show)


// ! inventory items
router.route('/:userId/items/:itemId')
  .post(secureRoute,inventoryItemController.create)
router.route('/:userId/items')
  .get(secureRoute,inventoryItemController.index)
router.route('/:userId/items/:inventoryItemId')
  .get(secureRoute,inventoryItemController.show)
  .delete(secureRoute, inventoryItemController.remove)

// ! user routes
router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

export default router

// .post(secureRoute, itemController.create)