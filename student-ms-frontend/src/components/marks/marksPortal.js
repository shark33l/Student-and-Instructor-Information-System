import React, {Component} from 'react';
import CourseList from './CourseList'
import SubjectList from "./SubjectList";
import AddCourse from './AddCourse'
import CourseFee from './CourseFee'
import ReactDOM from 'react-dom';
import { NavLink} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import './marksCSS.css'
import MarksList from "./MarksList";

class MarksPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects:[],
            marks:[],
            trigger:false

        }
    }


    getCourseSubjects(courseCode){

        /*e.preventDefault();*/
        const searchSubject=courseCode;
        /*const searchtext=this.refs.code.value;*/


        fetch('http://localhost:5000/course/get-course/'+searchSubject,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response=>{
            return response.json();
        }).then((subjects)=>{
            this.setState({
                subjects:subjects
            },/*()=>console.log('heyyy okay now the subject array is raw..',searchSubject)*/)
        }).catch(err=>{
            alert("damnn "+err);
        })

    }

    getSubjectMarks(subjectCode){

        /*e.preventDefault();*/
        const searchMarks=subjectCode;
        /*const searchtext=this.refs.code.value;*/


        fetch('http://localhost:5000/subject/get-subject/'+searchMarks,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response=>{
            return response.json();
        }).then((marks)=>{
            this.setState({
                marks:marks
            },()=>console.log('heyyy okay now the marks array ray..',this.state.marks))
        }).catch(err=>{
            alert("damnn "+err);
        })

    }



    render() {
        return(

            <div className="containerMarks">
                <div className="back img">

                    <NavLink to="/" style={{color:"white"}}>Home</NavLink>
                    <NavLink to="/add-marks" style={{color:"white"}}>Add Marks</NavLink>

                    <div className="rowMarks">

                        <div className="col-md-3">
                            <form className="padding sub">
                                <fieldset >

                                <CourseList getCourseSub={this.getCourseSubjects.bind(this)}/>

                                </fieldset>
                            </form>
                        </div>

                        <div className="col-md-3">
                            <form className="padding sub">
                                <fieldset >

                                <SubjectList subs={this.state.subjects}
                                             getSubMarks={this.getSubjectMarks.bind(this)}

                                />

                                </fieldset>
                            </form>
                        </div>

                        <div className="col-md-6">
                            <form className="padding sub">
                                <fieldset >

                                    <MarksList gradings={this.state.marks} />

                                </fieldset>
                            </form>
                        </div>

                    </div>

                </div>

            </div>

        );
    }
}
export default MarksPortal;
