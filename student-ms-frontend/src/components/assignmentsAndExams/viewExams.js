import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class ViewExams extends Component{
    constructor(props){
        super(props);
        this.state={
            exams:[]
        }
    }

    componentDidMount() {
        axios.get('/api/exams').then(
            data => {
                this.setState({
                    exams : data.data
                })
            }
        );
    }

    render() {
        return(
            <div className="container">
                <table className="table">
                    <thead>

                    <th>Exam Name</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Course ID</th>
                    </thead>
                    <tbody>
                    {
                        this.state.exams.map(exams => {
                            return(
                                <tr key={exams._id}>
                                    <td>{exams.examName}</td>
                                    <td>{exams.examDate}</td>
                                    <td>{exams.examDuration}</td>
                                    <td>{exams.courseID}</td>
                                    <Link to={"/editExams/"+exams._id}>Edit Exam</Link>
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