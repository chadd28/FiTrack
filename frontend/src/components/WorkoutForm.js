import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()  // prevent default action of refreshing the page when form is submitted

        const workout = {title, weight, reps}
        
        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),      // changes workout into a JSON string
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setWeight('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)

            // When we add a new workout to the database, we dispatch an action to update the global Context state.
            // This action will add the newly created workout to the list of workouts stored in the Context state.
            dispatch({type: 'CREATE_WORKOUT', payload: json}) // payload is just the single workout that will be added.

        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}    // conditional styling: if error exists, apply 'error' CSS classname
            />

            <label>Weight (lb):</label>
            <input
                type="number"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                className={emptyFields.includes('weight') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''} 
            />
           <button>Add Workout</button>  
           {error && <div className='error'>{error}</div>} 
        </form>
    )
}

export default WorkoutForm