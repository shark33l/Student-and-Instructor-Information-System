// import React, { Component } from 'react';
// import {Link} from "react-router-dom";
// //import axios from 'axios';
//
// const stExamsView = props => (
//     <tr>
//         <td>{props.stExamsView.courseId}</td>
//         <td>{props.stExamsView.courseName}</td>
//         <td>{props.stExamsView.ExamName}</td>
//         {/*<td>{props.stAssignmentsView.lecturers}</td>*/}
//         {/*<td>*/}
//         {/*<Link to={"/register/"+props.stAssignmentsView._id}>Register</Link>*/}
//         {/*</td>  */}
//
//     </tr>
// )
//
// export default class studentExamsView extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {stExamsView: []};
//     }
//
//     componentDidMount() {
//         axios.get('http://localhost:3000/studentExamsView/')
//             .then(response => {
//                 this.setState({ stExamsView: response.data });
//             })
//             .catch(function (error){
//                 console.log(error);
//             })
//     }
//
//     studentExamsList() {
//         return this.state.stExamsView.map(function(currentExam, i){
//             return <stExamsView stc={currentExam} key={i} />;
//         })
//     }
//
//     render() {
//         return (
//             <div>
//                 <h3>Exams</h3>
//                 <table className="table table-striped" style={{ marginTop: 20 }} >
//                     <thead>
//                     <tr>
//                         <th>Course ID</th>
//                         <th>Course Name</th>
//                         <th>Exam Name</th>
//
//                     </tr>
//                     </thead>
//                     <tbody>
//                     { this.studentExamsList() }
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }
