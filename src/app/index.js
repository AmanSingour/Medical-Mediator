import { 
    Container, makeStyles,
} from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Router } from 'react-router'
import { Navbar } from '../component'
import { history, Routes } from '../service'
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    content: {
      marginTop: theme.spacing(10),
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 1,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
  }));

const App = () =>{

    const classes = useStyles()

    const open = useSelector(state => state.appActivity.drawer)

    const currentUser = useSelector(state => state.currentUser)
    const authed = currentUser.loggedIn
    const username = currentUser.user.username
    return(
        <div>
            <Router history={history}>
                {authed && <Navbar username={username} />}
                <div className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>
                    <Routes />
                </div>
            </Router>
        </div>
    )
}

export default App