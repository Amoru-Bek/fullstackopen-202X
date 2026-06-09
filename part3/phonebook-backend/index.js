require('dotenv').config()
const Person = require('./modules/person')
const express = require('express')
const cors = require('cors')
const path = require('path')


const app = express()

app.use(cors())

app.use(express.json())




app.use(express.static(path.join(__dirname,'dist')))

app.get('/api/persons', (req, res, next) => {

  Person.find({})
    .then(results => {
      console.log(results)
      res.json(results)
    }).catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      if (person){
        res.json(person)
      }
      else{
        res.status(404).send('Person not found')
      }

    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()

    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body

  if (!number) {
    return res.status(400).json({
      error: 'missing phone number'
    })
  }
  const updatedPerson = { name,number }

  Person.findByIdAndUpdate(id, updatedPerson, { new : true, runValidators: true })
    .then(result => {
      if (result){
        return res.json(result)
      }
      else{
        res.status(404).end()
      }

    }).catch(err => next(err))

}
)

app.post('/api/persons', async (req, res, next) => {
  const body = req.body
  console.log(body)
  if (!body.name || body.name.trim() === ''){
    return res.status(400).json({
      error : 'missing name attribute'
    })
  }
  if (!body.number || body.number.trim() === '' ){
    return res.status(400).json({
      error : 'missing number attribute'
    })
  }
  try {
    const existingNumber = await Person.findOne({ number: body.number })
    if (existingNumber){
      return res.status(400).json({
        error: 'Number must be unique'
      })
    }

  }catch(err) {
    next(err)
  }


  const person = new Person({
    name: body.name.toString(),
    number: body.number.toString(),
  })
  person.save().then(p => {
    console.log(p)
    res.json(p)
  }).catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  return res.status(500).json({ error: 'something went wrong' })
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log('listening on port 3001')
  })
}
module.exports = app
