import React from 'react';
import {Animation,MDBView,MDBBtn ,Container,MDBAvatar,MDBCard,MDBCardBody,MDBCardUp,MDBCol,MDBRow,MDBIcon,Fa,Button,Modal,ModalBody,ModalFooter,ModalHeader,Input} from  'mdbreact';
// import './index.css';
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


class AttendPaper extends React.Component{

constructor(props){
 
super(props);

this.state={
    adminFacultyKey:props.match.params.facultyKey,
    adminYearKey:props.match.params.extendYear,
    adminSemesterKey:props.match.params.semesterKey,
    adminCourseKey:props.match.params.courseKey,
    submitQuestion:[],
    selectOpt:'',


}

this.toggle=this.toggle.bind(this);



}

componentWillMount() {
  console.log('run function......')
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
      this.setState({
        courseName:snapshot.val().Course
      })
    })
                  

       

    
          
                }
          
              })


              this.objToArray()
  
            }



            submit(index,answer){
              console.log('answer....'+ answer)
              const {submitQuestion,selectOpt}=this.state
              let staticAns
              (selectOpt===answer?staticAns=true:staticAns=false)
           
              submitQuestion.push(staticAns);
              localStorage.setItem('submitQuestion',JSON.stringify(submitQuestion))
              let userId=localStorage.getItem('user')
              let obj={
                index:index,
                answer:staticAns
              }
              //  console.log(`/user/${userId}/${CoursDetail.CourseName}/${CoursDetail.quizName}/`)
              // fire.database().ref(`/user/${userId}/${CoursDetail.CourseName}/${CoursDetail.quizName}/`).push(obj)
              this.setState({
               submitQuestion
              })
              console.log(obj)
             }


             showResult(){
              let AtempAns=[]
              AtempAns= JSON.parse(localStorage.getItem('submitQuestion'))
              // const {UserAtempQues} =this.state
              // console.log(UserAtempQues)
              // ((JSON.parse(localStorage.getItem('submitQuestion')))? AtempAns=(JSON.parse(localStorage.getItem('submitQuestion'))):AtempAns=UserAtempQues )
              let totalmark=AtempAns.length;
              let totalObtain=0;
              AtempAns.map((ans)=>{
                (ans===true && totalObtain++)
              })
              console.log('totalmark===='+totalmark)
              console.log('totalObtain===='+totalObtain)
              const Result=(totalObtain/totalmark)*100;
              console.log(Result);
            
              return(
                (Result>50?<h1>Conguratulation You have Passed:{Result}%</h1>:<h1>Sorry You have Failed:{Result}%</h1> )
                
              )
            }
            


objToArray(){
  
const courseArr=[];
const courseObj=this.props.courseObj;
for (var key in courseObj.Paper){
  courseArr.push(courseObj.Paper[key])
}

localStorage.setItem('questions',JSON.stringify(courseArr))

this.setState({
  courseArr
})

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
    
  }


  showQuestion(arrObj,submitItem){
    return( <ul>
      {arrObj.map((questions,index)=>{
        if(index===submitItem){
        //  console.log(index+'=================') 
         return(
         <li> <h3>{questions.Questions}</h3> 
         <br/>
         <input type="radio" name={questions.options.opt1} value='opt1' onChange={(e)=>this.setState({selectOpt:e.target.value})}/>{questions.options.opt1}
         <br/>
         <input type="radio" name={questions.options.opt2} value='opt2' onChange={(e)=>this.setState({selectOpt:e.target.value})}/>{questions.options.opt2}
         <br/>
         <input type="radio" name={questions.options.opt3} value='opt3'onChange={(e)=>this.setState({selectOpt:e.target.value})}/>{questions.options.opt3}
         <br/>
         <input type="radio" name={questions.options.opt4} value='opt4'onChange={(e)=>this.setState({selectOpt:e.target.value})}/>{questions.options.opt4}
         <br/>
         <MDBBtn onClick={()=>this.submit(index,questions.Ans.opt)} color="primary">Submit</MDBBtn>
         
               
         </li>)  }             
      })}
      </ul>
  )
  }


    


render(){
const {  courseName ,courseArr ,submitQuestion,selectOpt } = this.state;
console.log(courseArr)
let submitItem=submitQuestion.length;

return(

    <div>
        <h1>{courseName}</h1> 
        {submitItem===courseArr.length? (this.showResult()) :this.showQuestion(courseArr,submitItem) }
        
        </div>

)    

}    

}

const mapStateToProps = (state) => {
  return {
    courseObj:state.courseObjReducer.CourseObj,
    // RollNo: state.authReducers.RollNo
  }
 }

 const mapDispatchToProps = (dispatch) => {
  return {
    AuthUser: (data) => dispatch(updateUser(data)),
  }
} 
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(AttendPaper)