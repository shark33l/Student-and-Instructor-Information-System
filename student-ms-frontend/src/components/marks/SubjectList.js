import React, {Component, Fragment} from 'react';

var divStyle = {
    color: 'white',
    backgroundColor:'grey'
};

class SubjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects:[],
            count:0
        }

    }

    componentDidMount() {
       this.setState({
           subjects:this.props.subs
       })
    }

   Subheader(){
            if(this.state.count>0){
                return (
                    <h2>Subjects</h2>
                )
            }
    }


    render() {
        /*let count=0;*/
        if(this.props.subs.subjects!==undefined){
            var subList=this.props.subs.subjects.map(subject=>{
                this.state.count=this.state.count+1;
                return(

                    <div
                        className="resultsMarks"
                        style={divStyle}
                        type="Submit"
                        key={subject._id}
                        color={"inherit"}
                        onClick={() => {
                            this.props.getSubMarks(subject.subjectCode);
                        }}
                     >
                    {subject.name}
                    </div>
                )
            })

            if(this.state.count===0){
                return (
                    <div className="col-md-5">
                        <h2>Sorry! No Train available</h2>
                    </div>
                )
            }
        }

        return(

                <div>
                    {this.Subheader()}
                    <ul>
                        {subList}
                    </ul>
                </div>


        )
    }
}
export default SubjectList;
