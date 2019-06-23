import React, {Component} from 'react';
import {Avatar, Typography} from "@material-ui/core";
import home from '../../images/home.jpg';
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import {Route} from "react-router-dom";
import studentAssignmentsView from "./studentAssignmentsView";
import studentExamsView from "./studentExamsView";

// import makeStyles from "@material-ui/core/styles/makeStyles";
//
// const useStyles = makeStyles(theme => ({
//     button: {
//         margin: theme.spacing(1),
//     },
//     input: {
//         display: 'none',
//     },
// }));

class StudentHome extends Component {
    constructor() {
        super();


    }


    render(){


        return(

            <div className="container" style={{marginTop:'10px'}}>

                <div className="header">
                    <h1>Timeline</h1>
                </div>

                <div className="iconImage">
                    <img src={home} alt='Home'style={{height:450, width:900}}/>
                </div>

                <div className="main">
                    <div className="typo">
                    <Typography variant="h5">
                        Assignments
                    </Typography>
                    </div>
                    <div className="button">
                    <button type="submit" className="button_primary" style={{marginRight:'600px', marginTop:'-100px'}} onClick={()=>{this.view()}}> View </button>
                    </div>


                    <div className="typo">
                    <Typography variant="h5">
                        Exams
                    </Typography>
                    </div>
                    <div className="button">
                    <button type="submit" className="button_primary" style={{marginRight:'600px'}} onClick={studentExamsView}> View </button>

                        {/*<Button>*/}
                            {/*<switch>*/}

                                {/*<Link to="/studentAssignmentsView" style={{marginRight:'600px', textDecoration: "none"}}> View </Link>*/}
                                {/*<Route path="/studentAssignmentsView" component={studentAssignmentsView}/>*/}

                            {/*</switch>*/}
                            {/*/!*<Link to="/studentAssignmentsView" style={{marginRight:'600px', textDecoration: "none"}}> View </Link>*!/*/}
                        {/*</Button>*/}
                        {/*onClick={()=>{this.view()}}>*/}
                    </div>
                </div>


            </div>



        )


    }

}

export default StudentHome;