
import connectToDb from './connectToDb.js'
import mongoose from 'mongoose'
import Item from '../model/item.js'
import User from '../model/user.js'
import itemData from './data/items.js'
import userData from '../db/data/users.js'



async function seedDatabase() {
  try {
    await connectToDb()
    console.log('✅ Connected to mongo')

    await mongoose.connection.db.dropDatabase()
    console.log('removed all items')

    const users = await User.create(userData)
    console.log(`👏🏼 ${users.length}users created`)
    console.log(users)

    const itemsDataWithUsers = itemData.map(item => {
      return { ...item, user: users[0]._id }
    })

    console.log(itemsDataWithUsers)
  
    const item = await Item.create(itemsDataWithUsers)
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