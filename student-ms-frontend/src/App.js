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

class App extends React.Component{
    constructor(){
        super();
        this.state={
            authentified: {
                auth : false
            },
            accessString: '',
            userDetails : [],
            pageLoaded: false,
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

    componentDidMount() {

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
                        },
                    })
                }
                this.setState({
                    pageLoaded : true
                })
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

        const { authentified, userDetails, pageLoaded } = this.state;

        if(pageLoaded) {

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


            return (


                <BrowserRouter>
                    <Route>

                        {authentified.auth ?
                            <SideBar
                                removeAuth={this.removeAuth.bind(this)}
                                userDetails={this.state.userDetails}
                                authentified={authentified}/>
                            :
                            <Redirect
                                to='/login'/>
                        }
                        <Switch>

                            <Route path="/error404" exact component={errorPage}/>

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
                            <Route path="/editExams" component={editExams}/>
                            <Route path="/viewExams" component={viewExams}/>

                            {/*Lecturer*/}
                            <Route path="/lecturer/add" component={addLecturer}/>

                        </Switch>
                    </Route>
                    <Route>
                        <Switch>
                            <LoginRoute path="/login" exact
                                   component={Login} setAuth={this.setAuth.bind(this)}/>}/>
                            <Route path="/register" exact component={Register}/>
                        </Switch>
                    </Route>
                </BrowserRouter>
            );
        }
        else {
            return(
                <h1>Loading</h1>
            )
        }
    }
}

export default App;