
import connectToDb from '../connectToDb.js'
import mongoose from 'mongoose'
import itemData from './items.js'


async function seedDatabase() {
  try {
    await connectToDb()
    console.log('✅ Connected to mongo')

    await mongoose.connection.db.dropDatabase()
    console.log('removed all items')
  
    const item = await item.create(itemData)
    console.log(`🤖${item.length} items created`)

    await mongoose.connection.close()
    console.log('Disconnected from mongo.All done ')
  } catch (e)   {
    console.log('Someting when wrong')
    console.log(e)
    await mongoose.connection.close()
  }
}

seedDatabase()