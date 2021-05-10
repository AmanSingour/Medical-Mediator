import { combineReducers } from 'redux'
import appActivityReducer from './appActivity'
import cartReducer from './cartReducer'
import { currentUser } from './userReducer'

export const reducers = combineReducers({
    cart : cartReducer, 
    currentUser,
    appActivity: appActivityReducer,
})

export default reducers