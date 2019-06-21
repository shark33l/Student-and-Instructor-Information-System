import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Material UI Components
import { Grid, Paper, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Button, Typography, Avatar, FormHelperText } from '@material-ui/core';

//Material UI Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            loginDetails : {
              email : '',
              password: ''
            },
            showPassword : false
        }
    }

    handleFormChange = e =>{
        const {name, value} = e.target;
        let loginDetails = {...this.state.loginDetails};
        loginDetails[name] = value;
        this.setState({loginDetails});

        console.log(loginDetails);

    }

    handleClickShowPassword = e => {
        this.setState({
            showPassword : !this.state.showPassword
        })
    }

    render(){

        const { email, password } = this.state.loginDetails;
        const { showPassword } = this.state;

        return(
            <Grid container style={{padding: 50}} alignItems="center">
                <Grid item xs={12} sm={8} lg={5} style={{margin: 'auto'}}>
                    <Paper style={{padding: 50, margin: 'auto'}}>
                        <Avatar src={require('../../images/Hogwarts-Logo.png')} style={{width:150, height: 150, marginRight: 'auto', marginLeft: 'auto', marginBottom: 15}}/>
                        <Typography variant="h6">
                            Welcome to Hogwarts School of Witchcraft & Wizardry
                        </Typography>
                        <TextField
                            autoFocus
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
                        <Button variant="contained" color="primary" style={{padding: 10, marginTop: 30}} fullWidth>
                            Login
                        </Button>
                        <Typography style={{marginTop: 30}}>
                            Are you a Student and in need of an account? <Link to='/register'>Register</Link><br/>
                        </Typography>
                        <hr />
                        <Typography style={{marginBottom: 15}}>
                            Having trouble with your account? <Link to='/register'>Forgot Password</Link>
                        </Typography>
                        <FormHelperText>
                            Contact adminhogwarts@gmail.com if you are
                            a Lecturer and in need of an account.
                        </FormHelperText>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

export default Login;