import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom'
import { 
    Dashboard, 
    LandingPage, 
    LoginPage,
    NotFound,
    SignupPage
} from '../component'
import { userLogout } from '../store'

export const Routes = () =>{
    const currentUser = useSelector(state => state.currentUser)
    const authed = currentUser.loggedIn
    const dispatch = useDispatch()
    return(
        <Switch>
            <Route exact path="/" component={authed? Dashboard :LandingPage} />
            <Route path="/login" >
                {authed? <Redirect to='/' />: <LoginPage />}
            </Route>
            <Route path="/signup" >
                {authed? <Redirect to='/' />: <SignupPage />}
            </Route>
            <Route path="/logout" render={()=> dispatch(userLogout()) && <Redirect to="login"/>}/>
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes