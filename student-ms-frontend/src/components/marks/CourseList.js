import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Link from '@material-ui/core/Link';


var divStyle = {
    color: 'white',
    backgroundColor:'grey'
};

class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }



    componentDidMount() {
        fetch('http://localhost:5000/course/get-courses',{
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        }).then(response=>{
            return response.json();
        }).then((data)=>{
            this.setState({
                courses:data
            },/*()=>console.log('all fetch state is st',this.state.courses)*/)
        }).catch(err=>{
            alert(err);
        })
    }



    render() {
        return(
            <div>
                <h2>All Courses</h2>
                <ul>
                    {this.state.courses.map(course=>

                        <div
                            className="resultsMarks"
                            style={divStyle}
                            type="Submit"
                            key={course._id}
                            color={"inherit"}
                            onClick={() => {
                                this.props.getCourseSub(course.courseCode);
                            }}
                        >
                            {course.name}
                        </div>



                    )}
                </ul>
            </div>
        );
    }
}
export default CourseList;
