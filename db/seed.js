
import connectToDb from './connectToDb.js'
import mongoose from 'mongoose'
import Item from '../model/items.js'
import User from '../model/users.js'
import itemData from './data/items.js'
import userData from '../db/data/users.js'



async function seedDatabase() {
  try {
    await connectToDb()
    console.log('✅ Connected to mongo')

    await mongoose.connection.db.dropDatabase()
    console.log('removed all items')

    const user = await User.create(userData)
    console.log(`👏🏼 ${user.length}users created`)
  
    const item = await Item.create(itemData)
    console.log(`🥗 ${item.length} items created`)

    await mongoose.connection.close()
    console.log('Disconnected from mongo.All done ')
  } catch (e)   {
    console.log('Someting when wrong')
    console.log(e)
    await mongoose.connection.close()
  }
}

seedDatabase()