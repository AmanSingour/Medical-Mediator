import { 
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Link,
    makeStyles, 
    MenuItem, 
    OutlinedInput, 
    Select, 
    TextField 
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { userLogin } from '../../store';
import { DB } from '../../utils/fake-db';
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(3),
      textAlign: "center"
    },
  }));

export const SignupPage = (props) =>{

    //USE DISPATCH METHOD TO SAVE DATA IN STORE
    const dispatch = useDispatch()

    //USER NAME STATE
    const [nameState, setNameState] = React.useState({
        value: "",
        isValid: true,
        err: "Invalid Name!",
    })

    //EMAIL STATES...
    const [emailState, setEmailState] = React.useState({
        value: "",
        isValid: true,
        err: "Invalid Email!",
    })

    //Roll STATES...
    const [rollState, setRollState] = React.useState({
        value: "",
        isValid: true,
        err: "",
    })

    //PASSWORD STATES...
    const [passwordState, setPasswordState] = React.useState({
        value: "",
        isValid: true,
        err: "Invalid Password!",
    })


    //ERROR STATE...
    const [err, setErr] = React.useState({
        isErr: false,
        errMsg: '',
    })

    const handleSubmit = (e) =>{
        const index = DB.users.findIndex(user => user.email===emailState.value)
        if(index>0){
            setErr({isErr: true, errMsg: "User already exist!"})
        }else{
            const id_auto = DB.users[0]
            DB.users[0] = id_auto+1
            const user = {
                id : id_auto,
                username : nameState.value,
                email: emailState.value,
                roll: rollState.value,
                password: passwordState.password,
            }
            dispatch(userLogin(user))
        }
        e.preventDefault()
    }

    const handleChange = (event) =>{
        const target = event.target
        if(target.name==="full name"){
            const regex = /^([a-zA-Z ]){2,30}$/
            target.value.match(regex) ? setNameState({...nameState, isValid:true, value:target.value}) :setNameState({...nameState, isValid:false})
        }
        if(target.name==="email"){
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            target.value.match(regex) ? setEmailState({...emailState, isValid:true, value:target.value}) :setEmailState({...emailState, isValid:false})
        }
    }

    const classes = useStyles();
    return(
        <Container className={classes.container} maxWidth="xs">
            <form onSubmit={(e)=> handleSubmit(e)}>
                <Grid container justify="center" alignItems="center" spacing={3}>
                { err.isErr &&
                    <Grid item xs={12}>
                        <Alert severity="error" onClose={()=>setErr(false, "")}>{err.errMsg}</Alert>
                    </Grid>
                }
                    <Grid item xs={12}>
                        <h3>SignUp</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CustomInput
                                    error={!nameState.isValid}
                                    label="Full Name"
                                    handleChange={(e)=> handleChange(e)}
                                    errText={nameState.err}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomInput
                                    error={!emailState.isValid}
                                    label="Email"
                                    handleChange={(e)=> handleChange(e)}
                                    errText={emailState.err}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" style={{textAlign: "left"}}>
                                <InputLabel id="demo-simple-select-outlined-label">Roll</InputLabel>
                                <Select
                                native
                                labelId="roll"
                                id="roll"
                                defaultValue="Retailer"
                                value={rollState.value}
                                onChange={(e) => setRollState({...rollState, value: e.target.value})}
                                label="Age"
                                >
                                <option value={"Retailer"}>Retailer</option>
                                <option value={"Wholesaler"}>Wholesaler</option>
                                <option value={"Distributor"}>Distributor</option>
                                </Select>
                            </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <CustomInput
                                    error={false}
                                    label="Password"
                                    password={true}
                                    handleChange={(e)=> handleChange(e)}
                                    errText={""}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            onClick={(e) => handleSubmit(e)} 
                            color="primary" fullWidth type="submit" variant="contained">
                        SignUp
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Link
                            onClick={() => props.history.push('/login')}
                            component="button"
                            variant="text"
                        >Already have an account? Login
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

const CustomInput = (props) =>{

    const [showPassword, setShowPassword] = React.useState(false)

    const handleChange = event =>{
        props.handleChange(event)
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return(
        <TextField
            error={props.error}
            fullWidth
            required
            type={props.password? "password" : "text"}
            size="small"
            variant="outlined"
            label={props.label}
            name={props.label.toLowerCase()}
            onChange={(e)=> handleChange(e)}
            onBlur={(e)=> handleChange(e)}
            helperText={props.error && props.errText}
            endAdornment={ props.password &&
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
        />
    )
} 

export default withRouter(SignupPage)