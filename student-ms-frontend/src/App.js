import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//Routes
//NavBar
import NavBar from './components/dashboardLayout/Navbar';
import SideBar from './components/dashboardLayout/SideBar';

//Authentication Routes
import Login from './components/auth/Login';
import Register from './components/auth/Register';
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
                        <Route path="/assignment" component={Assignments}/>
                    </Switch>
                </Route>
            </BrowserRouter>
        );
    }
}

export default App;