//USER LOGIN ACTION WITH REDUX REDUCER
export const userLogin = (user) =>{
    return{
        type: 'user/login',
        user: user
    }
}

export default userLogin