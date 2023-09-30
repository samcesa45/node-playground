
import express, { urlencoded }  from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { Note } from './config/database/connection.js'
import { errorHandler } from './shared/error/error.js'
const app = express()



const requestLogger = (request,response,next) => {
  console.log('Method:', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(requestLogger)

// let notes = [
//   {
//     id:1,
//     content:'HTML is easy',
//     important:true 
//   },
//   {
//     id:2,
//     content:'Browser can execute only Javascript',
//     important:false 
//   },
//   {
//     id:3,
//     content:'GET and POST are the most important methods of HTT protocol',
//     important:true 
//   }
// ]


const generatedId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  return maxId + 1
}
// app.get('/', (request,response) => {
//   response.send('<h1>Hello World!</h1>')
// })

app.get('/api/notes', (request,response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response,next) => {
  const id = request.params.id 
  
  Note.findById(id)
  .then((note) => {
    if(note) {
      response.json(note)
    }else {
      response.status(404).json({error:'note not found'})
    }
  }).catch((error) => next(error))
  
  
})

app.post('/api/notes', (request,response) => {
  const body = request.body

  if(!body.content) {
    return response.status(400).json({
      error:'content missing'
    })
  }

 const note = new Note({
  content:body.content,
  important:body.important || false,
 })

  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch((error) => {
    response.status(500).json({error:"INTERNAL SERVER ERROR"})
  })
})

app.put('/api/notes/:id', (request,response) => {

  const id = request.params.id
  const body = request.body

  const note = {
    content:body.content,
    important:body.important,
  }
  Note.findByIdAndUpdate(id,note,{new:true})
  .then(updatedNote => {
    response.json(updatedNote)
  })
  .catch(error => next(error))
})

app.delete('/api/notes/:id', (request,response) => {
  const id = request.params.id
 Note.findByIdAndRemove(id)
 .then(result => {
  response.status(204).end()
 })
 .catch(error => next(error))
  
})


const unknownEndpoint = (request,response) => {
  response.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT =process.env.PORT || 3001
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})