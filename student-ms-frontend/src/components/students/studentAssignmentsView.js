import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const stAssignmentsView = props => (
    <tr>
        <td>{props.stAssignmentsView.courseID}</td>
        <td>{props.stAssignmentsView.courseName}</td>
        <td>{props.stAssignmentsView.assignmentTitle}</td>
        <td>{props.stAssignmentsView.dueDate}</td>

        {/*<td>*/}
            {/*<Link to={"/register/"+props.stAssignmentsView._id}>Register</Link>*/}
        {/*</td>  */}

    </tr>
)

export default class studentAssignmentsView extends Component {

    constructor(props) {
        super(props);
        this.state = {stAssignmentsView: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/rest/api/StudentAssignmentRouter')
            .then(response => {
                this.setState({ stAssignmentsView: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    studentAssignmentsList() {
        return this.state.stAssignmentsView.map(function(currentAssignment, i){
            return <stAssignmentView stc={currentAssignment} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Assignments</h3>
                <table className="table-striped" style={{ marginTop: 20, marginLeft: 800}} >
                    <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Assignment Title</th>
                        <th>Due Date</th>

                    </tr>
                    </thead>
                    <tbody>
                    { this.studentAssignmentsList() }
                    </tbody>
                </table>
            </div>
        )
    }
}