const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find().sort({createdAt: -1}) // sort by descending order (newest first)

    res.status(200).json(workouts)
}

// get single
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectID.isValid(id)) {
        return res.status(404).json({error: 'no workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'no workout'})
    }
}

// create new
/* 
- async: allows us to use await, which pauses the execution of the function until the promise resolves or rejects
- Without async/await, you would have to use .then() and .catch() to handle the promise returned by Workout.create
*/
const createWorkout = async (req, res) => {
    const {title, reps, weight } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!weight) {
        emptyFields.push('weight')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // try to create a new document asynchronously
    try {
        const workout = await Workout.create({ title, reps, weight })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    console.log(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid workout ID'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'no workout found'})
    }

    // if we do have a workout and delete it
    res.status(200).json(workout)
}

// update
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectID.isValid(id)) {
        return res.status(404).json({error: 'no workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body         // We need to send data along with the patch request to tell the DB what to change. This is stored in req.body
    })

    if (!workout) {
        return res.status(404).json({error: 'no workout'})
    }

    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}

