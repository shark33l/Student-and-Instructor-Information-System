import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//Routes
//NavBar
//import NavBar from './components/dashboardLayout/Navbar';
import SideBar from './components/dashboardLayout/SideBar';
import Notice from './components/dashboardLayout/Notice';

//Authentication Routes
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Assignments from "./components/assignmentsAndExams/CreateAssignment";
import viewAssignments from "./components/assignmentsAndExams/viewAssignments";
import editAssignment from "./components/assignmentsAndExams/editAssignment";
import createExams from "./components/assignmentsAndExams/createExams";
import editExams from "./components/assignmentsAndExams/editExams";
import viewExams from "./components/assignmentsAndExams/viewExams";


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
                        <Route path="/assignment" component={Assignments}/>
                        <Route path="/viewAssignments" component={viewAssignments}/>
                        <Route path="/editAssignments" component={editAssignment}/>
                        <Route path="/exam" component={createExams}/>
                        <Route path = "/editExams" component={editExams}/>
                        <Route path = "/viewExams" component={viewExams}/>

                    </Switch>
                </Route>

            </BrowserRouter>
        );
    }
}

export default App;