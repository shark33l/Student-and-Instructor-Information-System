import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

class StudentEnrollment extends Component{

    constructor(props){
        super(props);
        this.state = {
            studentEnrollmentDetails : {
                studentID: '',
                courseID: ''
            }

        }
    }

    //Handle Form Change
    handleFormChange = e =>{
        const {name, value} = e.target;
        let studentEnrollmentDetails = {...this.state.studentEnrollmentDetails};
        studentEnrollmentDetails[name] = value;
        this.setState({studentEnrollmentDetails});

    }

    //Handle Enroll Button
    handleEnrollment = e => {
        //e.preventDefault();

        const enrollmentPostUrl = "http://localhost:5000/rest/api/studentEnrollment/enroll"; //studentEnrollment database table
        const studentEnrollmentDetails = this.state.studentEnrollmentDetails;

        const enrollmentData = {
            studentID : studentEnrollmentDetails.firstName,
            courseID : studentEnrollmentDetails.lastName
        }

        console.log(enrollmentData);

        //Post Details
        fetch(enrollmentPostUrl, {
            method : 'POST',
            body : JSON.stringify(enrollmentData),
            headers: {'Content-Type' : 'application/json'}
        }).then(response => {
            return response.json()
        }).then(json => {
            if(json.user){
                console.log("Student ID already Exists")
            }
            if(json.created){
                console.log("Student Enrolled")
            }
            console.log(json)
        })


    }


    render(){

        const { studentID, courseID } = this.state.studentEnrollmentDetails;

        return(
            <Grid container style={{padding: 50}} alignItems="center">
                <Grid item xs={12} sm={8} lg={5} style={{margin: 'auto'}}>
                    <Paper style={{padding: 50, margin: 'auto'}}>
                        <Avatar src={require('../../images/notifications.jpg')} style={{width:150, height: 150, marginRight: 'auto', marginLeft: 'auto', marginBottom: 15}}/>
                        <Typography variant="h6">
                            Course Enrollment
                        </Typography>

                        <TextField
                            autoFocus
                            name="studentID"
                            id="standard-ID"
                            label="Student ID "
                            value={studentID}
                            margin="normal"
                            onChange={this.handleFormChange}
                            fullWidth
                        />
                        <TextField
                            name="courseID"
                            id="standard-ID"
                            label="Course ID"
                            value={courseID}
                            margin="normal"
                            onChange={this.handleFormChange}
                            fullWidth
                        />

                        <Button variant="contained" color="primary" style={{padding: 10, marginTop: 30}} fullWidth onClick={this.handleEnrollment()}>
                            Enroll
                        </Button>

                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

export default StudentEnrollment;