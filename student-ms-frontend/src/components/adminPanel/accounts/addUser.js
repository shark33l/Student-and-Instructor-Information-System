import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Import Custom Components
import SnackBarComponent from '../../feedbackComponents/SnackBarComponent'

//Material UI Components
import {
    Grid,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Typography, Avatar, FormHelperText
} from '@material-ui/core';


class AddUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            registerDetails : {
                firstName: '',
                lastName: '',
                email : '',
                userLevel : 2
            },
            message : '',
            error : false,
            success : false,
            snackBarStateChange : false
        }
    }

    //Handle Form Change
    handleFormChange = e =>{
        const {name, value} = e.target;
        let registerDetails = {...this.state.registerDetails};
        registerDetails[name] = value;
        this.setState({registerDetails}, console.log(registerDetails));
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
            userLevel : registerDetails.userLevel,
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
                console.log("User Created - " + json.email);
                this.sendPasswordLink(json.email)
            }
            console.log(json)
        })

    }

    //Sent Set Password Link
    sendPasswordLink(email){

        const emailSendDetails = {
            email : email,
            reason : 'an account created for ' + email +'.'
        }
        const resetPostUrl = "http://localhost:5000/rest/api/users/passwordreset";

        console.log(emailSendDetails);

        fetch(resetPostUrl,  {
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
                    success : true,
                    error : false,
                    message : json.message,
                    snackBarStateChange : !this.state.snackBarStateChange
                }, console.log(this.state))
            } else {
                console.log("Email address unavailable");
                this.setState({
                    success : false,
                    error : true,
                    message : json.message,
                    snackBarStateChange : !this.state.snackBarStateChange
                }, console.log(this.state))
            }
            console.log(json)
        }).catch((err) => {
            console.log(err);
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

        const { firstName, lastName, email, userLevel } = this.state.registerDetails;
        const { error, success, message, snackBarStateChange } = this.state;

        return(
            <Grid container alignItems="center">
                {error? <SnackBarComponent value={true} message={message} type="error" stateChange={snackBarStateChange}/>
                : success? <SnackBarComponent value={true} message={message} type="success" stateChange={snackBarStateChange}/>
                    : <SnackBarComponent value={false} />}
                <Grid item style={{margin: 'auto'}}>
                        <Typography variant="h6">
                            Add New User
                        </Typography>
                        <FormHelperText>
                            User will be notified with a mail.
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
                        <FormControl fullWidth margin={"normal"}>
                            <InputLabel htmlFor="age-simple">Age</InputLabel>
                            <Select
                                name='userLevel'
                                value={userLevel}
                                onChange={this.handleFormChange}
                                >
                                <MenuItem value={1}>Admin</MenuItem>
                                <MenuItem value={2}>Lecturer</MenuItem>
                                <MenuItem value={3}>Student</MenuItem>
                            </Select>
                        </FormControl>

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
                            Create User
                        </Button>
                </Grid>
            </Grid>
        )
    }

}

export default AddUser;