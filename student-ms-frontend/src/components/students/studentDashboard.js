import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import studentHome from "./studentHome";
import Login from "../auth/Login";
import TableCell from "@material-ui/core/TableCell";
import withStyles from "@material-ui/core/styles/withStyles";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import studentSettings from "./studentSettings";
import studentCourses from "./studentCourses";
import studentRegisteredCourses from "./studentRegisteredCourses";

import { Grid, Paper, Typography } from '@material-ui/core';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#D3D3D3",
        color: "#ffffff",
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class StudentDashboard extends Component {

    constructor(){
        super();
        this.state = {
            courseCount: 24
        }
    }

    render() {
        return (
            <Router>
                <div className="container" style={{marginTop:80, marginLeft:240}}>


                        <div>
                            <Table className="table-striped" >
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    <Link to="/" className="nav-link">Home</Link>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Link to="/studentCourses" className="nav-link">Courses</Link>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Link to="/studentRegisteredCourses" className="nav-link">My Courses</Link>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Link to="/" className="nav-link">Notifications</Link>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Link to="/studentSettings" className="nav-link">Settings</Link>
                                </StyledTableCell>

                            </TableRow>
                            </TableHead>
                            </Table>
                        </div>

                    <br/>

                        <Grid container direction={"row"} spacing={4} xs={12}>

                            <Grid item xs={3}>
                                <Link to="/studentRegisteredCourses" style={{ textDecoration: 'none' }}>
                    <Paper style={{background: "#3949ab", color: "white"}}>
                        <div style={{paddingTop: 20, paddingBottom: 20}}>
                        <Typography variant="h6" >
                            Registered Courses
                        </Typography>
                        <Typography variant="h1">
                            {this.state.courseCount}
                        </Typography>
                        </div>
                    </Paper>
                    </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to="/studentCourses" style={{ textDecoration: 'none' }}>
                                <Paper style={{background: "#1e88e5", color: "white"}}>
                                    <div style={{paddingTop: 20, paddingBottom: 20}}>
                                    <Typography variant="h6" >
                                        All Courses
                                    </Typography>
                                    <Typography variant="h1">
                                        {this.state.courseCount}
                                    </Typography>
                                    </div>
                                </Paper>
                                </Link>
                            </Grid>
                        </Grid>


                    <Route path="/" exact component={studentHome}/>
                    <Route path="/studentCourses" exact component={studentCourses}/>
                    <Route path="/studentRegisteredCourses" exact component={studentRegisteredCourses}/>
                    {/*<Route path="/" exact component={studentHome}/>*/}
                    <Route path="/studentSettings" exact component={studentSettings}/>

                </div>
            </Router>
        );
    }
}

export default StudentDashboard;