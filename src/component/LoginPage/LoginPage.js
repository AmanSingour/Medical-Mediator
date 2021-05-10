import { 
    Button,
    Container,
    Grid,
    Link,
    makeStyles, 
    TextField 
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store';
import { withRouter } from 'react-router'
import { DB } from '../../utils/fake-db';

const useStyles = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(3),
      textAlign: "center"
    },
  }));

export const LoginPage = (props) =>{

    //USE DISPATCH METHOD TO SAVE DATA IN STORE
    const dispatch = useDispatch()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [err, setErr] = React.useState({
        isErr: false,
        errMsg: '',
    })

    const handleSubmit = (e) =>{
        const index = DB.users.findIndex(user => user.email===username)
        console.log(index)
        if(index<=0){
            setErr({isErr: true, errMsg: "User not found!"})
        }else if(DB.users[index].password!==password){
            setErr({isErr: true, errMsg: "Wrong Password!"})
        }else{
            const currentUser = {
                id: DB.users[index].id,
                username: DB.users[index].username,
                roll: DB.users[index].roll,
            }
            dispatch(userLogin(currentUser))
        }    
        e.preventDefault()

    }

    const classes = useStyles();
    
    return(
        <Container className={classes.container} maxWidth="xs">
            <form >
                <Grid container justify="center" alignItems="center" spacing={3}>
                { err.isErr &&
                    <Grid item xs={12}>
                        <MuiAlert severity="error" onClose={()=>setErr(false, "")}>{err.errMsg}</MuiAlert>
                    </Grid>
                }
                    <Grid item xs={12}>
                        <h3 >Login</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                size="small"
                                variant="outlined"
                                onChange={(e)=> setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                size="small"
                                type="password"
                                variant="outlined"
                                onChange={(e)=> setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" onClick={(e) => handleSubmit(e)} color="primary" fullWidth variant="contained">
                        Login
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Link
                            onClick={() => props.history.push("/signup")}
                            component="button"
                            variant="text"
                        >Don't have an account? SignUp
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default withRouter(LoginPage)