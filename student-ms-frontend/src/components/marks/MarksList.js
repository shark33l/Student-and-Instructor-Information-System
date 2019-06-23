import React, {Component, Fragment} from 'react';

var divStyle = {
    color: 'white',
    backgroundColor:'grey'
};

class MarksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marks:[],
            count:0
        }

    }

    componentDidMount() {
        this.setState({
            marks:this.props.gradings
        })
    }

    Subheader(){
        if(this.state.count>0){
            return (
                <h2>Marks</h2>
            )
        }
    }


    render() {
        /*let count=0;*/
        console.log("Aighhtttt this is marks array??" ,this.props.gradings.marks)
        if(this.props.gradings.marks!==undefined){
            console.log("im here")
            var gradingList=this.props.gradings.marks.map(grading=>{
                this.state.count=this.state.count+1;
                return(

                        <li key={grading._id}>{grading.itNumber} - {grading.name} - {grading.marks} </li>

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
                    {gradingList}
                </ul>
            </div>


        )
    }
}
export default MarksList;
