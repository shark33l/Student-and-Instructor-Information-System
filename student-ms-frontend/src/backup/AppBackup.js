import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

//Routes
//NavBar
import SideBar from './components/dashboardLayout/SideBar';
import Notice from './components/dashboardLayout/Notice';

//Error Page
import errorPage from './components/error/errorPage';

//Authentication Routes
import Login from './components/auth/Login';
import Register from './components/auth/Register';

//Lecturer Routes
import addLecturer from './components/adminPanel/accounts/addLecturer'

//Student Routes
import studentHome from "./components/students/studentHome";
import studentDashboard from "./components/students/studentDashboard";
import studentSettings from "./components/students/studentSettings";
import assignmentUpload from "./components/students/assignmentUpload";
import studentEnrollment from "./components/students/studentEnrollment";

//Assignment Routes
import Assignments from "./components/assignmentsAndExams/CreateAssignment";
import viewAssignments from "./components/assignmentsAndExams/viewAssignments";
import editAssignment from "./components/assignmentsAndExams/editAssignment";
import createExams from "./components/assignmentsAndExams/createExams";
import editExams from "./components/assignmentsAndExams/editExams";
import viewExams from "./components/assignmentsAndExams/viewExams";


//Private Routes - General
const PrivateRoute = ({ component: Component, ...rest }) => (
    console.log(this.state.authentified),
        <Route {...rest} render={(props) => (
            this.state.authentified.auth === true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login'
                }} />
        )} />
)

//Private Routes - Admin
const PrivateAdminRoute = ({ component: Component, ...rest }) => (
    console.log(this.state.authentified),
        <Route {...rest} render={(props) => (
            this.state.userDetails.userLevel === 1
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login'
                }} />
        )} />
)

//Private Routes - Lecturer
const PrivateLecturerRoute = ({ component: Component, ...rest }) => (
    console.log(this.state.authentified),
        <Route {...rest} render={(props) => (
            this.state.userDetails.userLevel === 2
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login'
                }} />
        )} />
)

//Private Routes - Student
const PrivateStudentRoute = ({ component: Component, ...rest }) => (
    console.log(this.state.userDetails),
        <Route {...rest} render={(props) => (
            this.state.userDetails.userLevel === 3
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login'
                }} />
        )} />
)

//Show only if user not logged in
//Login
const LoginRoute = ({ component: Component, setAuth, ...rest }) => (
    console.log(this.state.authentified),
        <Route {...rest} render={(props) => (
            this.state.authentified.auth !== true
                ? <Component {...props} setAuth={setAuth} />
                : <Redirect to={{
                    pathname: '/'
                }} />
        )} />
)

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

        const { authentified, userDetails } = this.state;

        return (


            <BrowserRouter>
                <Route path="/error404" exact component={errorPage}/>
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
                        <Route path="/assignmentUpload" exact component={assignmentUpload}/>
                        <Route path="/studentEnrollment" exact component={studentEnrollment}/>

                        {/*Assignment*/}
                        <Route path="/assignment" component={Assignments}/>
                        <Route path="/viewAssignments" component={viewAssignments}/>
                        <Route path="/editAssignments" component={editAssignment}/>
                        <Route path="/exam" component={createExams}/>
                        <Route path = "/editExams" component={editExams}/>
                        <Route path = "/viewExams" component={viewExams}/>
          
                        {/*Lecturer*/}
                        {userDetails.userLevel === 1?
                            <Switch>
                                <Route path="/lecturer/add" component={addLecturer}/>
                            </Switch>
                            : <Redirect
                                to='/error404'/>
                        }


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