import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//Import Custom Components
import SnackBarComponent from '../feedbackComponents/SnackBarComponent'

//Material UI Components
import { Grid, Paper, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Button, Typography, Avatar, FormHelperText } from '@material-ui/core';

//Material UI Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

class ForgotPassword extends Component{

    constructor(props){
        super(props);
        this.state = {
            loginDetails : {
                email : ''
            },
            showPassword : false,
            emailAvailable : false,
            emailError : false,
            reqReceived : false,
            message : '',
            snackBarStateChange : false
        }
    }

    handleFormChange = e =>{
        const {name, value} = e.target;
        let loginDetails = {...this.state.loginDetails};
        loginDetails[name] = value;
        this.setState({loginDetails});
    }

    handleForgotPassword = e => {
        //e.preventDefault();

        //Reset validation
        this.setState({
            emailAvailable : false,
            emailError : false,
            reqReceived : false,
            message : ""
        })

        const { loginDetails } = this.state;

        const emailSendDetails = {
            email : loginDetails.email,
            reason : 'a password reset.'
        }
        const loginPostUrl = "http://localhost:5000/rest/api/users/passwordreset";

        console.log(loginDetails);

        fetch(loginPostUrl,  {
            method : 'POST',
            body : JSON.stringify(emailSendDetails),
            headers: {'Content-Type' : 'application/json'}
        }).then(response => {
            console.log(response)
            return response.json()
        }).then(json => {
            if(json.available){
                console.log("Email address available");
                this.setState({
                    emailAvailable : true,
                    reqReceived : true,
                    message : json.message,
                    snackBarStateChange : !this.state.snackBarStateChange
                }, console.log(this.state))
            } else {
                console.log("Email address unavailable")
                this.setState({
                    emailAvailable : false,
                    reqReceived : true,
                    message : json.message,
                    emailError : false,
                    snackBarStateChange : !this.state.snackBarStateChange
                }, console.log(this.state))
            }
            console.log(json)
        }).catch((err) => {
            console.log(err);
        })

    }

    componentWillMount() {
        console.log(this.props)
    }

    render(){

        const { email } = this.state.loginDetails;
        const { emailAvailable, emailError, reqReceived, message, snackBarStateChange } = this.state;

        return(
            <Grid container style={{padding: 50}} alignItems="center">
                {!reqReceived ?
                    <SnackBarComponent value={false}/>
                    : emailAvailable ?
                        <SnackBarComponent
                            value={true}
                            message={message}
                            type="success"
                            stateChange={snackBarStateChange}/>

                    : <SnackBarComponent
                            value={true}
                            message={message}
                            type="error"
                            stateChange={snackBarStateChange}/>
                }
                <Grid item xs={12} sm={8} lg={5} style={{margin: 'auto'}}>
                    <Paper style={{padding: 50, margin: 'auto'}}>
                        <Avatar src={require('../../images/Hogwarts-Logo.png')} style={{width:150, height: 150, marginRight: 'auto', marginLeft: 'auto', marginBottom: 15}}/>
                        <Typography variant="h6">
                            Forgot Password ?
                        </Typography>
                        <Typography style={{marginTop : 5}}>
                            No worries! <br />Type in your Email ID. We will send you a mail to reset your password.
                        </Typography>
                        <TextField
                            autoFocus
                            error={emailError}
                            name="email"
                            id="standard-email"
                            label="Email"
                            value={email}
                            margin="normal"
                            onChange={this.handleFormChange}
                            fullWidth
                        />
                        <Button variant="contained" color="primary" style={{padding: 10, marginTop: 30}} onClick={this.handleForgotPassword.bind(this)} fullWidth>
                            Reset Password
                        </Button>
                        <Typography style={{marginTop: 30}}>
                            Or you can <Link to='/login'>Login</Link> if you remember.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

export default withRouter(ForgotPassword);