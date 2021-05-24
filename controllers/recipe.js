// ? get all recipes
// ? for every recipe, 
// ? check if you can find
// ? item of ingredients.listOfRecipeItem
// ? in the list of inventoryItem

// ? if (! listOfInventoryItems.contains(ingredients.listOfRecipeItem[index]) ) {
// return
// }

import InventoryItem from '../models/inventoryItem'
import Recipe from '../models/recipe'

async function checkForRecipe(req, res, next) {
  try {
    // ? get all inventoryItems
    const currentUserId = req.currentUser._id
    const inventoryItemList = await InventoryItem.find({ user: `${currentUserId}` }).populate('item')

    // ? get all recipes
    const recipeList = await Recipe.find()
    let foundRecipe
    let recipe

    for (let index = 0; index < recipeList.length; index++) {
      recipe = recipeList[index]
      for (let index = 0; index < recipe.ingredients.listOfRecipeItems.length; index++) {
        if (
          inventoryItemList.find(inventoryItem => inventoryItem.name === recipe.ingredients.listOfRecipeItems[index].name) === undefined
        ) {
          foundRecipe = false
          return
        } else {
          foundRecipe = recipe
        }
      }
    }

    if (foundRecipe) {
      return res.status(401).json({ message: 'No recipe found' })
    }

    res.status(200).json(foundRecipe)
  } catch (error) {
    next(error)
  }
}

export default {
  checkForRecipe,
}