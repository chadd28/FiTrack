require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// starts up express app
const app = express()

// use middleware
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000" }))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)  // uses all different routes attached to workoutRoutes when a request is fired to route: /api/workouts

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to DB and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {console.log(error)})


