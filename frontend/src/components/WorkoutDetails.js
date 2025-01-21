import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useState } from 'react';

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const [isRemoving, setIsRemoving] = useState(false);

    const handleClick = async () => {
        setIsRemoving(true); // Trigger the removal animation
        
        setTimeout(async () => {
            const response = await fetch("http://localhost:4000/api/workouts/" + workout._id, {
            method: 'DELETE'
            })
            const json = await response.json()

            if (response.ok) {  
                dispatch({type: 'DELETE_WORKOUT', payload: json})
            }
        }, 600) // animation duration
    }

    return (
        <div className={`workout-details ${isRemoving ? 'removing' : ''}`}>     {/* if isRemoving = true, also add another class: removing */}
            <h4>{workout.title}</h4>
            <p><strong>Weight (lb): </strong>{workout.weight}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span onClick={handleClick}>
                <img src="/trashcan.svg" alt="delete button icon" />
            </span>
        </div>
    )
}

export default WorkoutDetails 