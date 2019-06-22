
    // import React, {Component} from 'react';
    // import 'bootstrap/dist/css/bootstrap.css'
    //
    // class Notice extends Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = {
    //             notices:[]
    //         }
    //     }
    //
    //     componentDidMount() {
    //         fetch('http://localhost:5000/rest/api/notice/get-notices',{
    //             method: 'GET',
    //             headers:{'Content-Type':'application/json'}
    //         }).then(response=>{
    //             return response.json();
    //         }).then((data)=>{
    //             this.setState({
    //                 notices:data.notice
    //             },()=>console.log('all fetch state is st',this.state.notices))
    //         }).catch(err=>{
    //             alert(err);
    //         })
    //     }
    //
    //
    //     render() {
    //         return(
    //             <div className="container">
    //
    //                 <div className="notice">
    //                     <div className="col-md-auto">
    //                         <form className="padding sub">
    //                             <ul>
    //                                 {this.state.notices.map(notice=>
    //                                     <div className="noticePage">
    //                                         <h1 key={notice._id}>{notice.Title}</h1>
    //                                         <p>{notice.Body}</p>
    //                                         <p>{notice.Date}</p>
    //                                     </div>
    //                                 )}
    //                             </ul>
    //                         </form>
    //
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     }
    // }
    // export default Notice;
=======
// import React, {Component} from 'react';
// import 'bootstrap/dist/css/bootstrap.css'
//
// class Notice extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             notices:[]
//         }
//     }
//
//     componentDidMount() {
//         fetch('http://localhost:5000/rest/api/notice/get-notices',{
//             method: 'GET',
//             headers:{'Content-Type':'application/json'}
//         }).then(response=>{
//             return response.json();
//         }).then((data)=>{
//             this.setState({
//                 notices:data.notice
//             },()=>console.log('all fetch state is st',this.state.notices))
//         }).catch(err=>{
//             alert(err);
//         })
//     }
//
//
//     render() {
//         return(
//             <div className="container">
//
//                 <div className="notice">
//                     <div className="col-md-auto">
//                         <form className="padding sub">
//                             <ul>
//                                 {this.state.notices.map(notice=>
//                                     <div className="noticePage">
//                                         <h1 key={notice._id}>{notice.Title}</h1>
//                                         <p>{notice.Body}</p>
//                                         <p>{notice.Date}</p>
//                                     </div>
//                                 )}
//                             </ul>
//                         </form>
//
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
// export default Notice;