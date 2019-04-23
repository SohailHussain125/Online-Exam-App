import React from "react";
import './index.css';
import {Animation,MDBView,Container,MDBAvatar,MDBCard,MDBCardBody,MDBCardUp,MDBCol,MDBRow,MDBIcon,Fa,Button,Modal,ModalBody,ModalFooter,ModalHeader,Input} from  'mdbreact';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import fire from '../../../config/firebase';


class Stu_Year extends React.Component{

 constructor(props){
super(props);

this.state={

 adminFacultykey:props.match.params.facultyKey ,
 modal5:false,
 modal6:false,
 year:'',
successProgress: false,
userId:'',
YearWiseData:[],
YearWiseKeys:[]
 


}

this.toggle=this.toggle.bind(this);
// this.createYearForm=this.createYearForm.bind(this);
this.entryYear=this.entryYear.bind(this);
    }
 
componentWillMount() {

fire.auth().onAuthStateChanged((user) => {
    
if (user) {
let displayName = user.displayName;
let uid = user.uid;
let url = user.photoURL;
let email = user.email;
fire.database().ref(`Admins/${uid}/`).on('value', (snapshot) => {
let data = snapshot.val();
this.setState({
displayName: displayName,
userId: uid,
userIamge: url,
AdminEmail: email,
})
console.log('displayname', displayName);
console.log('uid', uid);
console.log('url', url);
 })
    
 fire.database().ref(`Faculties/${this.state.adminFacultykey}/YearWise/`).on('value', (snapshot) => {
    
              let Data = snapshot.val();
              let YearWiseDate = [];
              let YearKeys = [];
              for (var key in Data) {
                YearWiseDate.push(Data[key]);
                YearKeys.push(key);
              }
              this.setState({
    
                YearWiseData: YearWiseDate,
                YearWiseKeys: YearKeys
              })
    
              console.log('Faculty', YearWiseDate);
              console.log('Faculty keys', YearKeys);
    
            })
    
          }
    
        })

      }
      
deleteYear(YearKey, index) {

const { userId,adminFacultykey } = this.state;
    
console.log('After delete key', YearKey[index]);
    
fire.database().ref(`Faculties/${adminFacultykey}/YearWise/${YearKey[index]}`).remove()
    
    
      }  
 
extendYear(YearExtend,facultyKey) {

this.props.history.push(`/studentHomePanel/Stu_Year/Stu_Semester/${YearExtend}/${facultyKey}`);
    
}
          

toggle(nr) {

let modalNumber = 'modal' + nr
this.setState({
[modalNumber]: !this.state[modalNumber]
});
 };

listYearForm(modal6) {

const { YearWiseKeys,adminFacultykey } = this.state;

return (

<Modal isOpen={this.state.modal6} toggle={() => this.toggle(6)} style={{ marginTop: '50%' }} className="cascading-modal blue-gradient" >
<div className="modal-header purple-gradient white-text">
<h4 className="title">
<Fa className="fa secondary-fa-reorder" icon="reorder" />List Of Year</h4>
<button type="button" className="close" onClick={() => this.toggle(6)}>
<span aria-hidden="true">×</span>
</button>
</div>
<ModalBody  >
<ul >
{this.state.YearWiseData.map((Year, index) => {

return (
<div>
<li style={{marginLeft:'2%'}} className="listItem" key={index} index={index} >{Year.year} <Button className="blue-gradient" style={{ width: '30px' }} onClick={() => this.extendYear(YearWiseKeys[index],adminFacultykey)} ><Fa icon="pencil" /></Button> <Button color="danger" onClick={() => this.deleteYear(YearWiseKeys, index)} style={{ width: '30px' }} ><Fa icon="trash"></Fa></Button> </li>
<br />
</div>
)
})
}
</ul>
</ModalBody>
<ModalFooter  >
<Button color="danger" onClick={() => this.toggle(6)}>Close</Button>
</ModalFooter>
</Modal>
 )
 }
 
 entryYear() {

    const { year, adminFacultykey,userId } = this.state;

    this.setState({ successProgress: true })


    if (year) {

      fire.database().ref(`Faculties/${adminFacultykey}/YearWise`).push({
        year
      }).then(() => {
        alert("Data is Successfully entered.");
        this.setState({
          successProgress: false,
          year: ''
        })


      })

    }

    else if (!year) {

      this.setState({
        successProgress: false
      })

      alert("Please First Fill Input Field.");




    }
  }



render(){
  console.log('Student Year====')
const { modal5,modal6 } = this.state;

return(
<div id="apppage2">
<MDBView>
   <Grid container spacing={24}>
  <Grid item xs={12}>
  <Card className='cardstyles shadow-box-example z-depth-5'>
  <CardHeader className='CardHeader4 ' />
  <CardContent>
   <Animation type="flash" duration="4s" infinite>   
   <h4 className="AdminNames1">OnLine Examination Application</h4>
   </Animation>
  {/*<h6 className="superAdminEmail">{`${this.state.AdminEmail}`}</h6>
  <Button className='adminLogOutButton peach-gradient' onClick={this.signOut.bind(this)} ><Fa icon="sign-out" /> LogOut  </Button>   */}
  </CardContent>
  </Card>

  </Grid>
 
  <Grid item xs={12}>
  <Card className='cardstyles3 shadow-box-example z-depth-5'>
  <CardHeader className='CardHeader3 ' />
  <CardContent>
  <Button className='adminLogOutButton2 purple-gradient' onClick={()=>this.toggle(6)} ><Fa icon="reorder" /> List Of Years  </Button>  
  </CardContent>
  </Card>
  {modal6 && this.listYearForm(modal6)}
  </Grid> 
  </Grid>        </MDBView>
        </div>
        
    )

  }  

}

export default Stu_Year;