import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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

    onChangeExamName(e) {
        this.setState({
            examName: e.target.value
        });
    }

    onChangeExamDuration(e) {
        this.setState({
            examDuration: e.target.value
        });
    }

    onChangeExamDate(e) {
        this.setState({
            examDate: e.target.value
        });
    }

    onChangeCourseID(e){
        this.setState({
            courseID: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();


        this.setState({
            examName: '',
            examDuration: '',
            examDate: '',
            courseID:'',
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} style={{ marginLeft:700, marginTop:100}} >
                <h2 style={{align: 'center', paddingTop: 20, fontStyle: 'caliban', paddingLeft:75, marginLeft:60}}>Assignment</h2>
                <TextField
                    id="examName"
                    label="Exam Name"
                    className={classes.textField}
                    value={this.state.examName}
                    onChange={this.onChangeExamName}
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
                    label="Exam Date"
                    type="date"
                    defaultValue="2019-06-23"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    width="375"
                    leftMargin="7"
                    value={this.state.examDate}
                    onChange={this.onChangeExamDate}
                />

                <TextField
                    id="examDuration"
                    label="Exam Duration"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    width="375"
                    leftMargin="7"
                    value={this.state.examDuration}
                    onChange={this.onChangeExamDuration}
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