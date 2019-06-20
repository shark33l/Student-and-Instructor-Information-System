import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import studentHome from "./studentHome";
import Login from "../auth/Login";
import TableCell from "@material-ui/core/TableCell";
import withStyles from "@material-ui/core/styles/withStyles";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";

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
                                    <Link to="/login" className="nav-link">Courses</Link>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Link to="/" className="nav-link">My Courses</Link>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Link to="/" className="nav-link">Notifications</Link>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Link to="/" className="nav-link">Settings</Link>
                                </StyledTableCell>

                            </TableRow>
                            </TableHead>
                            </Table>
                        </div>

                    <br/>
                    <Route path="/" exact component={studentHome}/>
                    <Route path="/login" exact component={Login}/>
                    {/*<Route path="/" exact component={studentHome}/>*/}
                    {/*<Route path="/" exact component={studentHome}/>*/}
                    {/*<Route path="/" exact component={studentHome}/>*/}

                </div>
            </Router>
        );
    }
}

export default StudentDashboard;