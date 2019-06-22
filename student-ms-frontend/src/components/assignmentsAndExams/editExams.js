import React, { Component } from 'react';
import axios from 'axios';
import {DropzoneArea} from "material-ui-dropzone";

export default class EditExams extends Component {

    constructor(props) {
        super(props);

        this.onChangeExamName = this.onChangeExamName.bind(this);
        this.onChangeExamDate = this.onChangeExamDate.bind(this);
        this.onChangeExamDuration = this.onChangeExamDuration.bind(this);
        this.onChangeCourseID = this.onChangeCourseID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            examName: '',
            examDate: '',
            examDuration: '',
            courseID:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exams/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    examName: response.data.examName,
                    examDate: response.data.examDate,
                    examDuration: response.data.examDuration,
                    courseID:response.data.courseID

                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeExamName(e) {
        this.setState({
            examName: e.target.value
        });
    }

    onChangeExamDate(e) {
        this.setState({
            examDate: e.target.value
        });
    }

    onChangeExamDuration(e) {
        this.setState({
            examDuration: e.target.value
        });
    }

    onChangeCourseID(e){
        this.setState({
            courseID: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            examName: this.state.examName,
            examDate: this.state.examDate,
            examDuration: this.state.examDuration,
            courseID:this.state.courseID,


        };
        console.log(obj);
        axios.post('http://localhost:3000/exams/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center" className="form-title">Update Exam Details</h3>
                <form onSubmit={this.onSubmit} >
                    <div className="form-group" >
                        <label>Exam Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.examName}
                                onChange={this.onChangeExamName}

                        />
                    </div>
                    <div className="form-group">
                        <label>Exam Date: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.examDate}
                            onChange={this.onChangeExamDate}
                        />
                    </div>

                    <div className="form-group">
                        <label>Exam Duration: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.examDuration}
                            onChange={this.onChangeExamDuration}
                        />
                    </div>

                    <div className="form-group">
                        <label>Course ID: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.courseID}
                            onChange={this.onChangeCourseID}
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Modify Exam" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}