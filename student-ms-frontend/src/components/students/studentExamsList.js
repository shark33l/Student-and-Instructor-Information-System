// import React, { Component } from 'react';
// import {Link} from "react-router-dom";
// //import axios from 'axios';
//
// const stExamsList = props => (
//     <tr>
//         <td>{props.stExamsList.courseId}</td>
//         <td>{props.stExamsList.examTitle}</td>
//         <td>{props.stExamsList.examDate}</td>
//         <td>{props.stExamsList.examDuration}</td>
//
//     </tr>
// )
//
// export default class studentExamsList extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {stExamsList: []};
//     }
//
//     componentDidMount() {
//         axios.get('http://localhost:3000/studentExamsList/')
//             .then(response => {
//                 this.setState({ stExamsList: response.data });
//             })
//             .catch(function (error){
//                 console.log(error);
//             })
//     }
//
//     studentExamsListNew() {
//         return this.state.stExamsList.map(function(currentExam, i){
//             return <stExamsList stc={currentExam} key={i} />;
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
//                         <th>Exam Title</th>
//                         <th>Exam Date</th>
//                         <th>Exam Duration</th>
//
//                     </tr>
//                     </thead>
//                     <tbody>
//                     { this.studentExamsListNew() }
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }