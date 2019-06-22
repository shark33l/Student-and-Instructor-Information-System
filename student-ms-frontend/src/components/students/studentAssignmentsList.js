// import React, { Component } from 'react';
// import {Link} from "react-router-dom";
// //import axios from 'axios';
//
// const stAssignmentsList = props => (
//     <tr>
//         <td>{props.stAssignmentsList.courseId}</td>
//         <td>{props.stAssignmentsList.assignmentTitle}</td>
//         <td>{props.stAssignmentsList.dueDate}</td>
//
//         <td>
//             <Link to={"/uploadAssignment/"+props.stAssignmentsList._id}>Upload Assignment</Link>
//         </td>
//
//     </tr>
// )
//
// export default class studentAssignmentsList extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {stAssignmentsList: []};
//     }
//
//     componentDidMount() {
//         axios.get('http://localhost:3000/studentAssignmentsList/')
//             .then(response => {
//                 this.setState({ stAssignmentsList: response.data });
//             })
//             .catch(function (error){
//                 console.log(error);
//             })
//     }
//
//     studentAssignmentsListNew() {
//         return this.state.stAssignmentsList.map(function(currentAssignment, i){
//             return <stAssignmentsList stc={currentAssignment} key={i} />;
//         })
//     }
//
//     render() {
//         return (
//             <div>
//                 <h3>Assignments</h3>
//                 <table className="table table-striped" style={{ marginTop: 20 }} >
//                     <thead>
//                     <tr>
//                         <th>Course ID</th>
//                         <th>Assignment Title</th>
//                         <th>Due Date</th>
//
//                     </tr>
//                     </thead>
//                     <tbody>
//                     { this.studentAssignmentsListNew() }
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }