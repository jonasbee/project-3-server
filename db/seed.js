import connectToDb from './connectToDb.js'
import mongoose from 'mongoose'

import Item from '../models/item.js'
import itemData from './data/items.js'

import User from '../models/user.js'
import usersData from '../db/data/users.js'

async function seedDatabase() {
  try {
    await connectToDb()
    console.log('✅ Connected to mongo')

    await mongoose.connection.db.dropDatabase()
    console.log('removed all items')

    const users = await User.create(usersData)
    console.log(`👏🏼 ${users.length}users created`)
    console.log(users)

    // ? Assign a user to each item
    const itemDataWithUsers = itemData.map(item => {
      return { ...item, user: users[1]._id }
    })

    console.log(itemDataWithUsers)

    // ? Now I can seed my database using mongoose....
    const item = await Item.create(itemDataWithUsers)
    console.log(`🤖 ${item.length} item created!`)

    await mongoose.connection.close()
    console.log('Disconnected from mongo. All done')
  } catch (e)   {
    console.log('Someting when wrong')
    console.log(e)
    await mongoose.connection.close()
  }
}

seedDatabase()