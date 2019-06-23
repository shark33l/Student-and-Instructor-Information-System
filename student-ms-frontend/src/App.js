import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

//Routes
//NavBar
import SideBar from './components/dashboardLayout/SideBar';
import Notice from './components/dashboardLayout/Notice';

//Error Page
import errorPage from './components/error/errorPage';

//Loading Page
import LoadingPage from './components/feedbackComponents/LoadingPage'

//Authentication Routes
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'

//Admin Routes
import adminDashboard from './components/adminPanel/adminDashboard'

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
    constructor(props){
        super(props);
        this.state={
            authentified: {
                auth : false
            },
            accessString: '',
            userDetails : [],
            pageLoaded: false,
            currentPath : ''
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

        console.log(window.location.pathname);
        this.setState({
            currentPath : window.location.pathname
        })

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
                }, console.log(this.state))
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

        const { authentified, userDetails, pageLoaded, currentPath } = this.state;

        if(pageLoaded) {

            //Private Routes - General
            const PrivateRoute = ({ component: Component, userDetails, ...rest }) => (
                console.log(this.state.authentified),
                    <Route {...rest} render={(props) => (
                        authentified.auth === true
                            ? <Component {...props} userDetails ={userDetails}/>
                            : <Redirect to={{
                                pathname: '/login'
                            }} />
                    )} />
            )

            //Private Routes - General
            const PrivateRouteSideBar = ({ component: Component, removeAuth, userDetails, authentified,...rest }) => (
                console.log(this.state.authentified),
                console.log('path is ' + currentPath + ' auth - '+ authentified.auth),
                    <Route {...rest} render={(props) => (
                        authentified.auth === true
                            ? <Component {...props} removeAuth={removeAuth} userDetails={userDetails} authentified={authentified}/>
                            : currentPath === '/register'?
                                <Redirect to={{ pathname: currentPath }} />
                            : currentPath === '/forgotpassword'?
                                <Redirect to={{ pathname: currentPath }} />
                            : currentPath.includes('/resetpassword')?
                                <Redirect to={{ pathname: currentPath }} />
                            : currentPath === '/error404'?
                            <Redirect to={{ pathname: currentPath }} />
                            :
                                <Redirect to={{ pathname: '/login' }} />
                    )} />
            )

            //Private Routes - Admin
            const PrivateAdminRoute = ({ component: Component, ...rest }) => (
                console.log(this.state.authentified),
                    <Route {...rest} render={(props) => (
                        this.state.userDetails.userLevel === 1
                            ? <Component {...props} />
                            : <Redirect to={{
                                pathname: '/'
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
                                pathname: '/'
                            }} />
                    )} />
            )

            //Private Routes - Student
            const PrivateStudentRoute = ({ component: Component, ...rest }) => (
                console.log(this.state.userDetails),
                    <Route {...rest} render={(props) => (
                        this.state.userDetails.userLevel === 3
                            ? <Component {...props} />
                            : <Redirect to={{pathname: '/login'
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

            //Register
            const RegisterRoute = ({ component: Component, ...rest }) => (
                console.log(this.state.authentified),
                    <Route {...rest} render={(props) => (
                        this.state.authentified.auth !== true
                            ? <Component {...props} />
                            : <Redirect to={{
                                pathname: '/'
                            }} />
                    )} />
            )

            return (


                <BrowserRouter>
                    <Route>

                        {/*{authentified.auth ?*/}
                            {/*<SideBar*/}
                                {/*removeAuth={this.removeAuth.bind(this)}*/}
                                {/*userDetails={this.state.userDetails}*/}
                                {/*authentified={authentified}/>*/}
                            {/*:*/}
                            {/*<Redirect*/}
                                {/*to='/login'/>*/}
                        {/*}*/}

                        <PrivateRouteSideBar
                            path="/"
                            component={SideBar}
                            removeAuth={this.removeAuth.bind(this)}
                            userDetails={this.state.userDetails}
                            authentified={this.state.authentified}
                        />


                        <Switch>

                            <Route path="/error404" exact component={errorPage}/>

                            {(this.state.userDetails.userLevel === 3) ? (
                                //Student
                                <Route>
                                    <PrivateStudentRoute path="/" exact component={studentDashboard}/>
                                    <Route path="/studentHome" exact component={studentHome}/>
                                    <Route path="/studentSettings" exact component={studentSettings}/>
                                    <Route path="/assignmentUpload" exact component={assignmentUpload}/>
                                    <Route path="/studentEnrollment" exact component={studentEnrollment}/>

                                    //Exams
                                    <Route path="/viewExams" component={viewExams}/>

                                    //Assignments
                                    <Route path="/viewAssignments" component={viewAssignments}/>

                                </Route>
                                )
                            : (this.state.userDetails.userLevel === 2 || this.state.userDetails.userLevel === 3) ?(
                                    //Lecturer
                                    <Route>
                                        //Exams
                                        <Route path="/exam" component={createExams}/>
                                        <Route path="/editExams" component={editExams}/>
                                        <Route path="/viewExams" component={viewExams}/>

                                        //Assignments
                                        <Route path="/assignment" component={Assignments}/>
                                        <Route path="/editAssignments" component={editAssignment}/>
                                        <Route path="/viewAssignments" component={viewAssignments}/>

                                    </Route>
                                )
                             : (
                                        //Admin
                                        <Route>
                                            <PrivateRoute path="/" exact component={adminDashboard} userDetails={userDetails}/>
                                        </Route>
                                    )

                            }

                            {/*Assignment*/}

                        </Switch>
                    </Route>
                    <Route>
                        <Switch>
                            <LoginRoute path="/login" exact
                                   component={Login} setAuth={this.setAuth.bind(this)}/>}/>
                            <RegisterRoute path="/register" exact component={Register}/>
                            <RegisterRoute path="/forgotpassword" exact component={ForgotPassword}/>
                            <RegisterRoute path="/resetpassword/:token" exact component={ResetPassword}/>
                        </Switch>
                    </Route>
                </BrowserRouter>
            );
        }
        else {
            return(
                <LoadingPage />
            )
        }
    }
}

export default App;