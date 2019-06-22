import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const stCourses = props => (
    <tr>
        <td>{props.stCourses.courseID}</td>
        <td>{props.stCourses.courseName}</td>

        <td>
            <Link to={"/register/"+props.stCourses._id}>Register</Link>
        </td>
    </tr>
)

export default class studentCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {stCourses: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/rest/api/StudentCoursesRouter')
            .then(response => {
                this.setState({ stCourses: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    courseList() {
        return this.state.stCourses.map(function(currentCourse, i){
            return <stCourses stc={currentCourse} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Course List</h3>
                <table className="table-striped" style={{ marginTop: 20, marginLeft:700 }} >
                    <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>

                    </tr>
                    </thead>
                    <tbody>
                    { this.courseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

