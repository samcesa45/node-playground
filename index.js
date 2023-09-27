import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
const app = express()


const requestLogger = (request,response,next) => {
  console.log('Method:', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}

const allowedOrigins = ['http://localhost:5174']
const options = { origin: allowedOrigins, credentials: true }

app.use(cors(options));

//json-parser
app.use(express.json())
app.use(requestLogger)
morgan(':method :url :status :res[content-length] - :response-time ms ')


let notes = [
  {
    id:1,
    content:'HTML is easy',
    important:true 
  },
  {
    id:2,
    content:'Browser can execute only Javascript',
    important:false 
  },
  {
    id:3,
    content:'GET and POST are the most important methods of HTT protocol',
    important:true 
  }
]


const generatedId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  return maxId + 1
}
app.get('/', (request,response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request,response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id )
  const note = notes.find(note => note.id === id)
  
  if(note){
    response.json(note)
  }else {
    response.status(404).end()
  }
})

app.post('/api/notes', (request,response) => {
  const body = request.body

  if(!body.content) {
    return response.status(400).json({
      error:'content missing'
    })
  }

  const note = {
    content:body.content,
    important:body.important || false,
    id:generatedId()
  }
  notes = notes.concat(note)
  response.json(note)
})

app.delete('/api/notes/:id', (request,response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const unknownEndpoint = (request,response) => {
  response.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT =process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)