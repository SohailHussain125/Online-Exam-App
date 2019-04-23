import React from 'react';
// import {Animation,MDBView,Container,MDBAvatar,MDBCard,MDBCardBody,MDBCardUp,MDBCol,MDBRow,MDBIcon,Fa,Button,Modal,ModalBody,ModalFooter,ModalHeader,Input} from  'mdbreact';
import {Animation,Fa,Input, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBMask,
  MDBRow, MDBCol, MDBBtn, MDBView, MDBContainer, MDBFormInline ,Button,Tooltip,Popover,PopoverBody,PopoverHeader,Modal,ModalBody,ModalFooter
  ,ModalHeader, MDBSelect,
  MDBSelectInput,
  MDBSelectOptions, MDBAutocomplete, MDBInput, MDBModal, MDBModalHeader, MDBModalBody, MDBIcon} from "mdbreact";
import './index.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import fire from '../../../config/firebase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { updateUser, removeUser } from '../../../store/actions/courseAction'
import { connect } from 'react-redux'


class Specific_course extends React.Component{

constructor(props){
 
super(props);

this.state={
    adminFacultyKey:props.match.params.facultyKey,
    adminYearKey:props.match.params.extendYear,
    adminSemesterKey:props.match.params.semesterKey,
    adminCourseKey:props.match.params.courseKey,
    modal11:false,
    modal12:false,
    adminModal:false
  

}

this.toggle=this.toggle.bind(this);
this.EnterQuiz=this.EnterQuiz.bind(this);
this.goTOQuizModal=this.goTOQuizModal.bind(this);
this.checkPassword=this.checkPassword.bind(this);
// this.listQuestionsForm=this.listQuestionsForm.bind(this);



}

// componentWillMount(){

//  const {adminFacultyKey,adminYearKey,adminSemesterKey,adminCourseKey}=this.state;
 
//  console.log('51',adminFacultyKey);
//  console.log('52',adminYearKey);
//  console.log('53',adminSemesterKey);
//  console.log('54',adminCourseKey);


// }

toggleAdminModal(){
  this.setState({
    adminModal:!this.state.adminModal
  })
}


componentWillMount() {
  const {adminFacultyKey,adminYearKey,adminSemesterKey,adminCourseKey}=this.state;
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
      console.log('adminfaculty',adminFacultyKey);
      console.log('adminyearkey',adminYearKey);
      console.log('adminsemseterKey',adminSemesterKey);
      console.log('adminCourseKey',adminCourseKey);
    })
          
       fire.database().ref(`Faculties/${adminFacultyKey}/YearWise/${adminYearKey}/Semmsters/${adminSemesterKey}/Course/${adminCourseKey}`).on('value', (snapshot) => {
         let Data = snapshot.val();
          this.props.AuthUser(Data)
     })
          
                }
          
              })
  
            }


            checkPassword(defualtPassword){
             const {stuPassword,WrongPassword,adminFacultyKey,adminYearKey,adminSemesterKey,adminCourseKey}=this.state;
             if( defualtPassword===stuPassword)
              this.props.history.push(`/studentHomePanel/Stu_Year/Stu_Semester/Stu_course/Specific_course/AttendPaper/${adminCourseKey}/${adminSemesterKey}/${adminYearKey}/${adminFacultyKey}`)
else
this.setState({
  WrongPassword:true
})
              
                
                 

            }

            
goTOQuizModal(defualtPassword){
  const { stuPassword ,WrongPassword } = this.state;
  
    return(
      <MDBContainer>
         
          <MDBModal
            isOpen={this.state.adminModal}
            toggle={this.toggleAdminModal}
            size="md"
            cascading
            // side position=""
          >
            <MDBModalHeader
              toggle={this.toggleAdminModal}
              titleClass="d-inline title"
              className="text-center light-blue darken-3 white-text"
            >
              <MDBIcon icon="pencil" />
            Enter password Go to Quiz
            </MDBModalHeader>
            <MDBModalBody>
            <Input 
            label="Your password" 
            icon="lock" 
            group type="password"
            required
            value={stuPassword}
            onChange={(e)=>{this.setState({stuPassword:e.target.value})}} 
            validate/>
               
              <div className="text-center mt-1-half">
              {WrongPassword && <div style={{color:'red' ,margin:'0 auto'} }>
                        Wrong Password 
              </div>}
                <MDBBtn
                  color="info"
                  className="mb-2"
                  onClick={()=>this.checkPassword(defualtPassword) }
                >
                  send
                  <MDBIcon icon="send" className="ml-1" />
                </MDBBtn>
              </div>
             
            </MDBModalBody>
          </MDBModal>
        </MDBContainer>
    )
  }


handleChange =(event)=> {
    this.setState({ opt: event.target.value });
  };


toggle(nr) {

    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });

  };

  EnterQuiz(){
  const {adminFacultyKey,adminYearKey,adminSemesterKey,adminCourseKey}=this.state;
  const {courseObj} = this.props
  console.log(courseObj.securityPassword)
  this.toggleAdminModal();
  
  }


          




render(){
const { modal11,modal12 ,QuestionList,QuestionKey,adminModal} = this.state;
const { courseObj } = this.props;
return(

    <div id="apppage5" ><MDBView><Grid container spacing={24}>
    <Grid item xs={12}>
    <Card className='cardstyles shadow-box-example z-depth-5'>
    <CardHeader className='CardHeader9 ' />
    <CardContent>
     <Animation type="rotateInUpRight" duration="4s" infinite>   
     <h4 className="AdminNames3">OnLine Examination Application</h4>
     </Animation>
    
    </CardContent>
    </Card>
  
    </Grid>
    
    <Grid item xs={12}>
    <Card className='cardstyles3 shadow-box-example z-depth-5'>
    <CardHeader className='CardHeader10' />
    <CardContent>
    <Button className='adminLogOutButton4 purple-gradient' onClick={this.EnterQuiz} ><Fa icon="reorder" /> Start Quiz </Button>  
    </CardContent>
    </Card>
    {adminModal &&  this.goTOQuizModal(courseObj.securityPassword)}
    </Grid> 
    </Grid> 
 </MDBView></div>
)    

}    

}

const mapStateToProps = (state) => {
  console.log(state.courseObjReducer)
  return {
    courseObj:state.courseObjReducer.CourseObj,

  }
 }

 const mapDispatchToProps = (dispatch) => {
  return {
    AuthUser: (data) => dispatch(updateUser(data)),
  }
} 
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(Specific_course)