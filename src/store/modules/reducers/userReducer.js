import { MemoryRouter } from "react-router"

export const currentUser = (state = {user:{}, loggedIn: false}, action) =>{
    switch (action.type) {
        case 'user/login':
            return {
                ...state,
                user: action.user,
                loggedIn: true
            }
        case 'user/logout':
            return {
                ...state,
                user: action.user,
                loggedIn: false
            }

        default:
            return state
    }
}

export default currentUser