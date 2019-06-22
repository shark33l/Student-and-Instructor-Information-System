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


class addLecturer extends Component{

    constructor(props){
        super(props);
        this.state = {
            registerDetails : {
                firstName: '',
                lastName: '',
                email : '',
            }
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

        //Generate Random Password
        const randomPassword = Math.random().toString(36).slice(-8);

        //Lecturer User Level is 3
        const registerData = {
            firstName : registerDetails.firstName,
            lastName : registerDetails.lastName,
            email : registerDetails.email,
            userLevel : 2,
            password : randomPassword,
            confirmPassword : randomPassword
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
                console.log("User Created - " + json._id);
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

        const { firstName, lastName, email } = this.state.registerDetails;

        return(
            <Grid container style={{padding: 50}} alignItems="center">
                <Grid item xs={12} sm={8} lg={5} style={{margin: 'auto'}}>
                    <Paper style={{padding: 50, margin: 'auto'}}>
                        <Typography variant="h6">
                            Add New Lecturer
                        </Typography>
                        <FormHelperText>
                            Lecturer will be notified with a mail.
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
                        <Button variant="contained" color="primary" style={{padding: 10, marginTop: 30}} fullWidth onClick={this.handleRegister}>
                            Create Lecturer
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

export default withRouter(addLecturer);