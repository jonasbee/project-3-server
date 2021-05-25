// ? Tell mongoose what a valid item should be
import mongoose from 'mongoose'

// const cookingTime = new mongoose.Schema({
//   preparationTime: { type: String, required: true },
//   cookingTime: { type: String, required: true },
//   totalTime: { type: String, required: true },
// })

const recipeItem = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: false },
  metric: { type: String, required: false },
})

// const ingredients = new mongoose.Schema({
//   listOfRecipeItems: [recipeItem],
// })

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timeRequired: { type: String, required: true },
  // timeRequired: cookingTime,
  serves: { type: String, required: true },
  instructionSteps: { type: [String], required: true },
  difficulty: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: [recipeItem],
  preference: { type: String, required: false },
})

// ? Export the model as an Item
export default mongoose.model('Recipe', recipeSchema)