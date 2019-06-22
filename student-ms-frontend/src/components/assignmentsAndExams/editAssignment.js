import React, { Component } from 'react';
import axios from 'axios';
import {DropzoneArea} from "material-ui-dropzone";

export default class EditAssignments extends Component {

    constructor(props) {
        super(props);

        this.onChangeAssignmentTitle = this.onChangeAssignmentTitle.bind(this);
        this.onChangeAssignmentDescription = this.onChangeAssignmentDescription.bind(this);
        this.onChangeAssignmentDueDate = this.onChangeAssignmentDueDate.bind(this);
        this.onSaveAssignmentFile = this.onSaveAssignmentFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            assignmentTitle: '',
            assignmentDueDate: '',
            assignmentDueTime: '00:00',
            assignmentDescription: '',
            courseID:'',
            files: '',
            open:false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/assignments/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    assignmentTitle: response.data.assignmentTitle,
                    assignmentDescription: response.data.assignmentDescription,
                    assignmentDueDate: response.data.assignmentDueDate,
                    assignmentDueTime: response.data.assignmentDueTime,
                    courseID:response.data.courseID,
                    files:response.data.files

                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeAssignmentTitle(e) {
        this.setState({
            assignmentTitle: e.target.value
        });
    }

    onChangeAssignmentDueDate(e) {
        this.setState({
            assignmentDueDate: e.target.value
        });
    }

    onChangeAssignmentDueTime(e) {
        this.setState({
            assignmentDueTime: e.target.value
        });
    }

    onChangeCourseID(e){
        this.setState({
            courseID: e.target.value
        });
    }

    onChangeAssignmentDescription(e) {
        this.setState({
            assignmentDescription: e.target.value
        });
    }

    onSaveAssignmentFile(files) {
        this.setState({
            files: files,
            open: false
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            assignmentTitle: this.state.assignmentTitle,
            assignmentDescription: this.state.assignmentDescription,
            assignmentDueDate: this.state.assignmentDueDate,
            assignmentDueTime: this.state.assignmentDueTime,
            courseID:this.state.courseID,
            files:this.state.files

        };
        console.log(obj);
        axios.post('http://localhost:3000/assignments/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center" className="form-title">Update Assignment</h3>
                <form onSubmit={this.onSubmit} >
                    <div className="form-group" >
                        <label>Assignment Title: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.assignmentTitle}
                                onChange={this.onChangeAssignmentTitle}

                        />
                    </div>
                    <div className="form-group">
                        <label>Assignment Description: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.assignmentDescription}
                            onChange={this.onChangeAssignmentDescription}
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

                    <div className="form-group">
                        <label>Assignment Due Date: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.assignmentDueDate}
                            onChange={this.onChangeAssignmentDueDate}
                        />
                    </div>

                    <div className="container">
                    <DropzoneArea
                        value = {this.state.files}
                        onSave={this.onSaveAssignmentFile}
                    />
                    </div>
                    <br />

                    <div className="form-group">
                        <input type="submit" value="Modify Assignment" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}