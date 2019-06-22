import React, { Component } from 'react';
// import {Link} from "react-router-dom";
// //import axios from 'axios';
//
// const stRegisteredCourses = props => (
//     <tr>
//         <td>{props.stRegisteredCourses.courseId}</td>
//         <td>{props.stRegisteredCourses.courseName}</td>
//         <td>{props.stRegisteredCourses.courseDescription}</td>
//         <td>{props.stRegisteredCourses.lecturers}</td>
//         <td>
//             <Link to={"/assignments/"+props.stRegisteredCourses._id}>Assignments</Link>
//         </td>
//         <td>
//             <Link to={"/exams/"+props.stRegisteredCourses._id}>Exams</Link>
//         </td>
//         <td>
//             <Link to={"/unenroll/"+props.stRegisteredCourses._id}>Unenroll</Link>
//         </td>
//     </tr>
// )
//
// export default class studentRegisteredCourses extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {stRegisteredCourses: []};
//     }
//
//     componentDidMount() {
//         axios.get('http://localhost:3000/studentRegisteredCourses/')
//             .then(response => {
//                 this.setState({ stRegisteredCourses: response.data });
//             })
//             .catch(function (error){
//                 console.log(error);
//             })
//     }
//
//     courseList() {
//         return this.state.stRegisteredCourses.map(function(currentCourse, i){
//             return <stRegisteredCourses stc={currentCourse} key={i} />;
//         })
//     }
//
//     render() {
//         return (
//             <div>
//                 <h3>Student Registered Course List</h3>
//                 <table className="table table-striped" style={{ marginTop: 20 }} >
//                     <thead>
//                     <tr>
//                         <th>Course ID</th>
//                         <th>Course Name</th>
//                         <th>Course Description</th>
//                         <th>Lecturers</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     { this.courseList() }
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }

