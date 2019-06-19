import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//Routes
//NavBar
//import NavBar from './components/dashboardLayout/Navbar';
import SideBar from './components/dashboardLayout/SideBar';

//Authentication Routes
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            auth: false
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
                    </Switch>
                </Route>
            </BrowserRouter>
        );
    }
}

export default App;