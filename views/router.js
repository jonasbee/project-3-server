
import express from 'express'
import itemController from '../controllers/item.js'
import inventoryItemController from '../controllers/inventoryItem.js'
import recipeController from '../controllers/recipe.js'
import sharingMapController from '../controllers/sharingMap.js'
import userController from '../controllers/user.js'

import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

// ! stock items
router.route('/items')
  .get(itemController.index)
router.route('/items/search')
  .get(itemController.search)
router.route('/items/:itemId')
  .get(itemController.show)

// ! recipe routes
router.route('/:userId/recipes')
  .get(secureRoute, recipeController.checkForRecipe)
router.route('/recipes')
  .get(recipeController.index)
router.route('/recipes/:recipeId')
  .get(recipeController.show)

// ! inventory items
router.route('/:userId/items/:itemId')
  .post(secureRoute,inventoryItemController.create)
router.route('/:userId/items')
  .get(secureRoute,inventoryItemController.index)
router.route('/:userId/items/:inventoryItemId')
  .get(secureRoute,inventoryItemController.show)
  .delete(secureRoute, inventoryItemController.remove)
  .put(secureRoute, inventoryItemController.update)

// ! sharing map
router.route('/inventoryitemsmap')
  .get(secureRoute, sharingMapController.index)

// ! user routes
router.route('/register')
  .post(userController.register)
router.route('/login')
  .post(userController.login)
router.route('/:userId/update')
  .put(secureRoute, userController.update)

export default router