const INITIAL_STATE={
   
}
const courseObjReducer = (states=INITIAL_STATE, action) => {
   switch(action.type) {
       case "UPDATE_CourseObj": {
           return {...states, CourseObj:action.payload}
       }
       case "REMOVE_CourseObj": {
           return {...states, CourseObj: null}
       }
       default: {
           return states;
       }
   }
}

export default courseObjReducer