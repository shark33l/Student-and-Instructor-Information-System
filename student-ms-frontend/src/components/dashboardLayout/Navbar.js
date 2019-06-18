import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Material UI Components
import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';

//Material UI Icons
import {
    LocalLibrary,
} from '@material-ui/icons';


class Navbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            auth: true,
        }
    }

    render(){

        return(
            <div style={{flexGrow: 1, marginBottom: 50}}>
                <AppBar position="fixed">
                    <Toolbar>
                        <LocalLibrary style={{marginRight: 15}}/>
                        <Typography variant="h6" style={{flexGrow: 1}}>
                            Hogwarts School of Witchcraft
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

}

export default Navbar;