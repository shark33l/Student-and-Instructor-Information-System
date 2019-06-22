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
import axios from "axios";

class StudentEnrollment extends Component{

    constructor(props){
        super(props);
        this.state = {
            studentEnrollmentDetails : {
                studentID: '',
                courseID: '',
                courses: []
            }

        }
    }

    componentDidMount() {
        axios.get('').then(
            data => {
                this.setState ({
                    courses: data.data
                })
            }
        )
    }


    //Handle Form Change
    handleFormChange = e =>{
        const {name, value} = e.target;
        let studentEnrollmentDetails = {...this.state.studentEnrollmentDetails};
        studentEnrollmentDetails[name] = value;
        this.setState({studentEnrollmentDetails});

    }

    //Handle Enroll Button
    handleStEnrollment = e => {
        //e.preventDefault();

        const studentEnrollmentPostUrl = "http://localhost:5000/rest/api/StudentEnrollmentRouter";
        const studentEnrollmentDetails = this.state.studentEnrollmentDetails;

        
        const studentEnrollmentData = {
            studentID: studentEnrollmentDetails.studentID,
            courseID: studentEnrollmentDetails.courseID

        }

        console.log(studentEnrollmentData);

        //Post Details
        fetch(studentEnrollmentPostUrl, {
            method : 'POST',
            body : JSON.stringify(studentEnrollmentData),
            headers: {'Content-Type' : 'application/json'}
        }).then(response => {
            return response.json()
        }).then(json => {
            if(json.user){
                console.log("Course ID already Exists")
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

                        <Button variant="contained" color="primary" style={{padding: 10, marginTop: 30}} fullWidth onClick={this.handleStEnrollment()}>
                            Enroll
                        </Button>

                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

export default StudentEnrollment;