import React, {Component} from 'react';
import {Paper, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

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
                    <button type="submit" className="button_primary" style={{marginRight:'600px'}} onClick={()=>{this.view()}}> View </button>
                    </div>
                </div>


            </div>



        )


    }

}

export default StudentHome;