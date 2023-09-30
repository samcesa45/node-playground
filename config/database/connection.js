import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

mongoose.set('strictQuery',false)

// const url = process.env.MONGO_URI

// console.log('connecting to', url)

mongoose.connect(process.env.MONGO_URI)
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MONGODB', error.message)
})


const noteSchema = new mongoose.Schema({
  content:String,
  important:Boolean
})

noteSchema.set('toJSON', {
  transform:(document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Note = mongoose.model('Note', noteSchema)