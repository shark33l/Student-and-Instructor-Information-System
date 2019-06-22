import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const stRegisteredCourses = props => (
    <tr>
        <td>{props.stRegisteredCourses.studentID}</td>
        <td>{props.stRegisteredCourses.courseID}</td>

        <td>
            <Link to={"/assignments/"+props.stRegisteredCourses._id}>Assignments</Link>
        </td>
        <td>
            <Link to={"/exams/"+props.stRegisteredCourses._id}>Exams</Link>
        </td>
        <td>
            <Link to={"/unenroll/"+props.stRegisteredCourses._id}>Unenroll</Link>
        </td>
    </tr>
)

export default class studentRegisteredCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {stRegisteredCourses: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/rest/api/StudentEnrollmentRouter', {
            params: {
                studentID : this.state.studentID
            }
        })
            .then(response => {
                this.setState({ stRegisteredCourses: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    registeredCourseList() {
        return this.state.stRegisteredCourses.map(function(currentRegisteredCourse, i){
            return <stRegisteredCourses stc={currentRegisteredCourse} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Student Registered Course List</h3>
                <table className="table-striped" style={{ marginTop: 20, marginLeft:700 }} >
                    <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Course Description</th>
                        <th>Lecturers</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.registeredCourseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

