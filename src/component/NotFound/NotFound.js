import { Button, Container } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'

export const NotFound = (props) =>{
    return(
        <Container style={{padding: "auto", alignContent:"center", justifyContent: "center", textAlign:"center"}}>
        <img 
            src="https://image.freepik.com/free-vector/404-error-background-with-balloons-flat-style_23-2147761279.jpg" 
            alt="Page Not Found"
            style={{height: "100%",
                display: "block",
                margin: "auto",
            }}
        />
        <Button 
            style={{margin: "5px auto"}} 
            variant="contained" 
            color="primary"
            onClick={()=> props.history.push('/')}
        >Go Back To Home</Button>
        </Container>    
    )
}

export default withRouter(NotFound)