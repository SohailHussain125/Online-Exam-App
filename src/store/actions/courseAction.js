const updateUser = (data) => {
    // return {
    //     type: "UPDATE_USER",
    //     user
    // }
//   console.log(data)
    return      ( dispatch )=> { 
        dispatch({
              
            type:'UPDATE_CourseObj',
            payload:data

        })
       
    }
}

const removeUser = () => {
    return {
        type: "REMOVE_CourseObj"
    }
}

export {
    updateUser,
    removeUser
}