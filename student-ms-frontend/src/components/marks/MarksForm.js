import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink} from 'react-router-dom'

class MarksForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

            objID:String,
            subjectCode:this.props.subCode
        }
    }

    addMarks(){

        const itNumber=this.refs.itNumber.value;
        const name=this.refs.name.value;
        const marks=this.refs.marks.value;

        var newMarks={"itNumber":itNumber,"name":name,"marks":marks}

        fetch('http://localhost:5000/marks/add-marks',{
            method: 'POST',
            body:JSON.stringify(newMarks),
            headers: {'Content-Type': 'application/json'}

        }).then(response=>{
            return response.json();
        }).then((objID)=>{
           /* this.setState({
                objID:objID.objID
            },()=>console.log('raaittt got the objID >',this.state.objID))*/
            this.addMarksToSubjects(objID.objID);
        }).catch(err=>{
            alert("addmarks "+err);
        })

    }

    addMarksToSubjects(ob){

        fetch(`http://localhost:5000/subject/add-subject-marks/${this.state.subjectCode}/${ob}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }).then(response=>{
            return response.json();
        }).then((data)=>{
            console.log('data after link fetch',data)
        }).catch(err=>{
            alert("addmarkstoSub "+err);
        })
    }


    render() {
        return(

                <div>
                            <div className="form-group">
                                <label >IT-Number</label>
                                <input id="subOne" className="form-control" placeholder="IT-Number" ref="itNumber"/>
                            </div>

                            <div className="form-group">
                                <label >Student Name</label>
                                <input id="subOne" className="form-control" placeholder="Student Name" ref="name"/>
                            </div>

                            <div className="form-group">
                                <label >Marks</label>
                                <input id="subOne3" className="form-control" placeholder="Marks" ref="marks"/>
                            </div>



                            <button type="button" className="btn btn-primary"  onClick={()=>this.addMarks()}>SUBMIT MARKS</button>

                </div>
        );
    }
}
export default MarksForm;
