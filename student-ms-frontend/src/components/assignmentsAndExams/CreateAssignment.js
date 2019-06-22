import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {DropzoneArea} from 'material-ui-dropzone'

const styles = theme => ({
    container: {
        height: 500,
        width: 400,
        backgroundColor: '#d2d8d2',
        justifyContent: 'flex-end',
        flexContainer: 'center',
        background: 'linear-gradient(45deg, #8e9eab 0%, #eef2f3 100%)',
        borderRadius: 3

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width:375,
        marginTop:10
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        height: 700
    },
    grid: {
        width: '60%',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});


class OutlinedTextFields extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeAssignmentTitle = this.onChangeAssignmentTitle.bind(this);
        this.onChangeAssignmentDueDate = this.onChangeAssignmentDueDate.bind(this);
        this.onChangeAssignmentDueTime = this.onChangeAssignmentDueTime.bind(this);
        this.onChangeAssignmentDescription = this.onChangeAssignmentDescription.bind(this);
        this.onChangeCourseID = this.onChangeCourseID.bind(this);
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


        this.setState({
            assignmentTitle: '',
            assignmentDueDate: '',
            assignmentDueTime: '',
            assignmentDescription: '',
            courseID:'',
            files:''
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} style={{ marginLeft:700, marginTop:100}} >
                <h2 style={{align: 'center', paddingTop: 20, fontStyle: 'caliban', paddingLeft:75, marginLeft:60}}>Assignment</h2>
                <TextField
                    id="assignmentTitle"
                    label="Assignment Title"
                    className={classes.textField}
                    value={this.state.assignmentTitle}
                    onChange={this.onChangeAssignmentTitle}
                    margin="normal"
                    variant="outlined"
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}

                    margin="normal"
                />

                <TextField
                    id="assignmentDescription"
                    label="Assignment Description"
                    multiline
                    rowsMax="4"
                    className={classes.textField}
                    value={this.state.assignmentDescription}
                    onChange={this.onChangeAssignmentDescription}
                    variant="outlined"
                    margin="normal"
                />

                <TextField
                    id="courseID"
                    label="Course ID"
                    className={classes.textField}
                    value={this.state.courseID}
                    onChange={this.onChangeCourseID}
                    margin="normal"
                    variant="outlined"
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}

                    margin="normal"
                />

                <TextField
                    id="date"
                    label="Due Date"
                    type="date"
                    defaultValue="2019-06-23"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    width="375"
                    leftMargin="7"
                    value={this.state.assignmentDueDate}
                    onChange={this.onChangeAssignmentDueDate}
                />

                <TextField
                    id="time"
                    label="Due Time"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.assignmentDueTime}
                    onChange={this.onChangeAssignmentDueTime}
                />

                <DropzoneArea
                    value = {this.state.files}
                    onSave={this.onSaveAssignmentFile}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Create
                </Button>
            </form>
        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OutlinedTextFields);