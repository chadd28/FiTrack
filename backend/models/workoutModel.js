const mongoose = require('mongoose')

const Schema = mongoose.Schema

// define what a workout document should look like
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
}, { timestamps: true })

// creates a workout model 
module.exports = mongoose.model('Workout', workoutSchema);