import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//Import Custom Components
import SnackBarComponent from '../feedbackComponents/SnackBarComponent';
import DetailedExpansionPanel from '../feedbackComponents/expansionComponent';

//Material UI Components
import { Grid, Paper, Typography} from '@material-ui/core';

//Material UI Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

class adminDashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            userDetails : {
                firstName : '',
                lastName : ''
            }
        }
    }

    componentDidMount() {

        if(this.props.userDetails){
            this.setState({
                userDetails : this.props.userDetails
            })
        }

    }

    render(){


        return(
            <Grid container style={{padding: 50}} alignItems="center">
                <Grid item xs={12} sm={8} lg={6} style={{margin: 'auto'}}>
                        <DetailedExpansionPanel component='addUser' name={this.state.userDetails.firstName} value={true} heading='Add new User' subHeading='Email will be sent on creation'/>
                        <DetailedExpansionPanel component='addCourse' name={this.state.userDetails.firstName} value={true} heading='Add new Course' subHeading='Lecturers will be notified on creation'/>

                </Grid>
            </Grid>
        )
    }

}

export default withRouter(adminDashboard);