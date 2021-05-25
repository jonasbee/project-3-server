// ? get all recipes
// ? for every recipe, 
// ? check if you can find
// ? item of ingredients.listOfRecipeItem
// ? in the list of inventoryItem

// ? if (! listOfInventoryItems.contains(ingredients.listOfRecipeItem[index]) ) {
// return
// }

import InventoryItem from '../models/inventoryItem.js'
import Recipe from '../models/recipe.js'

// import Item from '../models/item.js'

async function index(req, res, next) {
  try {
    const recipeList = await Recipe.find()

    res.status(200).json(recipeList)
  } catch (e) {
    next(e)
  }
}

async function checkForRecipe(req, res, next) {
  console.log('I reached the function')
  try {
    console.log('I reached try function')
    // ? get all inventoryItems
    const currentUserId = req.currentUser._id
    console.log(currentUserId)
    const inventoryItemList = await InventoryItem.find({ user: `${currentUserId}` }).populate('item')
    console.log(inventoryItemList)

    // ? get all recipes
    const recipeList = await Recipe.find()
    console.log(recipeList)

    // ? found recipe true or false
    let foundPotentialRecipe
    // ? filter through the list of recipes
    const listOfFoundRecipes = recipeList.filter(recipe => {
      // * for every recipe, loop through all recipe ingredients
      for (let index = 0; index < recipe.ingredients.length; index++) {
        // * check if current recipe ingredient is in inventoryItemList
        // * as soon as inventoryItem is equal to recipe ingredient
        // * it returns that item (so not undefined)
        console.log(index)
        console.log(inventoryItemList.find(inventoryItem => inventoryItem.item.name === recipe.ingredients[index].name))
        if (
          (inventoryItemList.find(inventoryItem => inventoryItem.item.name === recipe.ingredients[index].name)) === undefined
        ) {
          // gets executed if find() returns undefined
          foundPotentialRecipe = false
          break
        } else {
          // gets executed if find() returns item
          foundPotentialRecipe = true
        }
      }
      // * filter() only returns, if true
      console.log(foundPotentialRecipe)
      return foundPotentialRecipe

    })

    if (listOfFoundRecipes.length === 0) {
      return res.status(401).json({ message: 'No recipe found' })
    }

    res.status(200).json(listOfFoundRecipes)
  } catch (error) {
    next(error)
  }
}


async function show(req, res,next) {
  try   {
    const id = (req.params.recipeId)
    const recipe = await  Recipe.findById(id)
    
    if (!recipe){
      console.log('No recipe found')
    }

    res.status(200).json(recipe)
  } catch (e) {
    next(e)
  }
}


export default {
  index,
  show,
  checkForRecipe,
}


// ! not needed (alternative solution)
    // // ? always the current recipe looked at
    // let recipe
    // // ! recode the logic with array.filter()
    // for (let index = 0; index < recipeList.length; index++) {
    //   recipe = recipeList[index]
    //   for (let index = 0; index < recipe.ingredients.length; index++) {
    //     if (
    //       (inventoryItemList.find(inventoryItem => inventoryItem.item.name === recipe.ingredients[index].name)) === undefined
    //     ) {
    //       foundPotentialRecipe = false
    //       return
    //     } else {
    //       foundPotentialRecipe = recipe
    //     }
    //   }
    // }
    // ! -----