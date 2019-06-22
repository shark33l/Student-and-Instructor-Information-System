import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//Material UI Components
import { Grid, Paper, Typography } from '@material-ui/core';

class errorPage extends Component{

    render(){

        return(
            <Grid container style={{padding: 50}} alignItems="center">
                <Grid item xs={12} sm={8} lg={5} style={{margin: 'auto'}}>
                    <Paper style={{padding: 50, margin: 'auto'}}>
                        <Typography variant="h1">
                            404 :(
                        </Typography>
                        <Typography variant="h5" color="primary" style={{marginTop: 100}}>
                            Hey! Something happened...
                        </Typography>
                        <Typography style={{marginTop: 15}}>
                            The page you are trying to access seems to be missing. Please try again later. <br />
                            Sending a million apologies your way - Hogwarts School of Witchcraft & Wizardry
                        </Typography>
                        <hr style={{marginTop: 30, marginBottom: 10}}/>
                        <Typography style={{marginTop: 30}}>
                            Do you want to return home? <Link to='/'>Home</Link><br/>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

export default withRouter(errorPage);