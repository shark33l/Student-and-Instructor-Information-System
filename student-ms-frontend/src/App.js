import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Router, BrowserRouter as Link} from 'react-router-dom';

//Routes
//NavBar
//import NavBar from './components/dashboardLayout/Navbar';
import SideBar from './components/dashboardLayout/SideBar';
import Notice from './components/dashboardLayout/Notice';

//Authentication Routes
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import studentHome from "./components/students/studentHome";
import studentDashboard from "./components/students/studentDashboard";
import studentSettings from "./components/students/studentSettings";
import assignmentUpload from "./components/students/assignmentUpload";
import studentEnrollment from "./components/students/studentEnrollment";

import Assignments from "./components/assignmentsAndExams/CreateAssignment";



class App extends React.Component{
    constructor(){
        super();
        this.state={
            auth: true
        }
    }


    render() {

        const { auth } = this.state;

        return (


            <BrowserRouter>


                {!auth? <Fragment /> : <SideBar />}

                <Route>
                    <Switch>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/register" exact component={Register}/>

                        <Route path="/studentDashboard" exact component={studentDashboard}/>
                        <Route path="/studentHome" exact component={studentHome}/>
                        <Route path="/studentSettings" exact component={studentSettings}/>
                        <Route path="/assignmentUpload" exact component={assignmentUpload}/>
                        <Route path="/studentEnrollment" exact component={studentEnrollment}/>


                        <Route path="/assignment" component={Assignments}/>

                    </Switch>
                </Route>

            </BrowserRouter>
        );
    }
}

export default App;