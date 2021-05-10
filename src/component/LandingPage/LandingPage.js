import { 
    Button, 
    Container, 
    Grid, 
    makeStyles
} from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'
import image from '../../assets/Business_team_3.jpg'

const useStyles = makeStyles({
    root:{
        backgroundImage: `url(${image})`,
        backgroundSize: "70%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom right",
        width: "100%", 
        height: "80vh",
        overflow: "hidden"
    },
    img:{
        margin: "0 auto",
        maxWidth: "80%",
        justifyContent: "center",
        alignContent: "center",
    },
    content:{
    },
    copy:{
        textTransform: "uppercase",
    },
    subcopy:{
        maxWidth: "80%",
    }
})

//THIS IS THE LANDING PAGE COMPONENT 
//IF USER NOT LOGGED IN THEN THIS WILL BE THE
//FIRST PAGE USER SEE IN THIS WEB APP
export const LandingPage = (props) =>{

    const classess = useStyles()

    //HERE IS THE DATA OBJECT TO STORE DATA TO SHOW IN PAGE
    const data = {
        mainCopy : "Let's connect with us!\nWe connect you to the right place :)",
        //DESCRIPTION NEEDS TO BE CHANGED LATER...
        description : "Incididunt tempor commodo amet id nisi do magna ad magna voluptate esse consequat ea. Ut aliquip ad commodo nostrud sint amet adipisicing culpa Lorem fugiat labore est cupidatat. Duis ut anim labore fugiat excepteur culpa consequat eu est.",
        buttonText : "Let's Connect",
        image: image,
    }
    return(
        <Container className={classess.root}>
            <Grid className={classess.content} xs={12}>
                    {data.mainCopy.split("\n").map((i,key) => {
                        return <h1 className={classess.copy} key={key}>{i}</h1>;
                    })}
                    <p className={classess.subcopy}>{data.description}</p>
                    <Button color="primary" variant="contained" onClick={()=> props.history.push('/login')}>{data.buttonText}</Button>
            </Grid>
        </Container>
    )
}

export default withRouter(LandingPage)