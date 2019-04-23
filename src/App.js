/* eslint-disable no-undef */


import React, { Component } from 'react';
import MainPanel from './screens/MainPanel';
import {Router,Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import AdminHomePanel from './screens/AdminPanel/Home';
import StudentHomePanel from './screens/StudentPanel/Home';
import Stu_Year from './screens/StudentPanel/Stu_Year'
import Stu_Semester from './screens/StudentPanel/Semester'
import Stu_course from './screens/StudentPanel/Courses'
import Specific_course from './screens/StudentPanel/Specific_course'
import AttendPaper from './screens/StudentPanel/AttendPaper'

import AdminPanel1 from './screens/AdminPanel/Panels/Panel1';
import AdminPanel2 from './screens/AdminPanel/Panels/Panel2';
import AdminPanel3 from './screens/AdminPanel/Panels/Panel3';
import AdminPanel4 from './screens/AdminPanel/Panels/Panel4';
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'



const customHistory=createBrowserHistory();

class App extends Component {


    

render(){
return(
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<Router history={customHistory}>    
<div>

 <Route path='/' exact component={MainPanel} />
<Route path='/adminHomePanel' exact component={AdminHomePanel} />   {/* Show facility */} 
<Route path='/studentHomePanel' exact component={StudentHomePanel} />   




 <Route path='/panel1/:facultyKey' exact component={AdminPanel1} />  {/* Show year */}
 <Route path='/panel2/:extendYear/:facultyKey' exact component={AdminPanel2} />    {/* Show semester */}
 <Route path='/panel3/:semesterKey/:extendYear/:facultyKey' exact component={AdminPanel3} />   {/* Show course */}
 <Route path='/panel4/:courseKey/:semesterKey/:extendYear/:facultyKey' exact component={AdminPanel4} /> {/* specific course*/ }

<Route path='/studentHomePanel/Stu_Year/:facultyKey'  exact component={Stu_Year} />
<Route path='/studentHomePanel/Stu_Year/Stu_Semester/:extendYear/:facultyKey' exact component={Stu_Semester} />
<Route path='/studentHomePanel/Stu_Year/Stu_Semester/Stu_course/:semesterKey/:extendYear/:facultyKey' exact component={Stu_course} />
 <Route path='/studentHomePanel/Stu_Year/Stu_Semester/Stu_course/Specific_course/:courseKey/:semesterKey/:extendYear/:facultyKey'  exact component={Specific_course} />
 <Route path='/studentHomePanel/Stu_Year/Stu_Semester/Stu_course/Specific_course/AttendPaper/:courseKey/:semesterKey/:extendYear/:facultyKey'  exact component={AttendPaper} />

</div>
</Router>
</PersistGate>
</Provider>
)

}

}

export default App;