export const appActivityReducer = (state = {drawer: false, active: 0}, action) =>{
    switch (action.type) {
        case 'drawer/open':
            
            return {
                ...state,
                drawer: true,
                active: action.active,
            }
        
         case 'drawer/close':
            
            return {
                ...state,
                drawer: false,
            }

        default:
            return state
    }
}

export default appActivityReducer