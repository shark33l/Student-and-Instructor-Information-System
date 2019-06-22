import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class ViewAssignments extends Component{
    constructor(props){
        super(props);
        this.state={
            assignments:[]
        }
    }

    componentDidMount() {
        axios.get('/api/assignments').then(
            data => {
                this.setState({
                    assignments : data.data
                })
            }
        );
    }

    render() {
        return(
            <div className="container">
                <table className="table">
                    <thead>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Course ID</th>
                    <th>File</th>
                    </thead>
                    <tbody>
                    {
                        this.state.assignments.map(Assignments => {
                            return(
                                <tr key={Assignments._id}>
                                    <td>{Assignments.Title}</td>
                                    <td>{Assignments.Description}</td>
                                    <td>{Assignments.DueDate}</td>
                                    <td>{Assignments.File}</td>
                                    <Link to={"/editAssignments/"+Assignments._id}>Edit Assignment</Link>
                                </tr>
                            )
                        })


                    }

                    </tbody>
                </table>
            </div>
        )
    }
}