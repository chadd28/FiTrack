import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

// Define the reducer function to manage the state changes.
export const workoutsReducer = (state, action) => {
    // Switch statement to handle different types of actions.
    switch (action.type) {
        case 'SET_WORKOUTS':
            // Set the new workouts array as the state.
            return {
                workouts: action.payload    // Payloads: data or values that are passed along with an action
            }
        case 'CREATE_WORKOUT':
            // Add the new workout (action.payload) to the front of the workouts array.
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                // check if id of each workout in list is the id of the workout we want to delete
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            // Default case returns the current state if the action type does not match.
            return state
    }
}

// The WorkoutsContextProvider component that wraps the part of the app needing access to the workouts state.
export const WorkoutsContextProvider = ({ children }) => {
    // useReducer hook manages state updates using the workoutsReducer.
    // It takes two arguments: the reducer function and the initial state.
    const [state, dispatch] = useReducer(workoutsReducer, { 
        // Initial state: workouts array starts as null (no workouts yet).
        workouts: null 
    })


    // Pass the state and dispatch function to the context value.
    // This makes the workouts data and the dispatch function available to any child components.
    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}> 
            { children }
        </WorkoutsContext.Provider>
    )
}

