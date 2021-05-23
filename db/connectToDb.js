import mongoose from 'mongoose'
import { dbURL } from '../config/environment'


export default function connectToDb(){
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
  return mongoose.connect(dbURL,options)
}