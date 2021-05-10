export const cartReducer = (state = [], action) =>{
    switch (action.type) {
        case 'add_success':
            
            return state
        
        case 'remove_success':
            
            return state

        default:
            return state
    }
}

export default cartReducer