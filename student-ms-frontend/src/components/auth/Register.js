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
            registerDetails : {
              firstName: '',
              lastName: '',
              email : '',
              password: '',
              confirmPassword: ''
            },
            showPassword : false,
            showConfirmPassword : false,

            //Validation States
            registerUserError : false,
            registerPasswordError : false,
            registerConfirmPasswordError : false,
            registerEmailError :false,
            registerFNameError :false,
            registerLNameError : false,
            notValidated : false,
            errorMessage : '',
            snackBarStateChange : false
        }
    }

    //Handle Form Change
    handleFormChange = e =>{
        const {name, value} = e.target;
        let registerDetails = {...this.state.registerDetails};
        registerDetails[name] = value;
        this.setState({registerDetails});

    }

    //Handle Validation
    handleValidation(){

        let {firstName, lastName, email, password, confirmPassword} = this.state.registerDetails;
        let
            registerPasswordError,
            registerConfirmPasswordError,
            registerEmailError,
            registerFNameError,
            registerLNameError
         = false;

        //reset Validate
        this.setState({
            notValidated : false
        })
        let notValidated = false;
        let errorMessage = 'Error, Please fill all fields.'

        const emailRegex = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
        const nameRegex = /^[a-zA-Z ]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if(!nameRegex.test(firstName)){
            registerFNameError= true;
            notValidated= true;
        }
        if(!nameRegex.test(lastName)){
            registerLNameError= true;
            notValidated= true;
        }
        if(!emailRegex.test(email)){
            registerEmailError= true;
            notValidated= true;
        }
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
           registerFNameError : registerFNameError,
           registerLNameError : registerLNameError,
           registerEmailError : registerEmailError,
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

        const registerPostUrl = "http://localhost:5000/rest/api/users/register";
        const registerDetails = this.state.registerDetails;

        //Student User Level is 3
        const registerData = {
            firstName : registerDetails.firstName,
            lastName : registerDetails.lastName,
            email : registerDetails.email,
            userLevel : 3,
            password : registerDetails.password,
            confirmPassword : registerDetails.confirmPassword
        }

        console.log(registerData);

        if(!this.handleValidation()){

            //Post Details
            fetch(registerPostUrl, {
                method : 'POST',
                body : JSON.stringify(registerData),
                headers: {'Content-Type' : 'application/json'}
            }).then(response => {
                return response.json()
            }).then(json => {
                if(json.user){
                    this.setState({
                        registerUserError: true,
                        notValidated : true,
                        errorMessage : 'Error! Email already in use.',
                        snackBarStateChange : !this.state.snackBarStateChange
                    })
                }
                if(json.created){
                    console.log("User Created");
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

    render(){

        const { firstName, lastName, email, password, confirmPassword } = this.state.registerDetails;
        const { showPassword, showConfirmPassword, notValidated, errorMessage, snackBarStateChange } = this.state;
        const {registerPasswordError, registerConfirmPasswordError, registerEmailError, registerFNameError, registerLNameError} = this.state;

        return(
            <Grid container style={{padding: 50}} alignItems="center">
                {notValidated ? <SnackBarComponent value={true} message={errorMessage} type="error" stateChange={snackBarStateChange}/>
                    : <SnackBarComponent value={false} />}
                <Grid item xs={12} sm={8} lg={5} style={{margin: 'auto'}}>
                    <Paper style={{padding: 50, margin: 'auto'}}>
                        <Avatar src={require('../../images/Hogwarts-Logo.png')} style={{width:150, height: 150, marginRight: 'auto', marginLeft: 'auto', marginBottom: 15}}/>
                        <Typography variant="h6">
                            Welcome to Hogwarts School of Witchcraft & Wizardry
                        </Typography>
                        <FormHelperText>
                            Registration for students only.
                        </FormHelperText>
                        <TextField
                            autoFocus
                            error={registerFNameError}
                            name="firstName"
                            id="standard-name"
                            label="First Name"
                            value={firstName}
                            margin="normal"
                            onChange={this.handleFormChange}
                            fullWidth
                        />
                        <TextField
                            error={registerLNameError}
                            name="lastName"
                            id="standard-name"
                            label="Last Name"
                            value={lastName}
                            margin="normal"
                            onChange={this.handleFormChange}
                            fullWidth
                        />
                        <TextField
                            error={registerEmailError}
                            name="email"
                            id="standard-email"
                            label="Email"
                            value={email}
                            margin="normal"
                            onChange={this.handleFormChange}
                            fullWidth
                        />
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
                            Register
                        </Button>
                        <Typography style={{marginTop: 15}}>
                            Already have an account? <Link to='/login'>Login</Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

export default withRouter(Register);