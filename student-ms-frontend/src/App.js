import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

//Routes
//NavBar
import SideBar from './components/dashboardLayout/SideBar';
import Notice from './components/dashboardLayout/Notice';

//Authentication Routes
import Login from './components/auth/Login';
import Register from './components/auth/Register';

//Student Routes
import studentHome from "./components/students/studentHome";
import studentDashboard from "./components/students/studentDashboard";
import studentSettings from "./components/students/studentSettings";

//Assignment Routes
import Assignments from "./components/assignmentsAndExams/CreateAssignment";



class App extends React.Component{
    constructor(){
        super();
        this.state={
            authentified: {
                auth : false
            },
            accessString: '',
            userDetails : []
        }
    }

    setAuth(auth){
        this.setState({
            authentified : {
                auth : true
            },
            accessString : auth.token,
            userDetails : {
                firstName : auth.firstName,
                lastName : auth.lastName,
                email : auth.email,
                userLevel : auth.userLevel
            }
        }, console.log(this.state))
    }

    // Reset Default
    removeAuth(){
        this.setState(({
            authentified : {
                auth : false
            },
            accessString : '',
            userDetails : []
        }))
    }

    componentWillMount() {

        let accessString = localStorage.getItem("jwt");
        let email = localStorage.getItem("email");

        const findUserUrl = "http://localhost:5000/rest/api/users/finduser";

        fetch(findUserUrl, {
            params : { email : email },
            headers : { Authorization : 'JWT ' + accessString}
        })
            .then(response =>{
                return response.json()
            })
            .then(json => {
                if(json.auth){
                    this.setState({
                        accessString : accessString,
                        userDetails : json,
                        authentified : {
                            auth : true
                        }
                    })
                }
            })
        console.log(this.state);

    }

    componentDidUpdate(prevProps, prevState) {

        // let accessString = localStorage.getItem("jwt");
        // let email = localStorage.getItem("email");
        //
        // const findUserUrl = "http://localhost:5000/rest/api/users/finduser";
        //
        // fetch(findUserUrl, {
        //     params : { email : email },
        //     headers : { Authorization : 'JWT ' + accessString}
        // })
        //     .then(response =>{
        //         return response.json()
        //     })
        //     .then(json => {
        //         if(json.auth){
        //             this.setState({
        //                 userDetails : json,
        //                 authentified : {
        //                     auth : true
        //                 }
        //             })
        //         }
        //     })

        //console.log(prevState);

        // if(this.state.authentified.auth){
        //
        //     if(this.state.authentified.auth !== prevState.authentified.auth){
        //
        //         this.setState({
        //             accessString : accessString
        //         })
        //         console.log(accessString);
        //
        //     }
        //
        // }

    }


    render() {

        const { authentified } = this.state;

        return (


            <BrowserRouter>
                {!authentified.auth?
                    <Redirect
                        to='/login'/>
                : <Route>
                    <SideBar
                        removeAuth = {this.removeAuth.bind(this)}
                        userDetails = {this.state.userDetails}
                        authentified = {authentified}/>
                    <Switch>

                        {/*Student*/}
                        <Route path="/studentDashboard" exact component={studentDashboard}/>
                        <Route path="/studentHome" exact component={studentHome}/>
                        <Route path="/studentSettings" exact component={studentSettings}/>

                        {/*Assignment*/}
                        <Route path="/assignment" component={Assignments}/>

                        {/*Lecturer*/}

                    </Switch>
                  </Route>
                }
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