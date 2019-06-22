import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Material UI Components
import {Grid, Paper, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Button, Typography, Avatar, FormHelperText} from '@material-ui/core';

//Material UI Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

class StudentSettings extends Component{

    constructor(props){
        super(props);
        this.state = {
            updatePasswordDetails : {
                password : '',
                newPassword: '',
                confirmPassword: ''
            },
            showPassword : false,
            showNewPassword: false,
            showConfirmPassword : false
        }
    }

    //Handle Form Change
    handleFormChange = e =>{
        const {name, value} = e.target;
        let updatePasswordDetails = {...this.state.updatePasswordDetails};
        updatePasswordDetails[name] = value;
        this.setState({updatePasswordDetails});

        console.log(updatePasswordDetails);

    }

    //Update password button
    handleUpdatePassword = e => {
        e.preventDefault();

        const updatePasswordPostUrl = "http://localhost:5000/rest/api/updatePassword";
        const updatePasswordDetails = this.state.updatePasswordDetails;


        const updatePasswordData = {

            password : updatePasswordDetails.password,
            newPassword: updatePasswordDetails.newPassword,
            confirmPassword : updatePasswordDetails.confirmPassword
        }

        console.log(updatePasswordData);

        //Post Details
        fetch(updatePasswordPostUrl, {
            method : 'POST',
            body : JSON.stringify(updatePasswordData),
            headers: {'Content-Type' : 'application/json'}
        }).then(response => {
            return response.json()
        }).then(json => {
            if(json.user){
                console.log("Password already Exists")
            }
            if(json.created){
                console.log("Password updated")
            }
            console.log(json)
        })

    }

    //Handle Password Visibility
    handleClickShowPassword = e => {
        this.setState({
            showPassword : !this.state.showPassword
        })
    }

    handleClickShowNewPassword = e => {
        this.setState({
            showNewPassword : !this.state.showNewPassword
        })
    }

    handleClickShowConfirmPassword = e => {
        this.setState({
            showConfirmPassword : !this.state.showConfirmPassword
        })
    }

    render(){

        const { password, newPassword, confirmPassword } = this.state.updatePasswordDetails;
        const { showPassword, showNewPassword, showConfirmPassword } = this.state;

        return(
            <Grid container style={{padding: 50}} alignItems="center">
                <Grid item xs={12} sm={8} lg={5} style={{margin: 'auto'}}>
                    <Paper style={{padding: 50, margin: 'auto'}}>
                        <Avatar src={require('../../images/studentSettings.jpg')} style={{width:150, height: 150, marginRight: 'auto', marginLeft: 'auto', marginBottom: 15}}/>
                        <Typography variant="h6">
                            Update Password
                        </Typography>

                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="adornment-password">Current Password</InputLabel>
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
                            <InputLabel htmlFor="adornment-newPassword">New Password</InputLabel>
                            <Input
                                name = "newPassword"
                                id="adornment-newPassword"
                                type={showNewPassword ? 'text' : 'newPassword'}
                                value={newPassword}
                                onChange={this.handleFormChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowNewPassword}>
                                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
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
                                type={showConfirmPassword ? 'text' : 'newPassword'}
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
                        <Button variant="contained" color="primary" style={{padding: 10, marginTop: 30}} fullWidth onClick={this.handleUpdatePassword}>
                            Update Password
                        </Button>

                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

export default StudentSettings;