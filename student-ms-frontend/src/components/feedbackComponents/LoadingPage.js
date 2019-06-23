import React, { Component } from 'react';

//Material UI Components
import { Grid, Typography, Avatar } from '@material-ui/core';


class LoadingPage extends Component{


    render(){

        return(
            <Grid container style={{padding: 50, background: "#866427", height: 1000}} alignItems="center">
                <Grid item xs={12} sm={8} lg={5} style={{margin: 'auto'}}>
                        <Avatar src={require('../../images/snitchease.gif')} style={{width:300, height: 300, marginRight: 'auto', marginLeft: 'auto', marginBottom: 15}}/>
                        <Typography variant="h6" style={{color:'white'}}>
                            Teleporting to the world of Magic - 9 3/4
                        </Typography>
                </Grid>
            </Grid>
        )
    }

}

export default LoadingPage;