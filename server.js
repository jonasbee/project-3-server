import app from './app.js'
import  connectToDb from './db/data/connectToDb.js'


async function startApp (){
  try {
    await connectToDb()
    console.log('🔌 Database has connected ')

    app.listen(4000,()=> ('Express is now running'))
  } catch (e){
    console.log('Something went wrong starting app...')
    console.log.apply(e)
  }
}
startApp()