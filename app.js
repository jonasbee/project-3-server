import express from 'express'
import router from './views/router.js'

// import logger from './middleware/logger.js'
import errorHandler from './middleware/errorHandler.js'


const app = express()

app.use(express.json())
// ? Using my own logging middleware.
// app.use(logger)

app.use('/api', router)

app.use('/images', express.static('/db/data'))

app.use(errorHandler)


export default app