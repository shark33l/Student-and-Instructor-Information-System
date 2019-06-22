import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

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
            showConfirmPassword : false
        }
    }

    //Handle Form Change
    handleFormChange = e =>{
        const {name, value} = e.target;
        let registerDetails = {...this.state.registerDetails};
        registerDetails[name] = value;
        this.setState({registerDetails});

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

        //Post Details
        fetch(registerPostUrl, {
            method : 'POST',
            body : JSON.stringify(registerData),
            headers: {'Content-Type' : 'application/json'}
        }).then(response => {
            return response.json()
        }).then(json => {
            if(json.user){
                console.log("User already Exists")
            }
            if(json.created){
                console.log("User Created");
                this.props.history.push('/login')
            }
            console.log(json)
        })

    }

    //Handle Validation

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
        const { showPassword, showConfirmPassword } = this.state;

        return(
            <Grid container style={{padding: 50}} alignItems="center">
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
                            name="firstName"
                            id="standard-name"
                            label="First Name"
                            value={firstName}
                            margin="normal"
                            onChange={this.handleFormChange}
                            fullWidth
                        />
                        <TextField
                            name="lastName"
                            id="standard-name"
                            label="Last Name"
                            value={lastName}
                            margin="normal"
                            onChange={this.handleFormChange}
                            fullWidth
                        />
                        <TextField
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