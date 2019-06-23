import React, {Component} from 'react';

class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }


    render() {
        return(
           <h2>Sorry page does not exist</h2>
        );
    }
}
export default Error;
