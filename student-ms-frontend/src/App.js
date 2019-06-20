import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

//Routes
//NavBar
import NavBar from './components/dashboardLayout/Navbar';
import SideBar from './components/dashboardLayout/SideBar';

//Authentication Routes
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            authentified: {
                auth : false
            }
        }
    }

    setAuth(auth){
        this.setState({
            authentified : auth
        })
    }


    render() {

        const { authentified } = this.state;

        return (
            <BrowserRouter>
                {!authentified.auth? <Redirect to='/login'/> : <SideBar />}
                <Route>
                    {authentified.auth?
                        <Redirect to='/'/>
                        :
                        <Switch>
                            <Route path="/login" exact
                                   render={(props) => <Login {...props} setAuth = {this.setAuth.bind(this)} />}/>
                            <Route path="/register" exact component={Register}/>
                        </Switch>
                    }
                </Route>
            </BrowserRouter>
        );
    }
}

export default App;