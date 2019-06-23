import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//Import Custom Components
import SnackBarComponent from '../feedbackComponents/SnackBarComponent'

//Material UI Components
import {
    Grid,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    Button,
    Typography, Avatar, FormHelperText
} from '@material-ui/core';

//Material UI Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            resetDetails : {
                name: '',
                email : '',
                password: '',
                confirmPassword: ''
            },
            showPassword : false,
            showConfirmPassword : false,

            //Reset Results
            resetLinkError : false,

            //Validation States
            registerUserError : false,
            registerPasswordError : false,
            registerConfirmPasswordError : false,
            notValidated : false,
            errorMessage : '',
            snackBarStateChange : false
        }
    }

    //Handle Form Change
    handleFormChange = e =>{
        const {name, value} = e.target;
        let resetDetails = {...this.state.resetDetails};
        resetDetails[name] = value;
        this.setState({resetDetails});

    }

    //Handle Validation
    handleValidation(){

        let {password, confirmPassword} = this.state.resetDetails;
        let
            registerPasswordError,
            registerConfirmPasswordError

                = false;

        //reset Validate
        this.setState({
            notValidated : false
        })
        let notValidated = false;
        let errorMessage = 'Error, Please fill all fields.'

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if(!passwordRegex.test(password)){
            registerPasswordError= true;
            notValidated= true;
            if(errorMessage === ''){
                errorMessage = 'Password should contain minimum eight characters, at least one letter and one number'
            } else {
                errorMessage = errorMessage + ' Password should contain minimum eight characters, at least one letter and one number'
            }
        }
        if(password !== confirmPassword || confirmPassword === ''){
            registerConfirmPasswordError= true;
            notValidated= true;
        }

        this.setState({
            registerPasswordError : registerPasswordError,
            registerConfirmPasswordError : registerConfirmPasswordError,
            notValidated : notValidated,
            errorMessage : errorMessage,
            snackBarStateChange : !this.state.snackBarStateChange
        }, console.log(this.state));
        return notValidated;

    }

    //Handle Register Button
    handleRegister = e => {
        e.preventDefault();

        const updatePostUrl = "http://localhost:5000/rest/api/users/updatepassword";
        const updateDetails = this.state.resetDetails;

        //Student User Level is 3
        const updateData = {
            email : updateDetails.email,
            userLevel : updateDetails.userLevel,
            password : updateDetails.password
        }

        console.log(updateData);

        if(!this.handleValidation()){

            //Post Details
            fetch(updatePostUrl, {
                method : 'POST',
                body : JSON.stringify(updateData),
                headers: {'Content-Type' : 'application/json'}
            }).then(response => {
                return response.json()
            }).then(json => {
                console.log(json);
                if(!json.completed){
                    this.setState({
                        registerUserError: true,
                        notValidated : true,
                        errorMessage : json.message,
                        snackBarStateChange : !this.state.snackBarStateChange
                    })
                }
                if(json.completed){
                    console.log("User Updated");
                    this.props.history.push('/login')
                }
                console.log(json)
            })

        }

    }

    //Handle Password Visibility
    handleClickShowPassword = e => {
        this.setState({
            showPassword : !this.state.showPassword
        })
    }

    handleClickShowConfirmPassword = e => {
        this.setState({
            showConfirmPassword : !this.state.showConfirmPassword
        })
    }

    componentDidMount() {

        const resetPostUrl = 'http://localhost:5000/rest/api/users/confirmreset';
        const resetDetails = {
            resetPasswordToken : this.props.match.params.token
        }

        console.log(resetDetails);

        //Post Details
        fetch(resetPostUrl, {
            method : 'POST',
            body : JSON.stringify(resetDetails),
            headers: {'Content-Type' : 'application/json'}
        }).then(response => {
            return response.json()
        }).then(json => {
            if(json.email){
                console.log(json)
                this.setState({
                    resetDetails : json
                })
            } else {
                this.setState({
                    resetLinkError : true,
                    errorMessage : json.message
                })
            }
            console.log(json)
        })
    }

    render(){

        const { name, password, confirmPassword } = this.state.resetDetails;
        const { showPassword, showConfirmPassword, notValidated, errorMessage, snackBarStateChange } = this.state;
        const {registerPasswordError, registerConfirmPasswordError, resetLinkError} = this.state;

        return(
            <Grid container style={{padding: 50}} alignItems="center">
                {notValidated ? <SnackBarComponent value={true} message={errorMessage} type="error" stateChange={snackBarStateChange}/>
                    : <SnackBarComponent value={false} />}
                {resetLinkError ?
                    <Grid item xs={12} sm={8} lg={5} style={{margin: 'auto'}}>
                        <Paper style={{padding: 50, margin: 'auto'}}>
                            <Avatar src={require('../../images/Hogwarts-Logo.png')} style={{width:150, height: 150, marginRight: 'auto', marginLeft: 'auto', marginBottom: 15}}/>
                            <Typography variant="h6">
                                Reset Link is Invalid.
                            </Typography>
                            <FormHelperText>
                                Please request for another.
                            </FormHelperText>
                            <Typography style={{marginTop: 15}}>
                                Getting an Error? Try <Link to='/forgotpassword'>Forgot Password</Link>
                            </Typography>
                        </Paper>
                    </Grid>
                :

                    <Grid item xs={12} sm={8} lg={5} style={{margin: 'auto'}}>
                        <Paper style={{padding: 50, margin: 'auto'}}>
                            <Avatar src={require('../../images/Hogwarts-Logo.png')} style={{width:150, height: 150, marginRight: 'auto', marginLeft: 'auto', marginBottom: 15}}/>
                            <Typography variant="h6">
                                Hi {name}! Reset your password here.
                            </Typography>
                            <FormHelperText>
                                Once password is updated you'd be redirected to the login page.
                            </FormHelperText>
                            <FormControl fullWidth margin="normal">
                                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                <Input
                                    error={registerPasswordError}
                                    name = "password"
                                    id="adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={this.handleFormChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel htmlFor="adornment-confirmPassword">Confirm Password</InputLabel>
                                <Input
                                    error={registerConfirmPasswordError}
                                    name = "confirmPassword"
                                    id="adornment-confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={this.handleFormChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowConfirmPassword}>
                                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Button variant="contained" color="primary" style={{padding: 10, marginTop: 30}} fullWidth onClick={this.handleRegister}>
                                Update Password
                            </Button>
                            <Typography style={{marginTop: 15}}>
                                Return to Login anyways? <Link to='/login'>Login</Link>
                            </Typography>
                        </Paper>
                    </Grid>

                }
            </Grid>
        )
    }

}

export default withRouter(Register);